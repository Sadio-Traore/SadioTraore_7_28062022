const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");
const uploadCtrl = require('../controllers/upload.controller');
const multer = require("multer");
const upload = multer();


router.get("/:id", userCtrl.userInfo);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);

// upload
router.post("/upload", upload.single("file"), uploadCtrl.uploadProfil);


module.exports = router;
