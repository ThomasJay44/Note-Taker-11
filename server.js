const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./utils/uuid");
const dbData = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(dbData);
});

app.post("/api/notes", (req, res) => {
  const newNote = { title: req.body.title, text: req.body.text, id: uuid() };
  dbData.push(newNote);

  fs.writeFile("./db/db.json", JSON.stringify(dbData, null, "\t"), (err) =>
    err
      ? console.log(err)
      : console.log("Successfully updated Database boo ya via azime")
  );
  res.json(dbData);
});

app.delete('/api/notes/:id', (req,res) => {

    for (let i=0; i < dbData.length; i++) {
        if (dbData[i].id == req.params.id) {
            dbData.splice(i, 1)
        }
    }

    fs.writeFile("./db/db.json", JSON.stringify(dbData, null, "\t"), (err) =>
    err
      ? console.log(err)
      : console.log("Successfully updated Database boo ya via azime")
  );
  res.json(dbData);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
