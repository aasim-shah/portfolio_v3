import "server-only";

import {
  Environment,
  LogLevel,
  Paddle,
  type PaddleOptions,
} from "@paddle/paddle-node-sdk";

let paddleInstance: Paddle | undefined;

export function getPaddleEnvironment(): Environment {
  const value = process.env.PADDLE_ENV;

  if (value !== Environment.sandbox && value !== Environment.production) {
    throw new Error(
      "PADDLE_ENV must be explicitly set to sandbox or production.",
    );
  }

  return value;
}

function getApiKey(environment: Environment): string {
  const apiKey =
    process.env.PADDLE_API_KEY ??
    (environment === Environment.sandbox
      ? process.env.PADDLE_SANDBOX_API_KEY
      : undefined);

  if (!apiKey) {
    throw new Error("PADDLE_API_KEY is required for server-side Paddle calls.");
  }

  if (environment === Environment.sandbox && !apiKey.startsWith("pdl_sdbx_")) {
    throw new Error("PADDLE_ENV=sandbox requires a sandbox API key.");
  }

  if (environment === Environment.production && !apiKey.startsWith("pdl_live_")) {
    throw new Error("PADDLE_ENV=production requires a live API key.");
  }

  return apiKey;
}

export function getPaddleInstance(): Paddle {
  if (paddleInstance) return paddleInstance;

  const environment = getPaddleEnvironment();
  const options: PaddleOptions = {
    environment,
    logLevel: LogLevel.error,
  };

  paddleInstance = new Paddle(getApiKey(environment), options);
  return paddleInstance;
}
