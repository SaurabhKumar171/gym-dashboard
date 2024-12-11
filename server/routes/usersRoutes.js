const express = require('express');
const router = express.Router();

const { addUser, uploadImage, getUser, deleteUser, updateUser, deleteUserForcefully } = require("../controllers/user");

// ********************************************************************************************************
//                                     User routes
// ********************************************************************************************************

// Post User in DataBase
router.post("/addUser",uploadImage, addUser);
router.post("/getUser", getUser);
router.post("/deleteUser", deleteUser);
router.post("/updateUser", uploadImage, updateUser);
router.post("/deleteUserForcefully", deleteUserForcefully);

module.exports = router;
