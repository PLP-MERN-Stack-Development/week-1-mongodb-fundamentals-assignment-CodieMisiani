//Find all the books in the 'Fiction' genre
db.books.find({ genre: "Fiction" });
// Find all books published after the year 2000
db.books.find({ published_year: { $gt: 2000 } });
// Find all books by George Orwell
db.books.find({ author: "George Orwell" });
// Update the price of the book titled "1984" to 13.99
db.books.updateOne(
  { title: "1984" }, // Find the book
  { $set: { price: 13.99 } } // Change its price
);
//updateOne = update one document

//$set = update this field only
//This changes the price field of the book titled "1984" to 13.99.
// Delete the book titled "Animal Farm"
db.books.deleteOne({ title: "Animal Farm" });
