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
    await page.type("#email_", "hasa.wisc@gmail.com");
    await page.type("#password_", "HASA@2023isG7");
    await page.click("#signin_form > div.field.is-grouped > div.control.pb-3 > button");

    // test clicking inventory tab
    await page.click("#inventorybtn");
       
    // testing clicking event tab
    await page.click("#eventsbtn");
    await page.click("#addeventbtn");
    await page.type("#eventname", "Testing Event");
    await page.type("#eventdate", "05/08/2023");
    await page.type("#eventtime", "5-6pm");
    await page.type("#eventlocation", "Test");
    await page.type("#rsvp", "rsvp");
    await page.type("#eventdesc", "testing description");
    await page.click("#sbmt_event");

};

// call go function
go();