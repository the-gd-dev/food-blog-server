import { BAD_REQUEST, INTERNAL_ERROR } from "@constants";

export const formattedYupErrors = (err: any) => {
  const formattedErrors: Record<string, string> = {};
  if (err?.name === "ValidationError") {
    err?.inner?.forEach((y: any) => (formattedErrors[y.path] = y.errors));
    return { ...BAD_REQUEST, errors: formattedErrors };
  }
  return { ...INTERNAL_ERROR };
};
