const settingModelCols = require("../model/settingModelCol");
const excelRead = require("../utils/excelHandle");
const catchErrorType = require("../utils/errorHandle");

// const locationCreate = (req, res) => {
//   req.model.create(req.body)
//     .then(() => res.send())
//     .catch(err => res.status(400).send({ error: err.message }));
// };

const allSettingsRead = (req, res) => {
  res.json({ count: req.allModels.length, rows: req.allModels });
};

const settingRead = (req, res) => {
  const limitPagination = 10;
  const offsetPagination = limitPagination * (req.params.currPage - 1);

  /** url path is lower case, find model (key in object) being convert to lower case that equal to url path */
  const modelCols = Object.keys(settingModelCols[Object.keys(settingModelCols).find(model => model.toLowerCase() === req.params.setting)]);

  req.model.findAndCountAll({
    raw: true,
    order: [["id", "ASC"]],
    attributes: modelCols,
    offset: offsetPagination,
    limit: limitPagination
  })
    .then(({ count, rows }) => {
      res.json({ count, rows });
    })
    .catch(err => {
      const error = catchErrorType(err);
      res.status(400).send({ error });
    });
};

// const locationUpdate = (req, res) => {
// req.model.update(req.body, {
//   where: { id: req.params.id }
// })
//   .then(() => req.todo.findAll())
//   .then(data => res.json(data))
// }

// const locationDelete = (req, res) => {
//   req.model.destroy({
//     where: { id: req.params.id }
//   })
//     .then(() => res.json({ id: Number(req.params.id) }))
//     .catch(err => res.status(400).send({ error: err.message }));
// };

const settingFileUpload = (req, res) => {
  const modelCols = Object.keys(settingModelCols[Object.keys(settingModelCols).find(model => model.toLowerCase() === req.params.setting)]);
  const wsRows = excelRead(req.file.buffer, modelCols, req.params.setting);

  if (!wsRows) {
    res.status(400).send({ error: "The uploaded file is not in right format. Please use template in download." });
  } else {
    let backup = [];
    /** Get the backup of table before destroy in case there are errors when bulkCreate */
    req.model.findAll({ raw: true })
      .then(rows => {
        backup = rows;
        return req.model.destroy({ truncate: true });
      })
      .then(() => req.model.bulkCreate(wsRows, { validate: true }))
      .then(() => settingRead(req, res))
      .catch(err => {
        req.model.bulkCreate(backup);

        const error = catchErrorType(err);
        res.status(400).send({ error });
      });
  }
};

module.exports = {
  // locationCreate,
  allSettingsRead,
  settingRead,
  // locationUpdate,
  // locationDelete,
  settingFileUpload
};
