import { expect, test } from "@playwright/test";
import { LintelTest } from "./util/lintelTest";
import { locators } from "./util/locators";

test("Layer locking and visibility control object selection", async ({ page }) => {
  const lintelTest = new LintelTest(page);

  await lintelTest.openApp();
  // Creates a box on one layer and a planar surface on another layer
  await lintelTest.click(locators.newLayerButton);
  await lintelTest.fill(locators.layerNameTextbox, "Box Layer");
  await lintelTest.press(locators.layerNameTextbox, "Enter");
  await lintelTest.makeLayerCurrent("Box Layer");
  await lintelTest.createBoxWithParameters("1,2", "5,5", "10");

  // Creates a second layer and adds a planar surface to it
  await lintelTest.click(locators.newLayerButton);
  await lintelTest.fill(locators.layerNameTextbox, "Surface Layer");
  await lintelTest.press(locators.layerNameTextbox, "Enter");
  await lintelTest.makeLayerCurrent("Surface Layer");
  await lintelTest.createRectangleWithParameters("0,0", "10,10");
  await lintelTest.click(locators.polylineObjectButton);
  await lintelTest.click(locators.planarSurfaceButton);

  // Verifies that the box object is disabled when the layer is locked or hidden, and enabled when the layer is unlocked or shown
  const boxLayer = page.getByRole("region", { name: "Box Layer" });
  const solidObject = { name: /^Select Solid obj-/ };
  const boxObject = boxLayer.getByRole("button", solidObject);
  
  // Lock the Box Layer and verify that the box object is disabled
  await lintelTest.lockLayer("Box Layer");
  await expect(boxObject).toBeDisabled();
  // Unlock the Box Layer and verify that the box object is enabled
  await lintelTest.unlockLayer("Box Layer");
  await expect(boxObject).toBeEnabled();
  // Hide the Box Layer and verify that the box object is disabled
  await lintelTest.hideLayer("Box Layer");
  await expect(boxObject).toBeDisabled();
  // Show the Box Layer and verify that the box object is enabled
  await lintelTest.showLayer("Box Layer");
  await expect(boxObject).toBeEnabled();
});