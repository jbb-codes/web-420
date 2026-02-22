// Name: Jarren Bess
// Date: Jan 30, 2026
// File name: app.js
// Description: In-N-Out-Books is an app that lets users manage their book collection

const express = require("express");
const createError = require("http-errors");
const books = require("../database/books");

const app = express();

// This was missing: had to use Copilot to find the issue with the post request for this week's assignment.
app.use(express.json());

app.get("/", async (req, res, next) => {
  // Landing page created with GitHub Copilot
  const html = `
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Book Collection Manager</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    header {
      background-color: #35424a;
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    header h1 {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 700;
    }

    main {
      flex: 1 0 auto;
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 30px;
      padding: 30px 20px;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
    }

    main>aside {
      position: sticky;
      top: 30px;
      height: fit-content;
    }

    main>article {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    section,
    aside {
      background: #ffffff;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    section:hover,
    aside:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    }

    h2 {
      color: #35424a;
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 1.5rem;
    }

    #top-selling ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    #top-selling li {
      padding: 15px;
      border-bottom: 1px solid #e8ecf1;
      transition: background-color 0.2s ease;
    }

    #top-selling li:hover {
      background-color: #f8f9ff;
    }

    #top-selling li:last-child {
      border-bottom: none;
    }

    #book-form {
      max-width: 100%;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    label {
      font-weight: 600;
      color: #333;
      font-size: 0.95rem;
    }

    input {
      padding: 12px 15px;
      border: 2px solid #e8ecf1;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    input:focus {
      outline: none;
      border-color: #35424a;
      box-shadow: 0 0 0 3px rgba(53, 66, 74, 0.06);
    }

    button {
      padding: 12px 24px;
      background-color: #35424a;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 4px 12px rgba(53, 66, 74, 0.18);
    }

    button:hover {
      transform: translateY(-2px);
      background-color: #3e789c;
      box-shadow: 0 6px 16px rgba(53, 66, 74, 0.22);
    }

    button:active {
      transform: translateY(0);
    }

    #book-list ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    #book-list li {
      padding: 15px;
      border-bottom: 1px solid #e8ecf1;
    }

    #book-list li:last-child {
      border-bottom: none;
    }

    footer {
      background-color: #35424a;
      color: #ffffff;
      padding: 40px 20px;
      margin-top: auto;
      box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
    }

    footer p {
      margin: 8px 0;
    }

    .contact-info {
      text-align: right;
    }

    .hours-of-operation {
      text-align: left;
    }

    #footer-content {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      gap: 60px;
      max-width: 100%;
      margin: 0 auto 30px;
      padding: 0 20px;
    }

    #footer-content>div {
      flex: 1;
      min-width: 200px;
    }

    #footer-content h3 {
      margin: 0 0 15px 0;
      font-size: 1.1rem;
      font-weight: 600;
    }

    #footer-content p {
      margin: 8px 0;
      font-size: 0.95rem;
      opacity: 0.9;
    }

    footer>p {
      text-align: center;
      margin: 0;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      opacity: 0.8;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      header h1 {
        font-size: 1.8rem;
      }

      main {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 20px;
      }

      main>aside {
        position: static;
      }

      h2 {
        font-size: 1.3rem;
      }

      #footer-content {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }

    @media (max-width: 480px) {
      header {
        padding: 20px 15px;
      }

      header h1 {
        font-size: 1.5rem;
      }

      main {
        padding: 15px;
        gap: 15px;
      }

      section,
      aside {
        padding: 15px;
      }

      h2 {
        font-size: 1.1rem;
      }

      label {
        font-size: 0.9rem;
      }

      input,
      button {
        padding: 10px 12px;
        font-size: 0.95rem;
      }
    }
  </style>
</head>

<body>
  <header>
    <h1>Manage Your Book Collection</h1>
  </header>
  <main>
    <aside id="top-selling">
      <h2>Top Selling Books</h2>
      <ul>
        <li><strong>The Great Gatsby</strong> by F. Scott Fitzgerald</li>
        <li><strong>To Kill a Mockingbird</strong> by Harper Lee</li>
        <li><strong>1984</strong> by George Orwell</li>
        <li><strong>Pride and Prejudice</strong> by Jane Austen</li>
        <li><strong>The Catcher in the Rye</strong> by J.D. Salinger</li>
      </ul>
    </aside>
    <article>
      <section id="introduction">
        <h2>Welcome to In-N-Out Books</h2>
        <p>Welcome to your personal book collection manager! Whether you're an avid reader, a casual book enthusiast, or
          building a library for your organization, our platform helps you organize, track, and celebrate your literary
          collection. Add new books, browse your collection, and discover your next great read.</p>
      </section>
      <section id="book-form">
        <h2>Add a New Book</h2>
        <form>
          <label for="title">Title:</label>
          <input type="text" id="title" name="title" required>
          <label for="author">Author:</label>
          <input type="text" id="author" name="author" required>
          <label for="genre">Genre:</label>
          <input type="text" id="genre" name="genre" required>
          <button type="submit">Add Book</button>
        </form>
      </section>
      <section id="book-list">
        <h2>Your Books</h2>
        <ul>
          <!-- Book items will be dynamically added here -->
        </ul>
      </section>
    </article>
  </main>
  <footer>
    <div id="footer-content">
      <div class="hours-of-operation">
        <h3>Hours of Operation</h3>
        <p><strong>Mon - Fri:</strong> 9:00 AM - 8:00 PM</p>
        <p><strong>Sat:</strong> 10:00 AM - 6:00 PM</p>
        <p><strong>Sun:</strong> 12:00 PM - 5:00 PM</p>
      </div>
      <div class="contact-info">
        <h3>Contact Information</h3>
        <p><strong>Email:</strong> info@innoutbooks.com</p>
        <p><strong>Phone:</strong> (555) 123-4567</p>
        <p><strong>Address:</strong> 123 Book Street, Library City, BC 12345</p>
      </div>
    </div>
    <p>&copy; 2026 Book Collection Manager</p>
  </footer>
  <script src="script.js"></script>
</body>

</html>
  `;
  res.send(html);
});

