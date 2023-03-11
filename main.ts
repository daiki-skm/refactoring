import { statement } from "./printing.ts";

if (import.meta.main) {
  const invoiceJson = await Deno.readTextFile("./json/invoice.json");
  const invoice = JSON.parse(invoiceJson);
  const playsJson = await Deno.readTextFile("./json/plays.json");
  const plays = JSON.parse(playsJson);
  const result = statement(invoice, plays);
  console.log(result);
}
