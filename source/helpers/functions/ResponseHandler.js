export function badRequest(res, message) {
  return res.status(400).json({
    message,
  });
}
export function okResponse(res, message, data) {
  return res.status(200).json({
    message,
    data,
  });
}
export function createResponse(res, message, data) {
  return res.status(201).json({
    message,
    data,
  });
}
export function conflict(res, message, data) {
  return res.status(409).json({
    message,
    data,
  });
}
export function notFound(res, message) {
  return res.status(404).json({
    message,
  });
}
export function internalServerError(res, message) {
  return res.status(500).json({
    message,
  });
}
export function unAuthResponse(res, message) {
  return res.status(401).json({
    message,
  });
}
