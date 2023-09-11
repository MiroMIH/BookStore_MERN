import express, { response } from "express";
import { PORT } from "./config.js";


// Create an Express application
const app = express();

// Define a route for when someone visits the root URL '/'
app.get('/', (request, response) => {
  // This function is called when someone makes a GET request to the root URL '/'

  // Log the 'request' object to the console. It contains information about the incoming request.
  console.log(request);

  // Set the HTTP response status code to 234 (which is an unusual status code)
  // and send the text 'WELCOME TO MY FIRST MERN APPLICATION' as the response.
  return response.status(234).send('WELCOME TO MY FIRST MERN APPLICATION');
});

// Start the server and make it listen on a specific port number.
// In this code, it's assumed that 'PORT' is a variable that holds the port number.
app.listen(PORT, () => {
  // This function is called when the server starts listening.

  // Log a message to the console indicating that the app is listening on the specified port.
  console.log(`app is listening to port : ${PORT}`);
});