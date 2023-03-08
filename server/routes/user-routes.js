const express = require("express");

const router = express.Router();

const { isAuthenticated } = require("../middleware/check-auth");

const { isManager } = require("../middleware/check-permission");

const {
  getUserInfo,
  getAllSuppliers,
  getAllUsersNotManager,
  createUser,
  loginManager,
  loginCustomer,
  loginSupplier,
  loginClerk,
  loginQE,
  loginDE,
  logout,
  updateUser,
  deleteUser,
} = require("../controllers/user-controller");

router.get("/userinfo", isAuthenticated, getUserInfo);
router.get("/suppliers", isManager, getAllSuppliers);
router.get("/users", isManager, getAllUsersNotManager);
router.post("/newUser", isManager, createUser);
router.post("/managerSessions", loginManager);
router.post("/customerSessions", loginCustomer);
router.post("/supplierSessions", loginSupplier);
router.post("/clerkSessions", loginClerk);
router.post("/qualityEmployeeSessions", loginQE);
router.post("/deliveryEmployeeSessions", loginDE);
router.post("/logout", isAuthenticated, logout);
router.put("/users/:username", isManager, updateUser);
router.delete("/users/:username/:type", isManager, deleteUser);

module.exports = router;
