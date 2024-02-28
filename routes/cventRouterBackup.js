// const express = require("express");
// const axios = require("axios");

// const cventRouter = express.Router();

// const client_id = "0oaxo3nctc8Yx37qa1t7";
// const client_secret =
//   "pjlolTnpQsq2eb_dow-JFauZAEyFYZ_9R4SnBCq80WppMUPSKugvrt_UJG57FAxy";
// const hostName = "https://api-platform.cvent.com";
// const version = "ea";

// let accessToken = ""; // Variable to store the access token

// cventRouter.post("/get-access-token", async (req, res) => {
//   try {
//     const clientCredentials = `${client_id}:${client_secret}`;
//     const base64EncodedCredentials =
//       Buffer.from(clientCredentials).toString("base64");

//     const response = await axios.post(
//       `${hostName}/${version}/oauth2/token`,
//       "grant_type=client_credentials",
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: `Basic ${base64EncodedCredentials}`,
//         },
//       }
//     );
//     console.log(response.data);
//     accessToken = response.data.access_token; // Store the access token
//     res.json({ access_token: accessToken });
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ error: "Error fetching access token" });
//   }
// });

// cventRouter.get("/getcventdata", async (req, res) => {
//   try {
//     if (!accessToken) {
//       throw new Error("Access token not available");
//     }

//     // Make the GET request to the contacts endpoint using the stored access token
//     const response = await axios.get(`${hostName}/${version}/events`, {
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     // Send the response from the Cvenst contacts endpoint to the client
//     res.json(response.data);
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ error: "Error fetching Cvent data" });
//   }
// });

// module.exports = cventRouter;
