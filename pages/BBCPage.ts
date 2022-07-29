import {Page} from "@playwright/test";
import {CONSTANTS} from "../constants/constants";

export class BBCPage{
    private page: Page
    constructor(page: Page){
        this.page = page;
    };

    async visitWeb(url:string){
        await this.page.goto((url), {timeout:CONSTANTS.timeout});
    }

    async findElementAndClick(locator: string){
        await this.page.locator(locator).click();
    };

    async findElement(locator: string) {
        await this.page.locator(locator);
    };

    async typeText(selector: string, text:string){
        await this.page.type(selector, text)
    };

    async pressEnter(){
        await this.page.keyboard.press("Enter")
    };

    async getText(locator){
        return this.page.innerText((locator), {timeout:CONSTANTS.timeout});
    };
}