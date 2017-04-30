// Let's load in some environment variables from a .env
const dotenv = require('dotenv');
dotenv.config();

// Set up an express server.
const express = require('express');
const app = express();
app.use(express.static('public'));

// Set up route handling for our express server.
const routes = require('./routes.js');
routes.setup(app);

// And finally start up our server.
const PORT = process.env.PORT || 2337;
app.listen(PORT, () => {
  console.log(`Feed curator server running on port ${PORT}. Ctrl-C to it down again.`);
});
