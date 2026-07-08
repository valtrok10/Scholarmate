const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {

    try {

        if (!req.body.messages) {
            return res.status(400).json({
                error: "Missing messages."
            });
        }

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization:
                        `Bearer ${process.env.OPENROUTER_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer":
                        "http://localhost:5500",
                    "X-Title":
                        "ScholarMate"
                },
                body: JSON.stringify(req.body)
            }
        );

        if (!response.ok) {

            const error = await response.text();

            console.log(error);

            return res.status(response.status).json({
                error
            });

        }

        const data = await response.json();

        res.json(data);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`ScholarMate Server running on ${PORT}`)
);