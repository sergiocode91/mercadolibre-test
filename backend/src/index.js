import app from "./app";
import dotenv from "dotenv";
import _fecth from "node-fetch";

// dotenv
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

// fetch
if (!global.fetch) {
  global.fetch = _fecth;
}

// initialize connection
app.listen(process.env.PORT_SERVER, () => {
  console.log(`App listening on port ${process.env.PORT_SERVER}!`);
});

app.get("/", (req, res) => {
  res.send('Connected to the Mercado Libre API successfully!');
});