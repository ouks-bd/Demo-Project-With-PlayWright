import { test, expect } from '@playwright/test';

test.describe('two tests', () => {
    // test('one', async ({ page }) => {
    // ...
    test.beforeEach(async({page})=>{
        await page.goto("https://eticket.railway.gov.bd/");
    })

    test.afterEach(async({page})=>{
        console.log("Test Done");
    })

    test ("Click On The Login Page",async ({page})=>{

       // await page.goto("https://eticket.railway.gov.bd/");
      
        await page.locator("text=I Agree").click();
      
        await page.click("text=Login")
        await page.locator("#mobile_number").type("001122334455")
        await page.locator("#password").type("001122334455")
        await page.locator("button:has-text= ('LOGIN')").click();
        

        await page.pause();

        //  const username = page.locator("text=Mobile Number")
        //   username.click();
      
        // await page.pause();
        
      })
});






