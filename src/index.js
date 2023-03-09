const path = require("path");
const fsPromises = require("fs/promises");
const { statement } = require("./printing");

const filePath = path.resolve(__dirname, "./json");
const jsonFile = ["invoices.json", "plays.json"];

const main = async () => {
  try {
    const promises = jsonFile.map((file) => {
      return fsPromises.readFile(`${filePath}/${file}`);
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
