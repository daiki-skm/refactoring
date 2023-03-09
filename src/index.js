const path = require("path");
const fsPromises = require("fs/promises");

const filePath = path.resolve(__dirname, "./json/invoices.json");

const main = async () => {
  try {
    const data = await fsPromises.readFile(filePath);
    const invoices = JSON.parse(data);
    console.log(invoices);
  } catch (err) {
    console.log(err);
  }
};

main();
