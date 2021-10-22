// class ApiError extends Error {
//     constructor(statusCode, message, isOperational = true, stack = '') {
//         super(message)
//         this.statusCode = statusCode
//         this.isOperational = isOperational
//         this.message = message
//         if (stack) {
//             this.stack = stack
//         } else {
//             Error.captureStackTrace(this, this.constructor)
//         }
//     }
// }

const ApiError = (message, statusCode) => ({
    message: message,
    statusCode: statusCode,
})

module.exports = ApiError
