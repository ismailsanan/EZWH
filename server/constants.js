const UNAUTHORIZED = "Unauthorized";
const INTERNAL_SERVER_ERROR = "Internal Server Error";
const NOT_FOUND = "Not found";
const UNPROCESSABLE_ENTITY = "Unprocessable Entity";
const SERVICE_UNAVAILABLE = "Service Unavailable";
const NO_CONTENT = "No Content";
const CONFLICT = "user with same mail and type already exists";

const CUSTOMER = "Customer";
const QUALITY_EMPLOYEE = "QualityEmployee";
const CLERK = "Clerk";
const DELIVERY_EMPLOYEE = "DeliveryEmployee";
const SUPPLIER = "Supplier";
const MANAGER = "Manager";
const INTERNAL_CUSTOMER = "InternalCustomer";

const USER_TYPES = [
  CUSTOMER,
  QUALITY_EMPLOYEE,
  CLERK,
  DELIVERY_EMPLOYEE,
  SUPPLIER,
];

const ISSUED = "ISSUED";
const DELIVERY = "DELIVERY";
const DELIVERED = "DELIVERED";
const TESTED = "TESTED";
const COMPLETEDRETURN = "COMPLETEDRETURN";
const COMPLETED = "COMPLETED";

const ORDER_STATES = [
  ISSUED,
  DELIVERY,
  DELIVERED,
  TESTED,
  COMPLETEDRETURN,
  COMPLETED,
];

const USER_ROUTES = [
  "/userinfo",
  "/suppliers",
  "/users",
  "/newUser",
  "/managerSessions",
  "/customerSessions",
  "/supplierSessions",
  "/clerkSessions",
  "/qualityEmployeeSessions",
  "/deliveryEmployeeSessions",
  "/logout",
  /*"/users/:username",
  "/users/:username/:type",*/
];

module.exports = {
  UNAUTHORIZED,
  CUSTOMER,
  QUALITY_EMPLOYEE,
  CLERK,
  DELIVERY_EMPLOYEE,
  SUPPLIER,
  MANAGER,
  INTERNAL_CUSTOMER,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  NOT_FOUND,
  SERVICE_UNAVAILABLE,
  NO_CONTENT,
  CONFLICT,
  USER_TYPES,
  ISSUED,
  DELIVERY,
  DELIVERED,
  TESTED,
  COMPLETEDRETURN,
  COMPLETED,
  ORDER_STATES,
  USER_ROUTES,
};
