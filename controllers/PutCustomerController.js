const Customer = require("../models/customer");

class PutCustomerController {
  static async Execute(req, res) {
    const { id } = req.query;
    const {
      name,
      overview,
      dayStarts,
      dayEnds,
      dateStarts,
      dateEnds,
      timeStarts,
      timeEnds,
      venue,
      specialFeatures,
      price,
      creatorName,
    } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Invalid request",
      });
    } else {
      try {
        const updatedCustomer = await Customer.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              name,
              overview,
              dayStarts,
              dayEnds,
              dateStarts,
              dateEnds,
              timeStarts,
              timeEnds,
              venue,
              specialFeatures,
              price,
              creatorName,
            },
          },
          { new: true } // Return the updated document
        );

        if (!updatedCustomer) {
          return res.status(404).json({
            message: "Customer not found",
          });
        }

        res.status(200).json({
          message: "Customer edited successfully",
          customer: updatedCustomer,
        });
      } catch (error) {
        res.status(400).json({
          message: "Error editing Customer",
          error: error.message,
        });
      }
    }
  }
}

module.exports = PutCustomerController;
