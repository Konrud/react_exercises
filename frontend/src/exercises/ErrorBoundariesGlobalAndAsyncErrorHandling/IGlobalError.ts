export interface IGlobalError {
  id: string;
  message: string;
  type: (typeof GLOBAL_ERROR)[keyof typeof GLOBAL_ERROR];
  timestamp: Date;
  context?: Record<string, unknown>;
}

export const GLOBAL_ERROR = {
  NETWORK: "network",
  VALIDATION: "validation",
  UNKNOWN: "unknown",
};
