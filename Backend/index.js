import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/BookModel.js";

// Create an Express application
const app = express();

app.use(express.json());

// Define a route for when someone visits the root URL '/'
app.get("/", (request, response) => {
  // This function is called when someone makes a GET request to the root URL '/'

  // Log the 'request' object to the console. It contains information about the incoming request.
  console.log(request);

  // Set the HTTP response status code to 234 (which is an unusual status code)
  // and send the text 'WELCOME TO MY FIRST MERN APPLICATION' as the response.
  return response.status(234).send("WELCOME TO MY FIRST MERN APPLICATION");
});

//Route to save a new book using POST

app.post("/books", async (request, response) => {
  try {
    const {
      title,
      ISBN,
      publicationYear,
      genre,
      publisher,
      language,
      synopsis,
      coverImage,
    } = request.body;

    if (!title || !ISBN || !publicationYear) {
      return response
        .status(400)
        .send({ message: "Title, ISBN, and publication year are required." });
    }

    const NewBook = {
      title: request.body.title,
      ISBN: request.body.ISBN,
      publicationYear: request.body.publicationYear,
    };

    const book = await Book.create(NewBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route to get all books from database

app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get one book by id from  database
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Start the server and make it listen on a specific port number.
// In this code, it's assumed that 'PORT' is a variable that holds the port number.

//update a book in DATABASE

app.put("/books/:id", async (request, response) => {
  try {
    const {
      title,
      ISBN,
      publicationYear,
      genre,
      publisher,
      language,
      synopsis,
      coverImage,
    } = request.body;

    if (!title || !ISBN || !publicationYear) {
      return response
        .status(400)
        .send({ message: "Title, ISBN, and publication year are required." });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Book delete
//Call delete function from app with id

app.delete('/books/:id',async (request,response)=>{
  try
  {
    const { id } = request.params;
    const result= await Book.findByIdAndDelete(id);
    if(!result){return response.status(404).json({message:'Book not found'});}
    return response.status(200).send({message:'Book deleted succefully'});
  }
  catch (error) 
  {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
})


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
