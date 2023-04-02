import { test, expect } from '@playwright/test';

test.describe('two tests', () => {
    //test.describe.parallel('two tests', () => {
  
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
        await page.pause();

        //  const username = page.locator("text=Mobile Number")
        //   username.click();
      
        // await page.pause();
        
      })
});






