import {
    Locator,
    until,
    WebDriver,
    WebElement,
    WebElementPromise,
} from 'selenium-webdriver';

declare module 'selenium-webdriver' {

    interface WebDriver {
        findElementSafe : (this: WebDriver, locator: Locator, timeout?: number) => WebElementPromise;
        findElementsSafe : (this: WebDriver, locator: Locator, timeout?: number) => Promise<WebElement[]>;
    }

    interface WebElement {
        clickSafe: (this: WebElement, timeout?: number) => Promise<void>;
        findElementSafe : (this: WebElement, locator: Locator, timeout?: number) => WebElementPromise;
        findElementsSafe : (this: WebElement, locator: Locator, timeout?: number) => Promise<WebElement[]>;
        clickForced: (this: WebElement, timeout?: number) => Promise<any>;
        getTextSafe: (this: WebElement, timeout?: number) => Promise<string>;
        sendKeysSafe: (this: WebElement, ...var_args: Array<number | string | Promise<string | number>>) => Promise<void>;
        sendKeysForced: (this: WebElement, ...var_args: Array<number | string | Promise<string | number>>) => Promise<void>;
    }
}

function findElementSafeWebDiver(this: WebDriver, locator: Locator, timeout = 20000): WebElementPromise {
    return this.wait(until.elementLocated(locator), timeout);
}

function findElementsSafeWebDiver(this: WebDriver, locator: Locator, timeout = 20000): Promise<WebElement[]> {
    return this.wait(until.elementsLocated(locator), timeout);
}

function clickElementSafe(this: WebElement, timeout = 20000): Promise<void> {
    return this.getDriver().wait(until.elementIsVisible(this), timeout)
        .then((_) => this.getDriver().wait(until.elementIsEnabled(this), timeout))
        .then((_) => this.getDriver().wait(elementIsClickableCondition(this), timeout))
        .then((_) => this.click());
}

function sendKeysSafe(this: WebElement, ...var_args: Array<number | string | Promise<string | number>>): Promise<void> {
    const timeout = 20000;
    return this.getDriver().wait(until.elementIsVisible(this), timeout)
        .then((_) => this.getDriver().wait(until.elementIsEnabled(this), timeout))
        .then((_) => this.getDriver().wait(elementIsClickableCondition(this), timeout))
        .then((_) => scrollIntoView(this) && this.sendKeys(...var_args));
}

function clickElementForced(this: WebElement, timeout = 20000): Promise<any> {
    return this.getDriver().wait(until.elementIsVisible(this), timeout)
        .then((_) => clickForced(this));
}

function findElementSafeWebElement(this: WebElement, locator: Locator, timeout = 20000): WebElementPromise {
    return <WebElementPromise>this.getDriver().wait(until.elementIsVisible(this), timeout)
        .then((ele) => ele.findElement(locator));
}

function findElementsSafeWebElement(this: WebElement, locator: Locator, timeout = 20000): Promise<WebElement[]> {
    return this.getDriver().wait(until.elementIsVisible(this), timeout)
        .then((ele) => ele.findElements(locator));
}

function getTextSafeSafeWebElement(this: WebElement, timeout = 20000): Promise<string> {
    return this.getDriver().wait(until.elementIsVisible(this), timeout)
        .then(() => this.getText());
}

WebDriver.prototype.findElementSafe = findElementSafeWebDiver;

WebDriver.prototype.findElementsSafe = findElementsSafeWebDiver;

WebElement.prototype.clickSafe = clickElementSafe;

WebElement.prototype.findElementSafe = findElementSafeWebElement;

WebElement.prototype.findElementsSafe = findElementsSafeWebElement;

WebElement.prototype.clickForced = clickElementForced;

WebElement.prototype.getTextSafe = getTextSafeSafeWebElement;

WebElement.prototype.sendKeysSafe = sendKeysSafe;

WebElement.prototype.sendKeysForced = sendKeysForced;

function isElementClickable(element: WebElement) {
    const SCRIPT = `
    const element = arguments[0];

    // is element visible by styles
    const styles = window.getComputedStyle(element);
    if (styles.visibility === 'hidden' || styles.display === 'none') {
        return false;
    }

    // is the element behind another element
    const boundingRect = element.getBoundingClientRect();

    // adjust coordinates to get more accurate results
    const left = boundingRect.left + 2;
    const right = boundingRect.right - 2;
    const top = boundingRect.top + 2;
    const bottom = boundingRect.bottom - 2;

    if (document.elementFromPoint(left, top) !== element ||
        document.elementFromPoint(right, top) !== element ||
        document.elementFromPoint(left, bottom) !== element ||
        document.elementFromPoint(right, bottom) !== element) {
        return false;
    }
    element.focus();
    return true;
    `;
    return element.getDriver().executeScript(SCRIPT, element);
}


async function elementIsClickableCondition(element: WebElement): Promise<boolean> {
    try {
        if (!(await element.isDisplayed())) {
            return false;
        }
        return !!(await isElementClickable(element));

    } catch (err) {
        throw err;
    }
}

async function clickForced(element: WebElement) {
    const SCRIPT = `
    const element = arguments[0];
    element.click();
    `;
    await element.getDriver().executeScript(SCRIPT, element);
}

async function sendKeysForced(this: WebElement, ...var_args: Array<number | string | Promise<string | number>>) {
    const SCRIPT = `
    const element = arguments[0];
    element.setAttribute('value','${var_args}');
    `;
    await this.getDriver().executeScript(SCRIPT, this);
}

function scrollIntoView(element: WebElement) {
    const SCRIPT = `
    arguments[0].scrollIntoView()
    `;
    return element.getDriver().executeScript(SCRIPT, element);
}

export { WebDriver, WebElement, WebElementPromise, Locator }
