import express from "express";
// const express = require("express");
import sql from "./db.js";
import cors from "cors"

const app = express();

const data = [
    {"id": "1",
    "task": "Take a bath",
    "is_completed":true
    },
    {"id": "2",
    "task": "Eatttttt",
    "is_completed":false
    },
    {"id": "3",
    "task": "Eas some more",
    "is_completed":false
    },
    {"id": "4",
    "task": "Rest",
    "is_completed":true
    }
]

app.get("/", (req, res) => {
    res.send("Hello")
})

app.use(
    cors({
      origin: ["http://localhost:5173"],
    })
  );

app.use(express.json())

app.get("/api/todos", async (req, res) => {
    const todos = await sql`SELECT * FROM todos`
    console.log(todos)
    if (todos){
        res.status(200).send(todos)
    } else {
        res.status(404).send("Errorrrrrrr. Leave the planet")       
    }
})

app.post("/api/todos2", async (req, res) => {
    const { task, is_completed } = req.body
    const todos2 = await sql `INSERT INTO todos (task, is_completed) VALUES (${task}, ${is_completed}) RETURNING *`
    console.log(todos2)
    if (todos2){
        res.status(201).send("Successfully inserted, You can return to earth :)")
    } else {
        res.status(404).send("Error 404")
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});