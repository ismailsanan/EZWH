const db = require("../model/dbHelper");

const bcrypt = require("bcryptjs");

const { SUPPLIER, MANAGER } = require("../constants");

const {
  checkIfEmail,
  checkPasswordPattern,
  checkType,
  getUserInfoAfterLogin,
} = require("../util");

// GET
const getUserInfo = async (req, res) => {
  try {
    const id = req.session.currentUser.id;
    const userInfo = await db.getUserInfo(id);
    const response = {
      id: userInfo.id,
      username: userInfo.username,
      name: userInfo.name,
      surname: userInfo.surname,
      type: userInfo.type,
    };

    res.status(200).json(response);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getAllSuppliers = async (req, res) => {
  try {
    const users = await db.getUsers();
    const suppliers = [];
    users.map((user) => {
      if (user.type === SUPPLIER) {
        suppliers.push({
          id: user.id,
          email: user.username,
          name: user.name,
          surname: user.surname,
        });
      }
    });
    res.status(200).json(suppliers);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getAllUsersNotManager = async (req, res) => {
  try {
    const users = await db.getUsers();
    const notManagers = users.filter((u) => u.type !== MANAGER);
    const response = [];
    notManagers.map((user) => {
      response.push({
        id: user.id,
        email: user.username,
        name: user.name,
        surname: user.surname,
        type: user.type,
      });
    });

    res.status(200).json(response);
  } catch (err) {
    res.sendStatus(500);
  }
};

// POST
const createUser = async (req, res) => {
  const { username, password, name, surname, type } = req.body;
  if (
    !checkIfEmail(username) ||
    !checkPasswordPattern(password) ||
    !name ||
    !surname ||
    !checkType(type)
  ) {
    res.sendStatus(422);
  } else {
    try {
      const user = await db.getUserByUsername(username);
      if (user && user.length !== 0) {
        res.sendStatus(409);
      } else {
        const hashedPwd = await bcrypt.hash(password, 8);
        const userToInsert = {
          username,
          password: hashedPwd,
          name,
          surname,
          type,
        };
        await db.createUser(userToInsert);
        res.sendStatus(201);
      }
    } catch (err) {
      err.sendStatus(503);
    }
  }
};

const loginManager = async (req, res) => {
  await login(req, res);
};

const loginCustomer = async (req, res) => {
  await login(req, res);
};

const loginSupplier = async (req, res) => {
  await login(req, res);
};

const loginClerk = async (req, res) => {
  await login(req, res);
};

const loginQE = async (req, res) => {
  await login(req, res);
};

const loginDE = async (req, res) => {
  await login(req, res);
};

const logout = (req, res) => {
  req.session.currentUser = null;
  res.sendStatus(200);
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!checkIfEmail(username) || !password) {
    res.sendStatus(401);
  } else {
    try {
      const user = await db.getUserByUsername(username);
      if (!user || user.length === 0) {
        res.sendStatus(401);
      } else {
        const u = user[0];
        const isMatch = await bcrypt.compare(password, u.password);
        if (!isMatch) {
          res.sendStatus(401);
        } else {
          const response = getUserInfoAfterLogin(u.id, u.username, u.name);
          req.session.currentUser = {
            id: response.id,
            username: response.username,
            name: response.name,
            type: u.type,
          };
          res.status(200).json(response);
        }
      }
    } catch (err) {
      res.sendStatus(503);
    }
  }
};

// PUT
const updateUser = async (req, res) => {
  const username = req.params.username;
  const { oldType, newType } = req.body;
  if (!checkIfEmail(username) || !checkType(oldType) || !checkType(newType)) {
    res.sendStatus(422);
  } else {
    try {
      const user = await db.getUserByUsername(username);
      if (!user || user.length === 0) {
        res.sendStatus(404);
      } else {
        let u = user[0];
        u.type = newType;
        await db.updateUser(u);
        res.sendStatus(200);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
};

// DELETE
const deleteUser = async (req, res) => {
  const username = req.params.username;
  const type = req.params.type;
  if (!checkIfEmail(username) || !checkType(type)) {
    res.sendStatus(422);
  } else {
    try {
      const user = await db.getUserByUsername(username);
      if (!user || user.length === 0) {
        res.sendStatus(404);
      } else {
        const u = user[0];
        if (u.type === type) {
          await db.deleteUser(u.id);
          res.sendStatus(204);
        } else {
          res.sendStatus(422);
        }
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
};

module.exports = {
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
};
