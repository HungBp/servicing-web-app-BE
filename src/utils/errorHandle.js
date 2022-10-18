const { AggregateError, UniqueConstraintError } = require("sequelize");

/**
 * @function catchErrorType
 * @param {Error} err
 * @returns {string} error message
 */
module.exports = function catchErrorType(err) {
  if (err instanceof AggregateError) {
    const listOfErrors = [];

    err.errors.forEach(eachErr => {
      listOfErrors.unshift(`${eachErr.message} ${JSON.stringify(eachErr.record.dataValues)}`);
    });

    return listOfErrors.join("\n");
  }

  if (err instanceof UniqueConstraintError) {
    return err.parent.message;
  }

  return err.message;
};
