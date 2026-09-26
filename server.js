const express = require("express");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("."));

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});


// ===============================
// AI TUTOR
// ===============================

app.post("/api/tutor", async (req, res) => {

    const { question, language } = req.body;

    if (!question) {
        return res.status(400).json({
            error: "Please enter a question."
        });
    }

    try {

        const prompt = `
You are MasterLearn AI, a friendly educational tutor.

Answer the student's question in ${language}.

Rules:
- Explain in simple words.
- Give examples when useful.
- Use step-by-step explanation when useful.
- Keep the answer student-friendly.
- Be accurate and clear.
- Do not be unnecessarily complicated.

Student question:
${question}
`;

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.5
        });

        const answer =
            completion.choices[0]?.message?.content ||
            "Sorry, I could not generate an answer.";

        res.json({
            answer: answer
        });

    } catch (error) {

        console.error("GROQ ERROR:", error);

        res.status(500).json({
            error: error.message || String(error)
        });
    }
});


// ===============================
// TRANSLATION
// ===============================

app.post("/api/translate", async (req, res) => {

    const { text, language } = req.body;

    if (!text) {
        return res.status(400).json({
            error: "Please enter text."
        });
    }

    try {

        const prompt = `
Translate the following text into ${language}.

Rules:
- Keep the meaning exactly the same.
- Use natural, simple language.
- Do not add extra information.

Text:
${text}
`;

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.3
        });

        const translated =
            completion.choices[0]?.message?.content ||
            "Translation failed.";

        res.json({
            translation: translated
        });

    } catch (error) {

        console.error("TRANSLATE ERROR:", error);

        res.status(500).json({
            error: error.message || String(error)
        });
    }
});


// ===============================
// NOTES SUMMARIZER
// ===============================

app.post("/api/summarize", async (req, res) => {

    const { text, language } = req.body;

    if (!text) {
        return res.status(400).json({
            error: "Please enter some notes."
        });
    }

    try {

        const prompt = `
You are MasterLearn AI, a friendly educational tutor.

Summarize the following notes in ${language}.

Rules:
- Keep the important points.
- Remove unnecessary details.
- Use simple student-friendly language.
- Use bullet points when useful.
- Do not add information that is not in the notes.
- Make the summary shorter than the original.

Notes:
${text}
`;

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.3
        });

        const summary =
            completion.choices[0]?.message?.content ||
            "Summary failed.";

        res.json({
            summary: summary
        });

    } catch (error) {

        console.error("SUMMARY ERROR:", error);

        res.status(500).json({
            error: error.message || String(error)
        });
    }
});


// ===============================
// AI QUIZ
// ===============================

app.post("/api/quiz", async (req, res) => {

    const { topic, language } = req.body;

    if (!topic) {
        return res.status(400).json({
            error: "Please enter a topic."
        });
    }

    try {

        const prompt = `
You are MasterLearn AI, an educational quiz generator.

Create a short quiz about:

${topic}

Language:
${language}

Rules:
- Create exactly 5 questions.
- Each question must have 4 options.
- Give exactly one correct answer.
- Keep questions simple and student-friendly.
- Cover different aspects of the topic.
- Do not add unrelated information.
- Clearly show the correct answer.

Use this format:

1. Question
A) Option
B) Option
C) Option
D) Option
Answer: A

2. Question
A) Option
B) Option
C) Option
D) Option
Answer: B

3. Question
A) Option
B) Option
C) Option
D) Option
Answer: C

4. Question
A) Option
B) Option
C) Option
D) Option
Answer: D

5. Question
A) Option
B) Option
C) Option
D) Option
Answer: A
`;

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.5
        });

        const quiz =
            completion.choices[0]?.message?.content ||
            "Quiz generation failed.";

        res.json({
            quiz: quiz
        });

    } catch (error) {

        console.error("QUIZ ERROR:", error);

        res.status(500).json({
            error: error.message || String(error)
        });
    }
});


// ===============================
// START SERVER
// ===============================

const server=app.listen(process.env.PORT || 3000,"0.0.0.0",()=>{

    console.log("=================================");
    console.log("MASTERLEARN AI RUNNING");
    console.log("http://127.0.0.1:3000");
    console.log("=================================");

});

server.on("error", (error) => {
    console.error("SERVER ERROR:", error);
});

process.stdin.resume();
