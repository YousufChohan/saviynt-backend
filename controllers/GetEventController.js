const Event = require("../models/event");

class GetEventController {
  static async Execute(req, res) {
    const { userID } = req.query;

    try {
      if (!userID) {
        return res.status(400).json({
          message: `Invalid Request, Please Provide a UserID`,
        });
      }

      const events = await Event.find({}).exec();

      if (events.length === 0) {
        return res.status(404).json({
          events: "No Events Were Found",
        });
      }

      res.status(200).json({
        events: events,
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

module.exports = GetEventController;
