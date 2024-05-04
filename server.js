import express from "express";
import { countStudents, getFirstStudent } from "./services.js";
import { getCatFacts } from "./api-data.js";

const app = express();

app.get("/count-students", (req, res) => {
  const count = countStudents();
  res.status(200).send(count.toString());
});

app.get("/first-student", (req, res) => {
  const data = getFirstStudent();
  if (data) res.status(200).json(data);
  else res.sendStatus(404);
});

app.get("/facts", async (req, res) => {
  try {
    const facts = await getCatFacts();
    res.status(200).json(facts);
  } catch {
    console.error("Could not get facts");
    res.sendStatus(500);
  }
});

app.listen(3000);

export default app;
