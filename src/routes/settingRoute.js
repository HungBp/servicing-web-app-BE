const express = require("express");
const multer = require("multer");
const modelReq = require("../middleware/middleware");
const {
  // settingCreate,
  allSettingsRead,
  settingRead,
  // settingUpdate,
  settingFileUpload
} = require("../controller/settingController");

const upload = multer();
const router = express.Router();

// middleware
router.use("/:setting", modelReq);

// API
// router.post("/:setting", settingCreate);

router.get("/all", allSettingsRead);
router.get("/:setting/:currPage", settingRead);
// router.get("/completed/:currPage", (req, res) => todoRead(req, res, {completed: true, trash: false}));

router.put("/:setting/:currPage", upload.single("excel"), settingFileUpload);
// router.patch("/edit/:id", todoUpdate);

// router.delete("/delete/:id", todoDelete);

module.exports = router;
