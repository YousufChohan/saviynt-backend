const Event = require("../models/event");
const File = require("../models/file");

class UploadEventController {
  static async Execute(req, res) {
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

    if (
      !name ||
      !overview ||
      !dayStarts ||
      !dateStarts ||
      !venue ||
      !price ||
      !creatorName ||
      (req.files && Object.keys(req.files).length === 0)
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    } else {
      try {
        const eventPicture = [];

        if (req.files.eventPicture) {
          for (const file of req.files.eventPicture) {
            const finalFile = {
              file: file.filename,
              contentType: file.mimetype,
              docOF: req.route.path,
            };
            const fileNew = await File.create(finalFile);

            eventPicture.push(fileNew._id);
          }
        }

        const newEvent = new Event({
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
          eventPicture,
        });

        const savedEvent = await newEvent.save();

        res.status(201).json({
          message: "Event uploaded successfully",
          event: savedEvent,
        });
      } catch (error) {
        res.status(500).json({
          message: "Error uploading the Event",
          error: error.message,
        });
      }
    }
  }
}

module.exports = UploadEventController;
