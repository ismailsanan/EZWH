# **EZWH - Code**

Medium companies and retailers need a simple application to manage the relationship with suppliers and the inventory of physical items stocked in a physical warehouse.
The warehouse is supervised by a manager, who supervises the availability of items. When a certain item is in short supply, the manager issues an order to a supplier. In general the same item can be purchased by many suppliers. The warehouse keeps a list of possible suppliers per item.
After some time the items ordered to a supplier are received. The items must be quality checked and stored in specific positions in the warehouse. The quality check is performed by specific roles (quality office), who apply specific tests for item (different items are tested differently). Possibly the tests are not made at all, or made randomly on some of the items received. If an item does not pass a quality test it may be rejected and sent back to the supplier.
Storage of items in the warehouse must take into account the availability of physical space in the warehouse. Further the position of items must be traced to guide later recollection of them.
The warehouse is part of a company. Other organizational units (OU) of the company may ask for items in the warehouse. This is implemented via internal orders, received by the warehouse. Upon reception of an internal order the warehouse must collect the requested item(s), prepare them and deliver them to a pick up area. When the item is collected by the other OU the internal order is completed.
EZWH (EaSy WareHouse) is a software application to support the management of a warehouse.


## **Setup and start of frontend and backend**

### **How to start backend**

1. Open a new shell
2. In code folder run cmd `cd server`
3. Run cmd `npm install -g nodemon`
4. Run cmd `npm install` to install all modules
5. Run cmd `nodemon server.js`

Steps 3 and 4 need to be executed ONLY THE FIRST TIME you start the server. Then just skip them and follow step 1,2,5.

### **How to start frontend**

1. Open a new shell
2. In code folder run cmd `cd client`
3. Run cmd `npm install` to install all modules
4. Run cmd `npm start`

Steps 3 need to be executed ONLY THE FIRST TIME you start the frontend. Then just skip it and follow step 1,2,4.

## **List of hardcoded accounts**
**Password is always**: testpassword

**Customer**: user1@ezwh.com

**Quality Employee**: qualityEmployee1@ezwh.com

**Clerk**: clerk1@ezwh.com

**Delivery Employee**: deliveryEmployee1@ezwh.com

**Supplier**: supplier1@ezwh.com

**Manager**: manager1@ezwh.com
