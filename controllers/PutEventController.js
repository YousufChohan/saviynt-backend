const Event = require("../models/event");

class PutEventController {
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
        const updatedEvent = await Event.findOneAndUpdate(
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

        if (!updatedEvent) {
          return res.status(404).json({
            message: "Event not found",
          });
        }

        res.status(200).json({
          message: "Event edited successfully",
          event: updatedEvent,
        });
      } catch (error) {
        res.status(400).json({
          message: "Error editing Event",
          error: error.message,
        });
      }
    }
  }
}

module.exports = PutEventController;
