const Customer = require("../models/customer");

class GetCustomerController {
  static async Execute(req, res) {
    const { userID } = req.query;

    try {
      if (!userID) {
        return res.status(400).json({
          message: `Invalid Request, Please Provide a UserID`,
        });
      }

      const customers = await Customer.find({}).exec();

      if (customers.length === 0) {
        return res.status(404).json({
          customers: "No Customers Were Found",
        });
      }

      res.status(200).json({
        customers: customers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
}

module.exports = GetCustomerController;
