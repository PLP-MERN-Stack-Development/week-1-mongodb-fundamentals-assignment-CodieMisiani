[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19909523&assignment_repo_type=AssignmentRepo)

# MongoDB Fundamentals Assignment

This assignment focuses on learning MongoDB fundamentals including setup, CRUD operations, advanced queries, aggregation pipelines, and indexing.

## Assignment Overview

You will:

1. Set up a MongoDB database
2. Perform basic CRUD operations
3. Write advanced queries with filtering, projection, and sorting
4. Create aggregation pipelines for data analysis
5. Implement indexing for performance optimization

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install MongoDB locally or set up a MongoDB Atlas account
4. Run the provided `insert_books.js` script to populate your database
5. Complete the tasks in the assignment document

## Files Included

- `Week1-Assignment.md`: Detailed assignment instructions
- `insert_books.js`: Script to populate your MongoDB database with sample book data

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- MongoDB Shell (mongosh) or MongoDB Compass

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all tasks in the assignment
2. Add your `queries.js` file with all required MongoDB queries
3. Include a screenshot of your MongoDB database
4. Update the README.md with your specific setup instructions

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)

### ✅ Task 1: MongoDB Setup

- Installed MongoDB locally
- Created a new database named `plp_bookstore`
- Created a collection named `books`
- Confirmed insertion using `insert_books.js`:

Connected to MongoDB server
12 books were successfully inserted into the database

- Verified data using MongoDB Compass (screenshot added)

### ✅ Task 2: Basic CRUD Operations

✔️ Inserted 12 book documents using `insert_books.js`

✔️ MongoDB Queries:

- Find all books in the Fiction genre:
  ```js
  db.books.find({ genre: "Fiction" });
  ```
  🔍 Find books published after 1950:

db.books.find({ published_year: { $gt: 1950 } });
🔍 Find books by George Orwell:

db.books.find({ author: "George Orwell" });
✏️ Update the price of "1984" to 13.99:

db.books.updateOne({ title: "1984" }, { $set: { price: 13.99 } });
❌ Delete the book "Animal Farm":

db.books.deleteOne({ title: "Animal Farm" });
✅ Task 3: Advanced Queries
📌 Queries:
🔍 Find books that are in stock and published after 2010:

db.books.find({ in_stock: true, published_year: { $gt: 2010 } });
🎯 Return only the title, author, and price fields (Projection):

db.books.find({}, { title: 1, author: 1, price: 1, \_id: 0 });
📈 Sort books by price in ascending order:

db.books.find().sort({ price: 1 });
📉 Sort books by price in descending order:

db.books.find().sort({ price: -1 });
📖 Pagination (Page 1 = limit 5):

db.books.find().limit(5);
📖 Pagination (Page 2 = skip 5, limit 5):

db.books.find().skip(5).limit(5);
✅ Task 4: Aggregation Pipelines
📌 Queries:
📊 Average price of books by genre:

db.books.aggregate([
{ $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
]);
🧑‍💼 Author with the most books:
db.books.aggregate([
{ $group: { _id: "$author", totalBooks: { $sum: 1 } } },
{ $sort: { totalBooks: -1 } },
{ $limit: 1 }
]);
🕰️ Group books by publication decade:

db.books.aggregate([
{ $project: { decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } } },
{ $group: { _id: "$decade", count: { $sum: 1 } } },
{ $sort: { \_id: 1 } }
]);
✅ Task 5: Indexing
📌 Index Creation and Analysis
🚀 Create index on title for fast searches:

db.books.createIndex({ title: 1 });
🚀 Create compound index on author and published_year:

db.books.createIndex({ author: 1, published_year: -1 });
🔍 Use .explain() to see performance improvement:

db.books.find({ title: "1984" }).explain("executionStats");
