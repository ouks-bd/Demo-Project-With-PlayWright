const {test,expect} = require('@playwright/test');

test ("Test on Railway @smoke",async ({page})=>{

  await page.goto("https://eticket.railway.gov.bd/");
  await page.pause();
  
})

test ("Test on Brac Bank @regression",async ({page})=>{

  await page.goto("https://www.bracbank.com/en/");
  await page.pause();
  
})

//test.only("Click On The Login Page",async ({page})=>{
test ("Click On The Login Page",async ({page})=>{

  await page.goto("https://eticket.railway.gov.bd/");

  await page.locator("text=I Agree").click();

  await page.click("text=Login")

  const username = page.locator("text=Mobile Number")
  await username.click();

  await page.pause();
  
})
