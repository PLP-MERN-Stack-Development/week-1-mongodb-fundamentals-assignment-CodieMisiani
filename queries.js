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

//Task3
//✅1.1. Find books that are in stock and published after 2010

db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 },
});

//✅2.Projection: Show only title, author, and price
db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 });

//✅3. Sort books by price (ascending)
db.books.find().sort({ price: 1 });

//✅ 4. Sort books by price (descending)
db.books.find().sort({ price: -1 });

//✅ 5. Pagination (limit + skip) — Show 5 books per page
// Page 1
db.books.find().limit(5);

// Page 2 (skip first 5, show next 5)
db.books.find().skip(5).limit(5);

//Task 4
//✅ 1. Calculate the average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
    },
  },
]);

//✅ 2. Find the author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 },
    },
  },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 },
]);

//✅ 3. Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: {
        $subtract: ["$published_year", { $mod: ["$published_year", 10] }],
      },
    },
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 },
    },
  },
  { $sort: { _id: 1 } },
]);

//🗃️ TASK 5: Indexing
//✅ 1. Create an index on title
db.books.createIndex({ title: 1 });

//✅ 2. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

//✅ 3. Use .explain() to analyze performance
//Before indexing:
db.books.find({ title: "1984" }).explain("executionStats");
//After creating the index, run it again:
db.books.find({ title: "1984" }).explain("executionStats");
