const express = require("express");
const router = express.Router();
// const verifyToken = require("../../../middleware/verifyToken");
// const verifyAdmin = require("../../../middleware/verifyAdmin");

const deleteUser = require("../../../controllers/adminController/user/deleteUser");
const updateRole = require("../../../controllers/adminController/user/updateRole");
const updateStatus = require("../../../controllers/adminController/user/updateStatus");
const updateProfileFields = require("../../../controllers/userController/updateProfile");
const getPaginatedUsers = require("../../../controllers/adminController/user/getPaginatedUsers");
const registerAdmin = require("../../../controllers/adminController/user/registerAdmin");
const loginAdmin = require("../../../controllers/adminController/user/loginAdmin");
const verifyAdminAuth = require("../../../middleware/verifyAdminAuth");
const searchUser = require("../../../controllers/adminController/user/searchUser");
const editFullUser = require("../../../controllers/adminController/user/editFullUser");


// ALL ADMIN ROUTES → token + admin guard
// ex:-router.get("/users", verifyToken, verifyAdmin, getPaginatedUsers);
router.delete("/user/:userId", verifyAdminAuth, deleteUser);
router.patch("/user-role/:userId", verifyAdminAuth, updateRole);
router.patch("/user-status/:userId", verifyAdminAuth,  updateStatus);
router.patch("/user-edit/:userId", verifyAdminAuth, updateProfileFields);
router.get("/users", verifyAdminAuth, getPaginatedUsers);
router.post("/user-search", verifyAdminAuth, searchUser);


router.patch("/user-edit-full/:userId", verifyAdminAuth, editFullUser);

// login and register

router.post("/register", registerAdmin); 
router.post("/login", loginAdmin);


module.exports = router;
