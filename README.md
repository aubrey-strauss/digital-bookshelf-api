# 📚 Digital Bookshelf API

A RESTful API for a local library to manage its book inventory. Built with **Node.js, Express, MongoDB Atlas and Mongoose** for Per Scholas Lab 13.2 (Mongoose Models and Schemas).

## Features

- Full CRUD (Create, Read, Update, Delete) for books
- Mongoose schema with validation: `title` and `author` are required, `isbn` is unique, `inStock` defaults to `true`
- Modular structure: database connection, model and routes each live in their own folder
- Every route uses `async/await` with `try...catch` error handling

## Project structure

```
digital-bookshelf-api/
├── server.js            # starts Express, parses JSON, mounts routes
├── db/connection.js     # connects to MongoDB Atlas
├── models/Book.js       # Book schema + model
└── routes/bookRoutes.js # the 5 CRUD endpoints
```

## Setup

1. Clone the repo and install packages:
   ```
   npm install
   ```
2. Create a `.env` file in the project root:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=3000
   ```
3. Start the server:
   ```
   node server.js
   ```

## API endpoints

Base URL: `http://localhost:3000/api/books`

| Method | Endpoint         | What it does                     | Success                                       |
| ------ | ---------------- | -------------------------------- | --------------------------------------------- |
| POST   | `/api/books`     | Create a book from the JSON body | 201 + new book                                |
| GET    | `/api/books`     | Get all books                    | 200 + array                                   |
| GET    | `/api/books/:id` | Get one book by `_id`            | 200 + book (404 if not found)                 |
| PUT    | `/api/books/:id` | Update a book by `_id`           | 200 + updated book (404 if not found)         |
| DELETE | `/api/books/:id` | Delete a book by `_id`           | 200 + confirmation message (404 if not found) |

Example POST body:

```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "isbn": "9780547928227",
  "publishedDate": "1937-09-21"
}
```

## Reflection

**1. Why is it beneficial to separate routes, models, and the database connection into different directories?**
Each file has one job, so it's easier to find things and fix them. When my POST wasn't working, I knew the problem had to be in either `server.js` or `bookRoutes.js`, not in the model or connection. It also makes the code reusable: if I add an "authors" feature later, I just add a new model and route file without touching the database code.

**2. What is the difference between PUT and PATCH, and which one does my PUT /:id resemble?**
PUT is meant to replace the whole document, while PATCH changes only the fields you send. My `PUT /:id` behaves more like PATCH. When I sent just `title` and `inStock`, the author, ISBN and date stayed the same, because `findByIdAndUpdate` merges the changes into the existing book instead of replacing it.

**3. What is a good practice for the response after a successful DELETE?**
I send a 200 with a confirmation message _and_ the deleted book. The message confirms it worked, and the book shows exactly what was removed, which helps if the wrong one was deleted by mistake. Another common choice is 204 No Content (no body at all), which is lighter but gives the client less feedback.

## What I learned

- How a schema (the blueprint) becomes a model (the tool that saves and finds data)
- Testing every endpoint in Postman, including the "not found" cases
- Debugging by checking what actually arrives: an empty request body turned out to be Postman's Body set to "none," which I found by logging `req.body` and seeing Content-Length 0
- A 200 status doesn't always mean it worked; I check the data that comes back
