import { expect, test } from "@playwright/test";
import { LintelTest } from "./util/lintelTest";
import { locators } from "./util/locators";

test("Viewer", async ({ page }) => {
  let lintelTest: LintelTest;
  lintelTest = new LintelTest(page);
  
  await lintelTest.openApp();

  // Verify that the Lintel application is open and the main elements are visible
  await lintelTest.isVisible(locators.lintelHeading);
  await lintelTest.isVisible(locators.toolsToolbar);
  await lintelTest.isVisible(locators.commandPromptRegion);
  await lintelTest.isVisible(locators.commandTextbox);

  await lintelTest.createBoxWithParameters('-3,-3', '6,6', '10');

  await lintelTest.click(locators.topView);
  await lintelTest.viewportScreenshot('topView.png');
  await lintelTest.click(locators.frontView);
  await lintelTest.viewportScreenshot('frontView.png');
  await lintelTest.click(locators.rightView);
  await lintelTest.viewportScreenshot('rightView.png');
  await lintelTest.click(locators.perspectiveView);
  await lintelTest.viewportScreenshot('perspectiveView.png');
  await lintelTest.click(locators.wireframeView);
  await lintelTest.viewportScreenshot('wireframeView.png');
  await lintelTest.click(locators.shadedView);
  await lintelTest.viewportScreenshot('shadedView.png');

});