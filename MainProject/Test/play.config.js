import { defineConfig } from '@playwright/test';


const Configure ={
  setTimeout:4000,

  use:{
    //headless:false,
    //video:'off'
  }
}


 // Configure projects for major browsers.
 projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]