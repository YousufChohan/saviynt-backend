const Customer = require("../models/customer");
const File = require("../models/file");

class UploadCustomerController {
  static async Execute(req, res) {
    const {
      id, // Add id to check if it's an update
      username,
      customerName,
      email,
    } = req.body;

    if (
      (!id && !username) || // Check if id is provided for updating
      !customerName ||
      !email ||
      (!id && !req.files?.customerPicture) // Check if customerPicture is present when adding a new customer
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    } else {
      try {
        let customerPicture = [];

        if (req.files && req.files.customerPicture) {
          for (const file of req.files.customerPicture) {
            const finalFile = {
              file: file.filename,
              contentType: file.mimetype,
              docOF: req.route.path,
            };
            const fileNew = await File.create(finalFile);
            customerPicture.push(fileNew._id);
          }
        }

        // Only update customerPicture if it is present in the request body
        const updateFields = {
          username,
          customerName,
          email,
        };

        if (customerPicture.length > 0) {
          updateFields.customerPicture = customerPicture;
        }

        if (id) {
          // If id is provided, update the existing customer
          const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
          );

          res.status(200).json({
            message: "Customer updated successfully",
            customer: updatedCustomer,
          });
        } else {
          // If id is not provided, create a new customer
          const newCustomer = new Customer({
            ...updateFields,
          });

          const savedCustomer = await newCustomer.save();

          res.status(201).json({
            message: "Customer created successfully",
            customer: savedCustomer,
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "Error creating/updating the Customer",
          error: error.message,
        });
      }
    }
  }
}

module.exports = UploadCustomerController;
