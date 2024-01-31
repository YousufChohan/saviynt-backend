const GetEventController = require("../controllers/GetEventController");
const UploadEventController = require("../controllers/UploadEventController");
const DeleteEventController = require("../controllers/DeleteEventController"); // Import the new controller
const { files, validationResult } = require("express-validator");

const adminAuth = require("../middleware/adminAuth");
const customerAuth = require("../middleware/customerAuth");

const EventRouter = require("express").Router();

module.exports = (upload) => {
  EventRouter.post(
    "/event",
    adminAuth,
    upload.fields([{ name: "eventPicture", maxCount: 5 }]),
    async (req, res) => {
      const errors = validationResult(req);

      UploadEventController.Execute(req, res);
    }
  );

  EventRouter.get("/event", async (req, res) => {
    GetEventController.Execute(req, res);
  });

  // Add the delete route
  EventRouter.delete("/event", adminAuth, async (req, res) => {
    DeleteEventController.Execute(req, res);
  });

  return EventRouter;
};

// const GetEventController = require("../controllers/GetEventController");
// const UploadEventController = require("../controllers/UploadEventController");
// const { files, validationResult } = require("express-validator");

// const adminAuth = require("../middleware/adminAuth");
// const customerAuth = require("../middleware/customerAuth");

// const EventRouter = require("express").Router();

// module.exports = (upload) => {
//   EventRouter.post(
//     "/event",
//     adminAuth,
//     upload.fields([{ name: "eventPicture", maxCount: 5 }]),
//     async (req, res) => {
//       const errors = validationResult(req);

//       UploadEventController.Execute(req, res);
//     }
//   );

//   EventRouter.get("/event", async (req, res) => {
//     GetEventController.Execute(req, res);
//   });

//   return EventRouter;
// };
