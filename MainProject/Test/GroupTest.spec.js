const {test,expect} = require('@playwright/test');

test.describe("Group Test",() =>{

    test ("Test on Railway @smoke",async ({page})=>{

        await page.goto("https://eticket.railway.gov.bd/");
        await page.pause();
        
      })
      
      test ("Test on Brac Bank @regression",async ({page})=>{
      
        await page.goto("https://www.bracbank.com/en/");
        await page.pause();
        
      })

})