import { Browser, Page } from "puppeteer";
import config from "../config";
import puppeteer from "puppeteer";
import { PuppeteerScreenRecorder } from "puppeteer-screen-recorder";
import type { Config, BrowserServiceI } from "../types";

class BrowserService implements BrowserServiceI {
  private static instance: BrowserService;

  private browser: Browser | null = null;
  private page: Page | null = null;
  private recorder: PuppeteerScreenRecorder | null = null;
  private meetUrl: string | null = null;
  private readonly config: Config = config;
  private videoPath: string;

  private constructor() {
    this.videoPath = config.videoPath + "/" + new Date().toISOString() + ".mp4";
  }

  public static getInstance(): BrowserService {
    if (!BrowserService.instance) {
      BrowserService.instance = new BrowserService();
    }
    return BrowserService.instance;
  }

  async init(meetUrl: string): Promise<void> {
    this.meetUrl = meetUrl;
    this.browser = await puppeteer.launch({
      headless: this.config.headlessModeEnabled,
      args: this.config.puppeteerArgs,
    });
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
    this.recorder = new PuppeteerScreenRecorder(
      this.page,
      config.recorderConfig
    );
    this.videoPath = config.videoPath + "/" + new Date().toISOString() + ".mp4"; // regenerate path for each recording
  }

  async startRecording(): Promise<void> {
    const { page, recorder, meetUrl } = this.assertInitialized();
    await page.goto(meetUrl);
    await page.waitForNetworkIdle();
    await this.clickOnButtonWithText("Allow microphone");
    await this.fillInputWithPlaceholder("Your name", "testuser");
    await this.clickOnButtonWithText("Ask to join");

    await recorder.start(this.videoPath);
  }

  async stopRecording(): Promise<string> {
    await this.recorder!.stop();
    await this.shutdown();
    return this.videoPath;
  }

  private async shutdown(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
    this.browser = null;
    this.page = null;
    this.recorder = null;
    this.meetUrl = null;
  }

  private assertInitialized() {
    if (!this.browser || !this.page || !this.recorder || !this.meetUrl) {
      throw new Error(
        "BrowserService not initialized. Call init() before using this method."
      );
    }

    return {
      browser: this.browser,
      page: this.page,
      recorder: this.recorder,
      meetUrl: this.meetUrl,
    };
  }

  private async clickOnButtonWithText(text: string): Promise<void> {
    const { page } = this.assertInitialized();

    await page.waitForSelector("button");

    const buttons = await page.$$("button");
    for (const button of buttons) {
      const btnText = await page.evaluate(
        (el) => el.textContent?.trim(),
        button
      );
      if (btnText === text) {
        await button.click();
        break;
      }
    }
  }

  private async fillInputWithPlaceholder(
    placeholder: string,
    text: string
  ): Promise<void> {
    const { page } = this.assertInitialized();
    const inputSelector = `input[placeholder="${placeholder}"]`;
    await page.waitForSelector(inputSelector);
    await page.click(inputSelector);
    await page.type(inputSelector, text);
  }
}

export default BrowserService;