app.get("/api/books", async (req, res, next) => {
  try {
    const allBooks = await books.find();
    console.log("All Books: ", allBooks);
    res.send(allBooks);
  } catch (err) {
    console.error("Error: ", err.message);
    next(err);
  }
});

app.get("/api/books/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return next(createError(400, "Id must be a number"));
    }
    const book = await books.findOne({ id: id });
    console.log("Book: ", book);
    res.send(book);
  } catch (err) {
    console.error("Error: ", err.message);
    next(err);
  }
});

app.post("/api/books", async (req, res, next) => {
  try {
    const newBook = req.body;

    const expectedKeys = ["id", "title", "author"];
    const receivedKeys = Object.keys(newBook);

    if (
      !receivedKeys.every((key) => expectedKeys.includes(key)) ||
      receivedKeys.length !== expectedKeys.length
    ) {
      console.log("Bad Request: Missing keys or extra keys", receivedKeys);
      return next(createError(400, "Bad Request"));
    }

    const result = await books.insertOne(newBook);
    console.log("Result:", result);
    res.status(201).send({ id: result.ops[0].id });
  } catch (err) {
    console.error("Error:", err.message);
    next(err);
  }
});

app.delete("/api/books/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await books.deleteOne({ id: parseInt(id) });
    console.log("Result:", result);
    res.status(204).send();
  } catch (err) {
    if (err.message === "No matching item found") {
      return next(createError(404, "Book not found"));
    }
    console.error("Error:", err.message);
    err.next();
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    type: "error",
    status: err.status,
    message: err.message,
    stack: req.app.get("env") === "development" ? err.stack : undefined,
  });
});

module.exports = app;
