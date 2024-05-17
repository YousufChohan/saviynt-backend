const Customer = require("../models/customer");

class DeleteCustomerController {
  static async Execute(req, res) {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        message: "Invalid Request",
      });
    } else {
      try {
        const result = await Customer.findOneAndDelete({ _id: id });

        if (result) {
          return res.status(200).json({
            message: "Customer Deleted Successfully",
          });
        } else {
          return res.status(404).json({
            message: "Customer not found",
          });
        }
      } catch (err) {
        return res.status(500).json({
          message: "Error Deleting Customer",
          error: err,
        });
      }
    }
  }
}

module.exports = DeleteCustomerController;
