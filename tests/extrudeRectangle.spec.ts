import { expect, test } from "@playwright/test";
import { LintelTest } from "./util/lintelTest";

test("Extrude a Rectangle", async ({ page }) => {
  let lintelTest: LintelTest;
  lintelTest = new LintelTest(page);
  
  await lintelTest.openApp();

  // Creates a rectangular polyline and extrudes it to create a 3D solid, then takes a screenshot of the viewport
  await lintelTest.createRectangleWithParameters("-4,-4", "5,5");
  await lintelTest.textIsVisible('Created 1 closed Polyline');
  await lintelTest.extrudeWithHeight("5");
  await lintelTest.viewportScreenshot('extrudedRectangle.png');

});