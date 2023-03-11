import { statement } from "./printing";
import invoices from "./json/invoices.json" assert { type: "json" };
import plays from "./json/plays.json" assert { type: "json" };

const main = () => {
  try {
    const result = statement(invoices[0], plays);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

main();
