const { validationResult } = require('express-validator');

/**
 * This method allows to validate the fields sent by the client.
 * For more information read on how to use express-validator (https://express-validator.github.io/docs/)
 */
exports.validateFields = (req) => {
    const validationErrors = validationResult(req);
    //console.log('(validateFields) VALIDATION ERROR', validationErrors.array()[0]);
    return validationErrors.isEmpty() ? null : validationErrors.array()[0].msg;
}