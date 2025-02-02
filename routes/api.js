var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// localhost:4000/api
router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// localhost:4000/api/todos
/* router.get("/todos", (req, res) => {
  // Send back the full list of items
  db("SELECT * FROM items ORDER BY id ASC;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
}); */

// ASYNC AWAIT
router.get("/todos", async (req, res) => {
  // Send back the full list of items
  try {
    const result = await db("SELECT * FROM items ORDER BY id ASC;");
    res.send(result.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/todos", async (req, res) => {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of items

  const { text } = req.body;

  if (!text) {
    res.status(400).send({ error: "Text is required" });
    return;
  }
  try {
    // insert the data
    // INSERT INTO items (text, complete) VALUES ("cook", 0);
    await db(`INSERT INTO items (text, complete) VALUES ("${text}", 0);`);

    // get the data
    const result = await db("SELECT * FROM items ORDER BY id ASC;");
    res.send(result.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// localhost:4000/api/todos/5 | if you see a colon in the URL, it means it's a URL parameter
router.put("/todos/:todo_id", async (req, res) => {
  // URL params are available in req.params
  console.log("REQ.PARAMS", req.params);
  const { todo_id } = req.params;
  try {
    await db(`UPDATE items SET complete= NOT complete WHERE id=${todo_id};`);

    const result = await db("SELECT * FROM items ORDER BY id ASC;");
    res.send(result.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/todos/:todo_id", async (req, res) => {
  // URL params are available in req.params
  const { todo_id } = req.params;
  try {
    await db(`DELETE FROM items WHERE id=${todo_id};`);

    const result = await db("SELECT * FROM items ORDER BY id ASC;");
    res.send(result.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
