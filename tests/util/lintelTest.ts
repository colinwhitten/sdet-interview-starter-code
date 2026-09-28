import { Page } from 'playwright';
import { expect } from '@playwright/test';
import { locators } from './locators';

type Role = Parameters<Page['getByRole']>[0];

export class LintelTest {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    // Actions

    async openApp() {
        await this.page.goto("/");
    }

    async click(locator: Record<string, string>) {
        await this.page.getByRole(locator.role as Role, { name: locator.name }).click();
    }
    

    async fill(locator: Record<string, string>, value: string) {
        await this.page.getByRole(locator.role as Role, { name: locator.name }).fill(value);
    }

    async press(locator: Record<string, string>, key: string){
        await this.page.getByRole(locator.role as Role, { name: locator.name }).press(key);
    }

    async isVisible(locator: Record<string, string>){
        await expect(this.page.getByRole(locator.role as Role, { name: locator.name })).toBeVisible();
    }

    async textIsVisible(text: string){
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async elementIsVisible(locator: Record<string, string>){
        await expect(this.page.getByRole(locator.role as Role, { name: locator.name })).toBeVisible();
    }

    async textToEqual(locator: Record<string, string>, expectedText: string) {
        const element = this.page.getByRole(locator.role as Role, { name: locator.name });
        await expect(element).toHaveText(expectedText);
    }

    async createBoxWithParameters(firstCorner: string, otherCorner: string, height: string) {
        await this.fill(locators.commandTextbox, 'box');
        await this.press(locators.commandTextbox, 'Enter');
        await this.fill(locators.firstCornerOfBaseTextbox, firstCorner);
        await this.press(locators.firstCornerOfBaseTextbox, 'Enter');
        await this.fill(locators.otherCornerOfBaseTextbox, otherCorner);
        await this.press(locators.otherCornerOfBaseTextbox, 'Enter');
        await this.fill(locators.heightTextbox, height);
        await this.press(locators.heightTextbox, 'Enter');
    }

    async createRectangleWithParameters(firstCorner: string, otherCorner: string) {
        await this.click(locators.rectangleButton);
        await this.fill(locators.firstCornerOfRectangleTextbox, firstCorner);
        await this.press(locators.firstCornerOfRectangleTextbox, 'Enter');
        await this.fill(locators.otherCornerOfRectangleTextbox, otherCorner);
        await this.press(locators.otherCornerOfRectangleTextbox, 'Enter');
        
    }

    async extrudeWithHeight(height: string) {
        await this.click(locators.extrudeButton);
        await this.click(locators.polylineObjectButton); // Select the polyline object to extrude (relies on there being only one polyline object in the scene)
        await this.press(locators.objectsToExtrudeTextbox, 'Enter');
        await this.fill(locators.extrusionDistanceTextbox, height);
        await this.press(locators.extrusionDistanceTextbox, 'Enter');
    }

    async makeLayerCurrent(layerName: string) {
        await this.page.getByRole('button', { name: `Make ${layerName} current` }).click();
    }

    async hideLayer(layerName: string) {
        await this.page.getByRole('button', { name: `Hide ${layerName}` }).click();
    }

    async showLayer(layerName: string) {
        await this.page.getByRole('button', { name: `Show ${layerName}` }).click();
    }

    async lockLayer(layerName: string) {
        await this.click(locators.lockLayerButton(layerName));
    }

    async unlockLayer(layerName: string) {
        await this.click(locators.unlockLayerButton(layerName));
    }

    async deleteLayer(layerName: string) {
        await this.page.getByRole('button', { name: `Delete ${layerName}` }).click();
    }

    async changeLayerColor(color: string) {
        await this.click(locators.layerDefaultColor);
        await this.page.getByRole('img', { name: color }).click();
    }    

    async viewportScreenshot(name: string) {
        await expect(this.page.getByRole('img', { name: 'Viewport' })).toHaveScreenshot(name);
    }


}