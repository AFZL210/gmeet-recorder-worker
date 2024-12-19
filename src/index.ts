import puppeteer from "puppeteer";

const meetUrl = 'https://meet.google.com/hys-ipuo-sys'

const main = async () => {
  const browser = await puppeteer.launch({ headless: false, args: ['--disable-blink-features=AutomationControlled', '--use-fake-ui-for-media-stream'] });
  const page = await browser.newPage();
  await page.setViewport({width: 1080, height: 1024});

  const clickOnButtonWithText = async (text: string) => {
    await page.waitForSelector('button');
  
    const buttons = await page.$$('button');
    for (const button of buttons) {
      const text = await page.evaluate(el => el.textContent?.trim(), button);
      if (text === 'Ask to join') {
        await button.click();
        break;
      }
    }
  }

  const fillInputWithPlaceholder = async (placeholder: string, text: string) => {
    const inputSelector = `input[placeholder="${placeholder}"]`;
    await page.waitForSelector(inputSelector);
    await page.click(inputSelector);
    await page.type(inputSelector, text);
  }

  await page.goto(meetUrl);
  await page.waitForNetworkIdle();
  await fillInputWithPlaceholder('Your name', 'testuser');
  await clickOnButtonWithText('Ask to join');


  await new Promise((re, res) => {
    setTimeout(res, 50000)
  })
}

main();