const path = require("path");
const fsPromises = require("fs/promises");

const jsonFile = ["invoices.json", "plays.json"];
const filePath = path.resolve(__dirname, "./json/");

const main = async () => {
  try {
    const data = await fsPromises.readFile(filePath + jsonFile[0]);
    const invoices = JSON.parse(data);
    console.log(invoices);
  } catch (err) {
    console.log(err);
  }
};

main();
