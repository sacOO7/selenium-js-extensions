# Selenium-js-extensions
- Contains JS bindings to mitigate flaky tests behaviour.
- Explicit waits, timeouts and native js code to ensure stable user interactions.

## Installation

- Using NPM
```shell script 
  npm install selenium-extensions --save  
```

- Using yarn
```shell script
  yarn add selenium-extensions --save
```

## Usage
- Import library, start using extensions as a part of original selenium implementation. 

```javascript
  import 'selenium-extensions';
```

or ES5

```javascript
   require('selenium-extensions');
```

-  Update **types** section in **tsconfig.json**

```editorconfig
  "compilerOptions": {
        "types": ["selenium-extensions"]
    }
```
- Once imported, following methods can be used on native selenium **WebDriver** and **WebElement** classes.

1. WebDriver -  
- **findElementSafe(locator, timeout)** - Locate element from the dom, passing selenium locator object, returns WebElementPromise 
- **findElementsSafe(locator, timeout)** - Locate elements from the dom, passing selenium locator object, returns Promise<WebElements[]>

2. WebElement - 
- **findElementSafe(locator, timeout)** - Locate element inside container element, passing selenium locator object, returns WebElementPromise
- **findElementsSafe(locator, timeout)** - Locate elements inside container element, passing selenium locator object, returns Promise<WebElements[]>
- **clickSafe(timeout)** - Clicks on the element on the DOM (Waits until it's visible and displayed on the DOM) 
- **clickForced(timeout)** - Force Clicks on the visible element (Doesn't matter if element is behind other element)
- **getTextSafe(timeout)** - Gets text from the visible input (Waits until it's visible and displayed on the DOM)
- **sendKeysSafe(args)** - Type text into input element
- **sendKeysForced(args)** - Type text into input using Javascript

## Notes
* Default timeout is 20000 ms.
* Methods with a timeout, waits for the element to be available on the DOM.
* Methods with action (click event or sending data) and timeout, waits for the element to be available and visible on the DOM.
* Methods with **force** postfix should be preferred, only if **safe** counterparts are flaky. (force executes inline JS code inside DOM to manipulate behaviour).

