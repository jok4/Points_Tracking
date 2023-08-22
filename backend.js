import useGoogleSheets from "use-google-sheets";
import express, { json } from "express";
import cors from "cors";
import axios from "axios";
import { config } from "dotenv";
config();

const PORT = 8000

const app = express()

app.get("/", (req,res) => {
    res.json("hi")
})

app.get("/news", (req,res) => {
    const { data, loading, error } = useGoogleSheets ({
        apiKey: process.env.VITE_GOOGLE_API_KEY,
        sheetId: process.env.VITE_SHEET_ID,
        sheetsOptions: [{ id: "Form responses 1"}],
    });
    res.json(data)
})


app.listen(8000, () => console.log(`Server is running on port ${PORT}`))