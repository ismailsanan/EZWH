const {
  UNAUTHORIZED,
  CUSTOMER,
  QUALITY_EMPLOYEE,
  CLERK,
  DELIVERY_EMPLOYEE,
  SUPPLIER,
  MANAGER,
  INTERNAL_CUSTOMER,
} = require("../constants");

const isManager = (req, res, next) => {
  const currentSession = req.session.currentUser;
  if (!currentSession || currentSession.type !== MANAGER) {
    return res.sendStatus(401);
  }
  next();
};

const isClerk = (req, res, next) => {
  const currentSession = req.session.currentUser;
  if (!currentSession || currentSession.type !== CLERK) {
    return res.sendStatus(401);
  }
  next();
};

const isCustomer = (req, res, next) => {
  const currentSession = req.session.currentUser;
  if (!currentSession || currentSession.type !== CUSTOMER) {
    return res.sendStatus(401);
  }
  next();
};

const isQualityEmployee = (req, res, next) => {
  const currentSession = req.session.currentUser;
  if (!currentSession || currentSession.type !== QUALITY_EMPLOYEE) {
    return res.sendStatus(401);
  }
  next();
};

const isSupplier = (req, res, next) => {
  const currentSession = req.session.currentUser;
  if (!currentSession || currentSession.type !== SUPPLIER) {
    return res.sendStatus(401);
  }
  next();
};

const isDeliveryEmployee = (req, res, next) => {
  const currentSession = req.session.currentUser;
  if (!currentSession || currentSession.type !== DELIVERY_EMPLOYEE) {
    return res.sendStatus(401);
  }
  next();
};

const isInternalCustomer = (req, res, next) => {
  const currentSession = req.session.currentUser;
  if (!currentSession || currentSession.type !== INTERNAL_CUSTOMER) {
    return res.sendStatus(401);
  }
  next();
};

const isManagerOrCustomerOrClerk = (req, res, next) => {
  const currentSession = req.session.currentUser;
  const hasPermission =
    !currentSession ||
    currentSession.type !== MANAGER ||
    currentSession.type !== CUSTOMER ||
    currentSession.type !== CLERK;
  if (!hasPermission) {
    return res.sendStatus(401);
  }
  next();
};

const isManagerOrCustomer = (req, res, next) => {
  const currentSession = req.session.currentUser;
  const hasPermission =
    !currentSession ||
    currentSession.type !== MANAGER ||
    currentSession.type !== CUSTOMER;
  if (!hasPermission) {
    return res.sendStatus(401);
  }
  next();
};

const isManagerOrClerk = (req, res, next) => {
  const currentSession = req.session.currentUser;
  const hasPermission =
    !currentSession ||
    currentSession.type !== MANAGER ||
    currentSession.type !== CLERK;
  if (!hasPermission) {
    return res.sendStatus(401);
  }
  next();
};

const isManagerOrQE = (req, res, next) => {
  const currentSession = req.session.currentUser;
  const hasPermission =
    !currentSession ||
    currentSession.type !== MANAGER ||
    currentSession.type !== QUALITY_EMPLOYEE;
  if (!hasPermission) {
    return res.sendStatus(401);
  }
  next();
};

const isManagerOrClerkOrQE = (req, res, next) => {
  const currentSession = req.session.currentUser;
  const hasPermission =
    !currentSession ||
    currentSession.type !== MANAGER ||
    currentSession.type !== CLERK ||
    currentSession.type !== QUALITY_EMPLOYEE;
  if (!hasPermission) {
    return res.sendStatus(401);
  }
  next();
};

const isManagerOrSupplier = (req, res, next) => {
  const currentSession = req.session.currentUser;
  const hasPermission =
    !currentSession ||
    currentSession.type !== MANAGER ||
    currentSession.type !== SUPPLIER;
  if (!hasPermission) {
    return res.sendStatus(401);
  }
  next();
};

const isManagerOrDE = (req, res, next) => {
  const currentSession = req.session.currentUser;
  const hasPermission =
    !currentSession ||
    currentSession.type !== MANAGER ||
    currentSession.type !== DELIVERY_EMPLOYEE;
  if (!hasPermission) {
    return res.sendStatus(401);
  }
  next();
};

const isManagerOrDEOrInternalCustomer = (req, res, next) => {
  const currentSession = req.session.currentUser;
  const hasPermission =
    !currentSession ||
    currentSession.type !== MANAGER ||
    currentSession.type !== DELIVERY_EMPLOYEE ||
    currentSession.type !== INTERNAL_CUSTOMER;
  if (!hasPermission) {
    return res.sendStatus(401);
  }
  next();
};

module.exports = {
  isManager,
  isClerk,
  isCustomer,
  isQualityEmployee,
  isSupplier,
  isDeliveryEmployee,
  isInternalCustomer,
  isManagerOrCustomerOrClerk,
  isManagerOrCustomer,
  isManagerOrClerk,
  isManagerOrQE,
  isManagerOrClerkOrQE,
  isManagerOrSupplier,
  isManagerOrDE,
  isManagerOrDEOrInternalCustomer,
};
