const { Sequelize } = require("sequelize");

const settingModelCols = require("../model/settingModelCol");
const catchErrorType = require("../utils/errorHandle");
// initialize db
const sequelize = new Sequelize(`mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`, { logging: false });

// define model represent table in db
const settingModels = {};

Object.keys(settingModelCols).forEach(model => {
  settingModels[model.toLowerCase()] = sequelize.define(model.charAt(0).toUpperCase() + model.slice(1), settingModelCols[model]);
});

// check db connection
sequelize.authenticate()
  .then(() => console.log("Database connection has been established successfully"))
  .catch(() => console.error("Unable to connect to database"));

// add model to request
const modelReq = (req, res, next) => {
  try {
    if (req.params.setting === "all") {
      const models = Object.keys(sequelize.models);
      req.allModels = models.map(model => model.split("").map(char => ((char === char.toUpperCase()) ? ` ${char}` : char)).join("").trim());
    } else {
      const settingModel = settingModels[req.params.setting];
      settingModel.sync();
      req.model = settingModel;
    }
    next();
  } catch (err) {
    const error = catchErrorType(err);
    res.status(400).send({ error });
  }
};

module.exports = modelReq;
