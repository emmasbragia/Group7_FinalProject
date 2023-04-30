// import puppeteer
const puppeteer = require("puppeteer");

async function go() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 15,
    });

    const page = await browser.newPage();

    // site to be tested
    // await page.goto()

    // user clicks the signup button
    await page.click("#signinbtn");

    // admin signin
    await page.type("#email_", "test@test.com");
    await page.type("#password_", "123456");
    await page.click("#signin_form > div.field.is-grouped > div.control.pb-3 > button");

    // test clicking inventory tab
    await page.click("#inventorybtn");
    await page.click("#addinvbtn"); // adding inventory
    // entering new inventory
    await page.type("#invname", "new item name");
    await page.type("#invdesc", "new item description");
    await page.type("#invquantity", "new item quantity");

    // testing clicking event tab
    await page.click("#eventsbtn");
};

// call go function
go();