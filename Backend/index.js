import express from "express"; // Correct import
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/BookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

// Create an Express application
const app = express();

app.use(express.json());

//implemnting CORS for security measeurs
//install cors 
app.use(cors());





// Define a route for when someone visits the root URL '/'
app.get("/", (request, response) => {
  // This function is called when someone makes a GET request to the root URL '/'

  // Log the 'request' object to the console. It contains information about the incoming request.
  console.log(request);

  // Set the HTTP response status code to 234 (which is an unusual status code)
  // and send the text 'WELCOME TO MY FIRST MERN APPLICATION' as the response.
  return response.status(234).send("WELCOME TO MY FIRST MERN APPLICATION");
});

app.use('/books',booksRoute);




mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to DATABASE");
    app.listen(PORT, () => {
      // This function is called when the server starts listening.

      // Log a message to the console indicating that the app is listening on the specified port.
      console.log(`app is listening to port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
