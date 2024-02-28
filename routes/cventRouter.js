const express = require("express");
const axios = require("axios");

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

// Initial call to get the access token
getAccessToken();

// Middleware to check if the access token is expired and refresh it if necessary
const checkTokenExpiration = async (req, res, next) => {
  if (Date.now() >= tokenExpirationTime) {
    try {
      await getAccessToken(); // Refresh the access token
    } catch (error) {
      return res.status(500).json({ error: "Error refreshing access token" });
    }
  }
  next();
};

cventRouter.get("/getcventdata", checkTokenExpiration, async (req, res) => {
  try {
    if (!accessToken) {
      throw new Error("Access token not available");
    }

    // Make the GET request to the events endpoint using the stored access token
    const response = await axios.get(`${hostName}/${version}/events`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Send the response from the Cvent events endpoint to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Cvent data:", error);
    res.status(500).json({ error: "Error fetching Cvent data" });
  }
});

module.exports = cventRouter;
