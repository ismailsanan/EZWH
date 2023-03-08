//npx knex migrate:latest
exports.up = function (knex) {
  return knex.schema
    .createTable("user", (tbl) => {
      tbl.increments(); // id
      tbl.string("username", 128).unique().notNullable().index();
      tbl.string("password", 128).notNullable();
      tbl.string("name", 128).notNullable();
      tbl.string("surname", 128).notNullable();
      tbl.string("type", 20).notNullable();
      tbl.timestamps(true, true);
    })

    .createTable("position", (tbl) => {
      tbl.increments(); // id
      tbl.string("positionId").unique().notNullable();
      tbl.string("aisleId", 10).notNullable();
      tbl.integer("row").unsigned().notNullable();
      tbl.integer("column").unsigned().notNullable();
      tbl.double("maxWeight").unsigned().notNullable();
      tbl.double("maxVolume").unsigned().notNullable();
      tbl.integer("skuId");
      tbl.string("rfid");
      tbl.timestamps(true, true);
    })

    .createTable("sku", (tbl) => {
      tbl.increments();
      tbl.string("description");
      tbl.double("weight").unsigned().notNullable();
      tbl.double("volume").unsigned().notNullable();
      tbl.string("notes");
      tbl.double("price").unsigned();
      tbl.integer("availableQuantity").unsigned();
      tbl.timestamps(true, true);
    })

    .createTable("skuItem", (tbl) => {
      tbl.increments();
      tbl.string("rfid").unique().notNullable();
      tbl.integer("skuId").notNullable();
      tbl.string("dateOfStock");
      tbl.boolean("available");
      tbl.timestamps(true, true);
    })

    .createTable("testDescriptor", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).notNullable();
      tbl.string("procedureDescription", 128).notNullable();
      tbl.integer("skuId").notNullable();
      tbl.timestamps(true, true);
    })

    .createTable("item", (tbl) => {
      tbl.integer("id").unique().notNullable();
      tbl.string("description", 128);
      tbl.double("price").unsigned().notNullable();
      tbl.integer("skuId").notNullable();
      tbl.integer("supplierId").notNullable();
      tbl.timestamps(true, true);
    })

    .createTable("testResult", (tbl) => {
      tbl.increments();
      tbl.integer("idTestDescriptor").notNullable();
      tbl.string("date", 128).notNullable();
      tbl.boolean("result");
      tbl.string("rfid").notNullable();
      tbl.timestamps(true, true);
    })

    .createTable("restockOrder", (tbl) => {
      tbl.increments();
      tbl.string("issueDate", 128).notNullable();
      tbl.integer("supplierId").notNullable();
      tbl.string("state").notNullable();
      tbl.string("transportNote", 128);
      tbl.timestamps(true, true);
    })

    .createTable("restockOrderSkuRelation", (tbl) => {
      tbl.increments();
      tbl.integer("restockOrderId").notNullable();
      tbl.integer("skuId").notNullable();
      tbl.string("rfid");
      tbl.timestamps(true, true);
    })

    .createTable("internalOrder", (tbl) => {
      tbl.increments();
      tbl.string("issueDate", 128).notNullable();
      tbl.integer("customerId").notNullable();
      tbl.string("state").notNullable();
      tbl.timestamps(true, true);
    })

    .createTable("internalOrderSkuRelation", (tbl) => {
      tbl.increments();
      tbl.integer("internalOrderId").notNullable();
      tbl.integer("skuId").notNullable();
      tbl.string("rfid");
      tbl.timestamps(true, true);
    })

    .createTable("returnOrder", (tbl) => {
      tbl.increments();
      tbl.string("returnDate", 128).notNullable();
      tbl.integer("restockOrderId").notNullable();
      tbl.timestamps(true, true);
    })

    .createTable("returnOrderSkuRelation", (tbl) => {
      tbl.increments();
      tbl.integer("returnOrderId").notNullable();
      tbl.integer("skuId").notNullable();
      tbl.string("rfid");
      tbl.timestamps(true, true);
    });
};

//npx knex migrate:rollback
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("position")
    .dropTableIfExists("user")
    .dropTableIfExists("sku")
    .dropTableIfExists("skuItem")
    .dropTableIfExists("testDescriptor")
    .dropTableIfExists("testResult")
    .dropTableIfExists("item")
    .dropTableIfExists("restockOrder")
    .dropTableIfExists("returnOrder")
    .dropTableIfExists("internalOrder")
    .dropTableIfExists("internalOrderSkuRelation")
    .dropTableIfExists("restockOrderSkuRelation");
};
