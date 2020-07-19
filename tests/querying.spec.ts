import '../index'
import { Builder, By, ThenableWebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { cypressKitchenSinkUrls } from './config'

describe("Visit cypress kitchen sink", () => {

    jest.setTimeout(20000);
    let browser: ThenableWebDriver;

    beforeAll(async () => {
        const options = new chrome.Options();
        // options.headless();
        browser = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        await browser.manage().window().maximize();
    });

    afterAll(async () => {
        await browser.quit();
    });

    it('should put data in forms', async () => {
        await browser.get(cypressKitchenSinkUrls.querying);
    });
})

