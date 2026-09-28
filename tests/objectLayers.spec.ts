import { expect, test } from "@playwright/test";
import { LintelTest } from "./util/lintelTest";
import { locators } from "./util/locators";

test("Layers Functionalities", async ({ page }) => {
    let lintelTest: LintelTest;
    lintelTest = new LintelTest(page);
  
    await lintelTest.openApp();
  
    await lintelTest.click(locators.newLayerButton);
    await lintelTest.fill(locators.layerNameTextbox, 'Box Layer');
    await lintelTest.press(locators.layerNameTextbox, 'Enter');
    await lintelTest.makeLayerCurrent('Box Layer');
    await lintelTest.createBoxWithParameters('1,2', '5,5', '10');

    await lintelTest.click(locators.newLayerButton);
    await lintelTest.fill(locators.layerNameTextbox, 'Surface Layer');
    await lintelTest.press(locators.layerNameTextbox, 'Enter');
    await lintelTest.makeLayerCurrent('Surface Layer');
    await lintelTest.createRectangleWithParameters('0,0', '10,10');
    await lintelTest.click(locators.polylineObjectButton);
    await lintelTest.click(locators.planarSurfaceButton);

    // Check object membership in the layer groups shown by the Layers panel.
    const boxLayer = page.getByRole("region", { name: "Box Layer" });
    const surfaceLayer = page.getByRole("region", { name: "Surface Layer" });
    const solidObject = { name: /^Select Solid obj-/ };
    const surfaceObject = { name: /^Select Surface obj-/ };

    await expect(boxLayer.getByRole("button", solidObject)).toHaveCount(1);
    await expect(boxLayer.getByRole("button", surfaceObject)).toHaveCount(0);
    await expect(surfaceLayer.getByRole("button", solidObject)).toHaveCount(0);
    await expect(surfaceLayer.getByRole("button", surfaceObject)).toHaveCount(1);

    // Hide the Box Layer and verify that the box is not visible in the viewport.
    await lintelTest.hideLayer('Box Layer');
    await lintelTest.viewportScreenshot('boxLayerHidden.png');

    // Show the Box Layer and verify that the box is visible in the viewport.
    await lintelTest.showLayer('Box Layer');
    await lintelTest.viewportScreenshot('boxLayerShown.png');
});