import { BAD_REQUEST, INTERNAL_ERROR } from "@constants";

/**
 * Formats validation errors from a Yup validation schema.
 * @param err - The error object from Yup validation.
 * @returns Object({code :string, message: string, errors: Record<string, string>}).
 */
export const formattedYupErrors = (err: any) => {
  const formattedErrors: Record<string, string> = {};
  if (err?.name === "ValidationError" && Array.isArray(err?.inner)) {
    err.inner.forEach((y: any) => {
      if (y?.path && y?.message) {
        formattedErrors[y.path] = y.message;
      }
    });
    return { ...BAD_REQUEST, errors: formattedErrors };
  }
  return { ...INTERNAL_ERROR };
};

/**
 * Custom Function to exclude keys from an object.
 * Keys to exclude must be provided as an array of strings.
 * @param obj - The source object.
 * @param keysToExclude - Array of keys to exclude.
 * @returns A new object with the specified keys excluded.
 */
export const excludeKeysFromObject = (
  obj: Record<string, any>,
  keysToExclude: string[] = []
): Record<string, any> => {
  if (!obj || keysToExclude.length === 0) return obj;
  return Object.keys(obj).reduce((acc, key) => {
    if (!keysToExclude.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Record<string, any>);
};
