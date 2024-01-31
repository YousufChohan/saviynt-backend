const Event = require("../models/event");

class DeleteEventController {
  static async Execute(req, res) {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        message: "Invalid Request",
      });
    } else {
      try {
        const result = await Event.findOneAndDelete({ _id: id });

        if (result) {
          return res.status(200).json({
            message: "Event Deleted Successfully",
          });
        } else {
          return res.status(404).json({
            message: "Event not found",
          });
        }
      } catch (err) {
        return res.status(500).json({
          message: "Error Deleting Event",
          error: err,
        });
      }
    }
  }
}

module.exports = DeleteEventController;
