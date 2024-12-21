const express = require('express');
const router = express.Router();

const { addUser, uploadImage, uploadExcel, getUser, deleteUser, updateUser, deleteUserForcefully, addUsersFromExcel, downloadSampleExcel} = require("../controllers/user");

// ********************************************************************************************************
//                                     User routes
// ********************************************************************************************************

// Post User in DataBase
router.post("/addUser", addUser);
router.post("/getUser", getUser);
router.post("/deleteUser", deleteUser);
router.post("/updateUser", updateUser);
router.post("/deleteUserForcefully", deleteUserForcefully);
router.post("/add-users-excel", uploadExcel, addUsersFromExcel);
router.get("/download-sample-excel", downloadSampleExcel);

module.exports = router;
