import { assertEquals } from "std/testing/asserts.ts";
import { Province, sampleProvinceData } from "./province.ts";

Deno.test("province shortfall", () => {
  const asia = new Province(sampleProvinceData());
  assertEquals(asia.shortfall, 5);
});

Deno.test("province profit", () => {
  const asia = new Province(sampleProvinceData());
  assertEquals(asia.profit, 230);
});

Deno.test("province change production", () => {
  const asia = new Province(sampleProvinceData());
  asia.producers[0].production = 20;
  assertEquals(asia.shortfall, -6);
  assertEquals(asia.profit, 292);
});
