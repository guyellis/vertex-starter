import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { VertexResponseError, VertexTextBisonRequestBody, VertexTextBisonResponse } from './vertex-types';

export const getAccessToken = (): string => {
  const { GCLOUD_ACCESS_TOKEN } = process.env;
  if (!GCLOUD_ACCESS_TOKEN) {
    throw new Error('GCLOUD_ACCESS_TOKEN is not defined. Try and run "export GCLOUD_ACCESS_TOKEN=$(gcloud auth print-access-token)"');
  }
  return GCLOUD_ACCESS_TOKEN;
};

export const isVertexError = (vertexResponse: VertexTextBisonResponse | VertexResponseError): vertexResponse is VertexResponseError => {
  return 'error' in vertexResponse;
};

/**
 * Read the prompt from a file to allow for easier editing.
 */
export const loadPrompt = async (): Promise<string> => {
  const promptBuffer = await readFile(join(__dirname, 'prompt.txt'));
  return promptBuffer.toString();
};

/**
 * Write out the raw input and output from the call as well as the requested
 * content in a separate file for easier reading.
 */
export const writeResult = async (input: VertexTextBisonRequestBody, output: VertexTextBisonResponse): Promise<void> => {
  const date = new Date();
  const outFile = date.toISOString().replace(/[T:.]/g, '-').replace('Z','');
  const filename = join(__dirname, 'results/', outFile);

  await writeFile(filename + '-raw.txt', `Input:

${JSON.stringify(input, null, 2)}

============================================================

Output:

${JSON.stringify(output, null, 2)}
`);

  await writeFile(filename + '-content.txt', output.predictions[0].content);
};
