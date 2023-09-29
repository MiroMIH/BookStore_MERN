import  express  from "express";
import { Book } from '../models/BookModel.js';

const router= express.Router();


//Route to save a new book using POST

router.post("/", async (request, response) => {
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
  
router.get("/", async (request, response) => {
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
router.get("/:id", async (request, response) => {
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
  
router.put("/:id", async (request, response) => {
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
  
router.delete('/:id',async (request,response)=>{
    try
    {
      const { id } = request.params;
  
      const result= await Book.findByIdAndDelete(id);
  
      if(!result)
      {
        return response.status(404).json({message:'Book not found'});
      }
      return response.status(200).send({message:'Book deleted succefully'});
    }
    catch (error) 
    {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

export default router;
  
  
