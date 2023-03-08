"use strict";
const express = require("express");
// init express
const app = new express();
const port = 3001;

app.use(express.json());

require("dotenv").config();
const bodyParser = require("body-parser");
const session = require("express-session");

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 12000000000000,
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const {isManagerOrSupplier, isManagerOrCustomer, isManagerOrDE} = require("./middleware/check-permission")

const skusRouter = require("./routes/sku-routes");
const skuItemsAndTestResultsRouter = require("./routes/sku-items-routes");
const positionRouter = require("./routes/position-routes");
const testDescriptorRouter = require("./routes/test-descriptors-routes");
const userRouter = require("./routes/user-routes");
const restockRouter = require("./routes/restock-routes");
const returnOrderRouter = require("./routes/return-order-routes");
const internalOrderRouter = require("./routes/internal-order-routes");
const itemRouter = require("./routes/item-routes");

app.use("/api/skus", skusRouter);
app.use("/api/sku", skusRouter);

app.use("/api/skuitems", skuItemsAndTestResultsRouter);
app.use("/api/skuitem", skuItemsAndTestResultsRouter);

app.use("/api/positions", positionRouter);
app.use("/api/position", positionRouter);

app.use("/api/testDescriptors", testDescriptorRouter);
app.use("/api/testDescriptor", testDescriptorRouter);

app.use("/api/restockOrders", restockRouter);
app.use("/api/restockOrder", restockRouter);
const {getIssuedRestockOrders} = require("./controllers/restock-controller")
app.use("/api/restockOrdersIssued",isManagerOrSupplier,getIssuedRestockOrders)

app.use("/api/returnOrders", returnOrderRouter);
app.use("/api/returnOrder", returnOrderRouter);

app.use("/api/internalOrders", internalOrderRouter);
app.use("/api/internalOrder", internalOrderRouter);
const {getIssuedInternalOrders, getAcceptedInternalOrders} = require("./controllers/internal-order-controller")

app.use("/api/internalOrdersIssued", isManagerOrCustomer, getIssuedInternalOrders);
app.use("/api/internalOrdersAccepted", isManagerOrDE, getAcceptedInternalOrders);

app.use("/api/items", itemRouter);
app.use("/api/item", itemRouter);

const { hasUserRoutes } = require("./middleware/has-User-Route");
app.use("/api/", hasUserRoutes, userRouter);

app.use("*", (req, res, next) => {
  res.sendStatus(404);
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;
