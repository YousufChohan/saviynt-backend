const Event = require("../models/event");
const File = require("../models/file");

class UploadEventController {
  static async Execute(req, res) {
    const {
      id, // Add id to check if it's an update
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
      (!id && !name) || // Check if id is provided for updating
      !overview ||
      !dayStarts ||
      !dateStarts ||
      !venue ||
      !price ||
      !creatorName ||
      (!id && !req.files?.eventPicture) // Check if eventPicture is present when adding a new event
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    } else {
      try {
        let eventPicture = [];

        if (req.files && req.files.eventPicture) {
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

        // Only update eventPicture if it is present in the request body
        const updateFields = {
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
        };

        if (eventPicture.length > 0) {
          updateFields.eventPicture = eventPicture;
        }

        if (id) {
          // If id is provided, update the existing event
          const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
          );

          res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent,
          });
        } else {
          // If id is not provided, create a new event
          const newEvent = new Event({
            ...updateFields,
          });

          const savedEvent = await newEvent.save();

          res.status(201).json({
            message: "Event uploaded successfully",
            event: savedEvent,
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "Error uploading/updating the Event",
          error: error.message,
        });
      }
    }
  }
}

module.exports = UploadEventController;

// const Event = require("../models/event");
// const File = require("../models/file");

// class UploadEventController {
//   static async Execute(req, res) {
//     const {
//       name,
//       overview,
//       dayStarts,
//       dayEnds,
//       dateStarts,
//       dateEnds,
//       timeStarts,
//       timeEnds,
//       venue,
//       specialFeatures,
//       price,
//       creatorName,
//     } = req.body;

//     if (
//       !name ||
//       !overview ||
//       !dayStarts ||
//       !dateStarts ||
//       !venue ||
//       !price ||
//       !creatorName ||
//       (req.files && Object.keys(req.files).length === 0)
//     ) {
//       return res.status(400).json({
//         message: "Missing required fields",
//       });
//     } else {
//       try {
//         const eventPicture = [];

//         if (req.files.eventPicture) {
//           for (const file of req.files.eventPicture) {
//             const finalFile = {
//               file: file.filename,
//               contentType: file.mimetype,
//               docOF: req.route.path,
//             };
//             const fileNew = await File.create(finalFile);

//             eventPicture.push(fileNew._id);
//           }
//         }

//         const newEvent = new Event({
//           name,
//           overview,
//           dayStarts,
//           dayEnds,
//           dateStarts,
//           dateEnds,
//           timeStarts,
//           timeEnds,
//           venue,
//           specialFeatures,
//           price,
//           creatorName,
//           eventPicture,
//         });

//         const savedEvent = await newEvent.save();

//         res.status(201).json({
//           message: "Event uploaded successfully",
//           event: savedEvent,
//         });
//       } catch (error) {
//         res.status(500).json({
//           message: "Error uploading the Event",
//           error: error.message,
//         });
//       }
//     }
//   }
// }

// module.exports = UploadEventController;
