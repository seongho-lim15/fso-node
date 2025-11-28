const express = require("express");

type NoteType = {
  id: string;
  content: string;
  important: boolean;
};

let notes: NoteType[] = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const app = express();

app.get("/", (req, res) => {
  res.end("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note: NoteType | undefined = notes.find((note) => note.id === id);
  if (!note) {
    res.status(404).end("Not Found");
  } else {
    res.json(note);
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  req.on("data", (chunk) => {
    console.log("chunk: ", chunk);
    const chunkString = chunk.toString();
    console.log("chunkString: ", chunkString);
    const chunkJson = JSON.parse(chunkString);
    console.log("chunkJson: ", chunkJson);
  });

  req.on("end", () => {
    res.status(200).end();
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
