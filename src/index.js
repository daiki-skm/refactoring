const path = require("path");
const fsPromises = require("fs/promises");

const filePath = path.resolve(__dirname, "./json");
const jsonFile = ["invoices.json", "plays.json"];

const main = async () => {
  try {
    const promises = jsonFile.map((file) => {
      return fsPromises.readFile(`${filePath}/${file}`);
    });
    const jsons = await Promise.all(promises);
    const data = jsons.map((json) => {
      return JSON.parse(json);
    });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

main();
