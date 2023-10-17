
export type VertexFoundationModel =
  | 'text-bison'
  | 'textembedding-gecko'
  | 'chat-bison'
  | 'code-bison'
  | 'codechat-bison'
  | 'code-gecko'

export interface VertexCodeBisonRequestBody {
  instances: {
    prefix: string;
    suffix?: string;
  }[];
  parameters: {
      maxOutputTokens: number;
      temperature: number;
      stopSequences?: string[];
  }
}
/**
 * https://cloud.google.com/vertex-ai/docs/generative-ai/start/quickstarts/api-quickstart#try_text_prompts
 */
export interface VertexTextBisonRequestBody {
    instances: {
      prompt: string;
    }[];
    parameters: {
        /**
         * 1-1024, default: 0
         * Maximum number of tokens that can be generated in the response. Specify a lower value for shorter responses and a higher value for longer responses. A token may be smaller than a word. A token is approximately four characters. 100 tokens correspond to roughly 60-80 words.
         */
        maxOutputTokens: number;
        /**
         * Range 0.0-1.0. Default: 0
         * The temperature is used for sampling during the response generation, which occurs when topP and topK are applied. Temperature controls the degree of randomness in token selection. Lower temperatures are good for prompts that require a more deterministic and less open-ended or creative response, while higher temperatures can lead to more diverse or creative results. A temperature of 0 is deterministic: the highest probability response is always selected. For most use cases, try starting with a temperature of 0.2.
         */
        temperature: number;
        /**
         * Range 1-40, Default: 40
         * Top-k changes how the model selects tokens for output. A top-k of 1 means the selected token is the most probable among all tokens in the model's vocabulary (also called greedy decoding), while a top-k of 3 means that the next token is selected from among the 3 most probable tokens (using temperature). For each token selection step, the top K tokens with the highest probabilities are sampled. Then tokens are further filtered based on topP with the final token selected using temperature sampling. Specify a lower value for less random responses and a higher value for more random responses.
         */
        topK: number;
        /**
         * Range 0.0 - 1.0. Default: 0.95
         * Top-p changes how the model selects tokens for output. Tokens are selected from most K (see topK parameter) probable to least until the sum of their probabilities equals the top-p value. For example, if tokens A, B, and C have a probability of 0.3, 0.2, and 0.1 and the top-p value is 0.5, then the model will select either A or B as the next token (using temperature) and doesn't consider C. The default top-p value is 0.95. Specify a lower value for less random responses and a higher value for more random responses.
         */
        topP: number;
    }
}

interface VertexResponseCitation {
  startIndex: number;
  endIndex: number;
  url: string;
  title: string;
  license: string;
  publicationDate: string;
}

/**
 * https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/text
 */
export interface VertexTextBisonResponse {
  predictions: 
    {
      content: string;
      citationMetadata: {
        citations: VertexResponseCitation[];
      },
      safetyAttributes: {
        blocked: boolean;
        scores: number[];
        categories: string[];
      }
    }[];
  metadata: {
    tokenMetadata: {
      outputTokenCount: {
        totalBillableCharacters: number;
        totalTokens: number;
      },
      inputTokenCount: {
        totalTokens: number;
        totalBillableCharacters: number;
      }
    }
  };
}

interface VertexResponseErrorDetail {
  '@type': string;
  reason: string;
  metadata: {
    method: string;
    service: string;
  }
}

export interface VertexResponseError {
  error: {
    code: number,
    message: string;
    status: string;
    details: VertexResponseErrorDetail[];
  }
}

export interface OutResult {
  input: VertexTextBisonRequestBody;
  output: VertexTextBisonResponse;
}
