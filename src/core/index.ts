import puppeteer from "puppeteer";
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';

const meetUrl = 'https://meet.google.com/gxi-msoe-jyr';
const recorderConfig = {
  followNewTab: true,
  fps: 25,
  ffmpeg_Path: null,
  videoFrame: {
    width: 1024,
    height: 768,
  },
  videoCrf: 18,
  videoCodec: 'libx264',
  videoPreset: 'ultrafast',
  videoBitrate: 1000,
  autopad: {
    color: 'black',
  },
  aspectRatio: '4:3',
};
const videoPath = './rec/v1.mp4';

const main = async () => {
  const browser = await puppeteer.launch({ headless: false, args: ['--disable-blink-features=AutomationControlled', '--use-fake-ui-for-media-stream'] });
  const page = await browser.newPage();
  await page.setViewport({width: 1080, height: 1024});
  const recorder = new PuppeteerScreenRecorder(page, recorderConfig);

  const clickOnButtonWithText = async (text: string) => {
    await page.waitForSelector('button');
  
    const buttons = await page.$$('button');
    for (const button of buttons) {
      const btnText = await page.evaluate(el => el.textContent?.trim(), button);
      if (btnText === text) {
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

  await recorder.start(videoPath);



  await new Promise((re, res) => {
    setTimeout(res, 10000)
  }).then(async () => {
    await recorder.stop();
  })
}

main();