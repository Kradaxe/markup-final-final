const express = require("express");
const userCtrl = require("../controllers/userCtrl");
const router = express.Router();

router.route("/signup").post(userCtrl.signUp);
router.route("/login").post(userCtrl.logIn);
// router
//   .route("/note/:noteId")
//   .get(noteCtrl.read)
//   .put(noteCtrl.update)
//   .delete(noteCtrl.remove);

// router.param("noteId",noteCtrl.noteById);

module.exports = router;
