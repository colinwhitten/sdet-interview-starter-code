import { expect, test } from "@playwright/test";
import { LintelTest } from "./util/lintelTest";
import { locators } from "./util/locators";

test("Creates a small box", async ({ page }) => {
  let lintelTest: LintelTest;
  lintelTest = new LintelTest(page);
  
  await lintelTest.openApp();
  
  // Creates a box with the specified parameters and verifies that it was created successfully
  await lintelTest.createBoxWithParameters('1,2', '5,5', '5');
  await lintelTest.textIsVisible('Created 1 Solid');
  await lintelTest.viewportScreenshot('createdSolid.png');

  // Validates that the zoom extents button works correctly by taking a screenshot after clicking it
  await lintelTest.click(locators.zoomExtentsButton);
  await lintelTest.viewportScreenshot('zoomedExtent.png');

});