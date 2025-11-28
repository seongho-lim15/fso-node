const express = require("express");

type NoteType = {
  id: string;
  content: string;
  important: boolean;
};

type PhonebookType = {
  id: string;
  name: string;
  number: string;
};

const phoneBooks: PhonebookType[] = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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

/**
 * 최대 ID 생성
 */
const generateId: (array: any[]) => string = (array: any[]) => {
  const MaxId =
    array.length > 0 ? Math.max(...array.map((note) => Number(note.id))) : 0;

  return String(MaxId + 1);
};

const app = express();
app.use(express.json());

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
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const note: NoteType = {
    id: generateId(notes),
    content: body.content,
    important: body.important || false,
  };

  notes.push(note);
  res.json(note);
});

app.get("/api/persons", (req, res) => {
  res.json(phoneBooks);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
