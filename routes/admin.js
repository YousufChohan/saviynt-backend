const AdminRouter = require("express").Router();

const UploadAdmin = require("../controllers/UploadAdmin");

const adminAuth = require("../middleware/adminAuth");

AdminRouter.post("/admin", adminAuth, async (req, res) => {
    UploadAdmin.Execute(req, res);
});


module.exports = AdminRouter;
