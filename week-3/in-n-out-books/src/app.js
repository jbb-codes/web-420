// Name: Jarren Bess
// Date: Jan 30, 2026
// File name: app.js
// Description: In-N-Out-Books is an app that lets user manage their book collection

const express = require("express");
const createError = require("http-errors");

const app = express();

app.get("/", async (req, res, next) => {
  // Landing page created with GitHub Copilot
  const html = `
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Book Collection Manager</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    header {
      background: #35424a;
      color: #ffffff;
      padding: 10px 0;
      text-align: center;
    }

    main {
      padding: 20px;
      flex: 1 0 auto;
    }

    #book-form {
      background: #ffffff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      max-width: 480px;
      margin: 0 auto;
    }

    form {
      display: flex;
      flex-direction: column;
    }

    label {
      margin: 10px 0 5px;
    }

    input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 100%;
      box-sizing: border-box;
    }

    /* make main content slightly constrained on wide screens */
    main>section {
      max-width: 960px;
      margin: 0 auto;
    }

    button {
      margin-top: 10px;
      padding: 10px;
      background-color: #35424a;
      color: #ffffff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background-color: #4e99c7;
    }

    #book-list {
      margin-top: 20px;
    }

    footer {
      text-align: center;
      padding: 10px 0;
      background: #35424a;
      color: #ffffff;
    }
  </style>
</head>

<body>
  <header>
    <h1>Manage Your Book Collection</h1>
  </header>
  <main>
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
  </main>
  <footer>
    <p>&copy; 2026 Book Collection Manager</p>
  </footer>
  <script src="script.js"></script>
</body>

</html>
  `;
  res.send(html);
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
