exports.success = (resp, message, data) => resp.status(200).json(
  {
    success: true,
    message,
    data
  }
)

exports.serverError = (resp, message) => resp.status(500).json(
  {
    success: false,
    message
  }
)

exports.notFound = (resp, message) => resp.status(404).json(
  {
    success: false,
    message
  }
)

exports.badRequest = (resp, message, data)  => resp.status(400).json(
  {
    success: false,
    message,
    data
  }
)

exports.unauthorized = (resp, message) => resp.status(401).json(
  {
    success: false,
    message
  }
)