const express = require("express");
const axios = require("axios");
const Cvent = require("../models/Cvent");

const cventRouter = express.Router();

const client_id = "0oaxo3nctc8Yx37qa1t7";
const client_secret =
  "pjlolTnpQsq2eb_dow-JFauZAEyFYZ_9R4SnBCq80WppMUPSKugvrt_UJG57FAxy";
const hostName = "https://api-platform.cvent.com";
const version = "ea";

let accessToken = ""; // Variable to store the access token
let tokenExpirationTime = 0; // Variable to store the expiration time of the token

// Function to get the access token
const getAccessToken = async () => {
  try {
    const clientCredentials = `${client_id}:${client_secret}`;
    const base64EncodedCredentials =
      Buffer.from(clientCredentials).toString("base64");

    const response = await axios.post(
      `${hostName}/${version}/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${base64EncodedCredentials}`,
        },
      }
    );

    accessToken = response.data.access_token; // Store the access token
    tokenExpirationTime = Date.now() + response.data.expires_in * 1000; // Set the token expiration time
    console.log("Access token obtained");
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Error fetching access token");
  }
};

// Function to fetch and update Cvent data in the database
const updateCventDataInDB = async () => {
  try {
    // Get access token if not available or expired
    if (!accessToken || Date.now() >= tokenExpirationTime) {
      await getAccessToken();
    }

    // Make the GET request to fetch Cvent data using the access token
    const response = await axios.get(`${hostName}/${version}/events`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Update or insert Cvent data into the database
    await Cvent.deleteMany({}); // Clear existing data
    await Cvent.insertMany(response.data); // Insert new data
    console.log("Cvent data updated in the database");
  } catch (error) {
    console.error("Error updating Cvent data in the database:", error);
  }
};

// Initial call to update Cvent data when the server starts
updateCventDataInDB();

// Periodically update Cvent data every 30 minutes
setInterval(updateCventDataInDB, 30 * 60 * 1000);

// Middleware to serve event data from the database
const serveEventDataFromDB = async (req, res, next) => {
  try {
    // Query the database for event data
    const eventData = await Cvent.find();
    res.json(eventData);
  } catch (error) {
    console.error("Error fetchings event data from database:", error);
    res.status(500).json({ error: "Error fetching event data from database" });
  }
};

cventRouter.get("/getcventdata", serveEventDataFromDB);

module.exports = cventRouter;
