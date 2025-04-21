export const SUCCESS = { code: 200, message: "The request was successful." };

export const CREATED = {
  code: 201,
  message: "The resource was successfully created.",
};

export const ACCEPTED = {
  code: 202,
  message: "The request has been accepted for processing.",
};

export const NO_CONTENT = {
  code: 204,
  message: "The request was successful but there is no content to send.",
};

export const BAD_REQUEST = {
  code: 400,
  message: "The server could not understand the request due to invalid syntax.",
};

export const AUTHORIZED = {
  code: 200,
  message: "Resource Successfully Authenticated.",
};

export const UNAUTHORIZED = {
  code: 401,
  message:
    "Authentication is required and has failed or has not been provided.",
};

export const FORBIDDEN = {
  code: 403,
  message: "The client does not have access rights to the content.",
};

export const NOT_FOUND = {
  code: 404,
  message: "The server can not find the requested resource.",
};

export const CONFLICT = {
  code: 409,
  message: "The request conflicts with the current state of the server.",
};

export const INTERNAL_ERROR = {
  code: 500,
  message:
    "The server encountered an internal error and was unable to complete the request.",
};

export const NOT_IMPLEMENTED = {
  code: 501,
  message:
    "The server does not support the functionality required to fulfill the request.",
};

export const SERVICE_UNAVAILABLE = {
  code: 503,
  message: "The server is not ready to handle the request.",
};
