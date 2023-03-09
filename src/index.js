import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { readFile } from "fs/promises";
import { statement } from "./printing.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = resolve(__dirname, "./json");
const jsonFile = ["invoices.json", "plays.json"];

const main = async () => {
  try {
    const promises = jsonFile.map((file) => {
      return readFile(`${filePath}/${file}`);
    });
    const res = await Promise.all(promises);
    const [invoices, plays] = res.map((json) => {
      return JSON.parse(json);
    });
    const result = statement(invoices[0], plays);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

main();
