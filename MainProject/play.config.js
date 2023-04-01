import { defineConfig } from '@playwright/test';


const Configure ={
  setTimeout:4000,

  use:{
    //baseURL:"https://eticket.railway.gov.bd/",
    headless:on,
    video:'off',
    screenshot:'off'
  }
}


 // Configure projects for major browsers.
 projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]