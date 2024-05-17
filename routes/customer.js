const GetCustomerController = require("../controllers/GetCustomerController");
const UploadCustomerController = require("../controllers/UploadCustomerController");
const DeleteCustomerController = require("../controllers/DeleteCustomerController"); // Import the new controller
const { files, validationResult } = require("express-validator");

const adminAuth = require("../middleware/adminAuth");
const customerAuth = require("../middleware/customerAuth");

const CustomerRouter = require("express").Router();

module.exports = (upload) => {
  CustomerRouter.post(
    "/customer",
    upload.fields([{ name: "customerPicture", maxCount: 1 }]),
    async (req, res) => {
      const errors = validationResult(req);

      UploadCustomerController.Execute(req, res);
    }
  );

  CustomerRouter.get("/customer", async (req, res) => {
    GetCustomerController.Execute(req, res);
  });

  // Add the delete route
  CustomerRouter.delete("/customer", adminAuth, async (req, res) => {
    DeleteCustomerController.Execute(req, res);
  });

  return CustomerRouter;
};

// const GetCustomerController = require("../controllers/GetCustomerController");
// const UploadCustomerController = require("../controllers/UploadCustomerController");
// const { files, validationResult } = require("express-validator");

// const adminAuth = require("../middleware/adminAuth");
// const customerAuth = require("../middleware/customerAuth");

// const CustomerRouter = require("express").Router();

// module.exports = (upload) => {
//   CustomerRouter.post(
//     "/customer",
//     adminAuth,
//     upload.fields([{ name: "customerPicture", maxCount: 5 }]),
//     async (req, res) => {
//       const errors = validationResult(req);

//       UploadCustomerController.Execute(req, res);
//     }
//   );

//   CustomerRouter.get("/customer", async (req, res) => {
//     GetCustomerController.Execute(req, res);
//   });

//   return CustomerRouter;
// };
