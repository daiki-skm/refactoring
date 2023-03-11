import { statement } from "./printing.ts";

if (import.meta.main) {
  const invoices = await Deno.readTextFile("./json/invoices.json");
  const invoice = JSON.parse(invoices);
  const plays = await Deno.readTextFile("./json/plays.json");
  const play = JSON.parse(plays);
  const result = statement(invoice, play);
  console.log(result);
}
