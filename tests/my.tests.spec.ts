import {expect, test} from "@playwright/test";
import {BBCPage} from "../pages/BBCPage";
import {CONSTANTS} from "../constants/constants";
import {LOCATORS} from "../locators/locators";

test("Navigate to Google", async ({page}) => {
    const vstBBC = await new BBCPage(page);
    await vstBBC.visitWeb(CONSTANTS.bbcUrl)
    const urlCheck = page.url();
    expect(urlCheck).toContain("bbc");
});

test("Search for UkraineNews", async ({page}) => {
    await page.goto(CONSTANTS.bbcUrl);
    const bbcPage = new BBCPage(page);
    await bbcPage.findElementAndClick(LOCATORS.searchBtn);
    await bbcPage.typeText(LOCATORS.searchInput, "Ukraine");
    await bbcPage.pressEnter();
    const res = await bbcPage.getText(LOCATORS.article1);
    expect(res).toContain("Nuclear Gamble");
});

test.describe("Navigation tests",() => {
    test.beforeEach(async ({page}) => {
    const visit = new BBCPage(page);
    await visit.visitWeb(CONSTANTS.bbcUrl);
    await page.setViewportSize({width:1920, height:1080})
    });

    test.afterEach(async ({page}) => {
        console.log("Test Done");
        });
    test("SportNavigation test", async ({page}) => {
        const bbcPage = new BBCPage(page);
        await bbcPage.findElementAndClick(LOCATORS.sportBtn);
        await bbcPage.findElementAndClick(LOCATORS.article2);
        const res = await bbcPage.getText(LOCATORS.f1News);
        expect(res).toContain("Lewis Hamilton & Fernando Alonso");
    });

    test("ReelNavigation test", async ({page}) => {
        const bbcPage = new BBCPage(page);
        await bbcPage.findElementAndClick(LOCATORS.reelBtn);
        await bbcPage.findElementAndClick(LOCATORS.historyBtn);
        const res = await bbcPage.getText(LOCATORS.article3);
        expect(res).toContain("Broken Arrows");
    });

    test("SingInNavigation test", async ({page}) => {
        const bbcPage = new BBCPage(page);
        await bbcPage.findElementAndClick(LOCATORS.signInBtn);
        await bbcPage.findElementAndClick(LOCATORS.userNameInput);
        await bbcPage.typeText(LOCATORS.userNameInput, "Yauheni");
        await bbcPage.findElementAndClick(LOCATORS.passwordInput);
        await bbcPage.typeText(LOCATORS.passwordInput, "23041995");
        await bbcPage.findElementAndClick(LOCATORS.singBtn);
        const mes = await bbcPage.getText(LOCATORS.drpdwnMsg);
        expect(mes).toContain("Sorry");
        console.log('mesaage 1  =========  ', mes);

    });
})

