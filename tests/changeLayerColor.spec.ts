import { expect, test } from "@playwright/test";
import { LintelTest } from "./util/lintelTest";
import { locators } from "./util/locators";

test("Validates Layer Color Change", async ({ page }) => {
  let lintelTest: LintelTest;
  lintelTest = new LintelTest(page);
  
  await lintelTest.openApp();

  // Creates a box and changes the layer color to light green, then takes a screenshot of the viewport
  await lintelTest.createBoxWithParameters('-3,-3', '6,6', '10');
  await lintelTest.changeLayerColor('light green');
  await lintelTest.viewportScreenshot('greenBox.png');

});