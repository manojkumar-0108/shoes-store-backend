
const { StatusCodes } = require('http-status-codes');

function pingCheck(message) {
    return (req, res, next) => {
        return res.status(StatusCodes.OK).json({
            success: true,
            message: message,
            error: [],
            data: []
        });
    }
}

module.exports = pingCheck;