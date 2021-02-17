export const isProd = (): boolean => process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test";
