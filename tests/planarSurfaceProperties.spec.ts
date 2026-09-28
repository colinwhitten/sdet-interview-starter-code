import { expect, test } from "@playwright/test";
import { LintelTest } from "./util/lintelTest";
import { locators } from "./util/locators";

test("Planar Surface Properties", async ({ page }) => {
  const lintelTest = new LintelTest(page);

  await lintelTest.openApp();

  // Create a rectangle and convert it to a planar surface
  await lintelTest.createRectangleWithParameters("-8,-8", "9,9"); 
  await lintelTest.click(locators.polylineObjectButton);
  await lintelTest.click(locators.planarSurfaceButton);
  // Confirm that the planar surface was created successfully
  await lintelTest.textIsVisible("Created 1 Surface");

  // Verify the properties of the planar surface
  const panel = page.getByRole(locators.propertiesPanel.role, {
    name: locators.propertiesPanel.name,
  });
  await expect(panel.getByRole("heading", { name: "Properties" })).toBeVisible();
  await expect(panel.locator("dt")).toHaveText([
    "Type",
    "Object",
    "Layer",
    "Vertices",
    "Faces",
    "Center",
    "Size",
    "Area",
  ]);
  await expect(panel.locator("dd")).toHaveText([
    "Surface",
    "obj-2",
    "Default",
    "4",
    "1",
    "0.500, 0.500, 0.000",
    "17.000, 17.000, 0.000",
    "289.000 m²",
  ]);
});