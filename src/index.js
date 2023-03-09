const path = require("path");
const fsPromises = require("fs/promises");

const filePath = path.resolve(__dirname, "./json");
const jsonFile = ["invoices.json", "plays.json"];

const main = async () => {
  try {
    const promises = jsonFile.map((file) => {
      return fsPromises.readFile(`${filePath}/${file}`);
    });
    const tmp = await Promise.all(promises);
    for (const json of tmp) {
      console.log(JSON.parse(json));
    }
  } catch (err) {
    console.log(err);
  }
};

main();
