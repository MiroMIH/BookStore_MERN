import mongoose from "mongoose";

// Define the Author schema
const authorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    dateOfDeath: Date,
  });
  
  // Define the Book schema
const bookSchema = new mongoose.Schema({
    title: String,
    ISBN: String,
    publicationYear: Number,
    genre: String,
    publisher: String,
    language: String,
    synopsis: String,
    coverImage: String, // You can store the image URL or file path as a string
  });
  
  // Define the BookCopy schema
const bookCopySchema = new mongoose.Schema({
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
    copyNumber: Number,
    acquisitionDate: Date,
    condition: String,
    currentOwner: String, // You can store the user's ID or username here if applicable
    notes: String,
  });
  
  // Define the User schema (if needed)
const userSchema = new mongoose.Schema({
    username: String,
    password: String, // Be sure to hash passwords before saving them
    email: String,
    role: String,
  });
  
  // Define the BorrowingHistory schema (if needed)
const borrowingHistorySchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    bookCopy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BookCopy',
    },
    borrowDate: Date,
    dueDate: Date,
    returnDate: Date,
  });
  
  // Create mongoose models for each schema
export const Author = mongoose.model('Author', authorSchema);
export const Book = mongoose.model('Book', bookSchema);
export const BookCopy = mongoose.model('BookCopy', bookCopySchema);
export const User = mongoose.model('User', userSchema);
export const BorrowingHistory = mongoose.model('BorrowingHistory', borrowingHistorySchema);
