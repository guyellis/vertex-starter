import { getAccessToken, isVertexError, loadPrompt, writeResult } from './helpers';
import { VertexTextBisonRequestBody, VertexFoundationModel, VertexTextBisonResponse, VertexResponseError } from './vertex-types';

/**
 * This can be a value in the range 1 to 1024
 */
const MAX_OUTPUT_TOKENS=1024;
const MODEL_ID: VertexFoundationModel = 'text-bison';

/**
 * This needs to be a project in your GCP Console that has the Vertex AI API enabled.
 */
const PROJECT_ID='<replace-with-the-name-of-your-project>';

const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/${MODEL_ID}:predict`;

const getBody = (prompt: string): VertexTextBisonRequestBody => {
  const body: VertexTextBisonRequestBody = {
    instances: [
      { prompt },
    ],
    parameters: {
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      temperature: 0,
      topK: 40,
      topP: 0.95,
    },
  };
  return body;
};

export const callVertex = async (body: VertexTextBisonRequestBody): Promise<VertexTextBisonResponse> => {
  const accessToken = getAccessToken();
  const response = await fetch(url, {
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'post',
  });
  const text = await response.text();
  const vertexResponse: VertexTextBisonResponse | VertexResponseError = JSON.parse(text);

  if (isVertexError(vertexResponse)) {
    console.error(JSON.stringify(vertexResponse, null, 2));
    throw new Error('Stopping because of error from Vertex');
  }

  return vertexResponse;
};

const main = async (): Promise<void> => {
  const prompt = await loadPrompt();
  const input = getBody(prompt);
  const output = await callVertex(input);
  await writeResult(input, output)
};

main();
