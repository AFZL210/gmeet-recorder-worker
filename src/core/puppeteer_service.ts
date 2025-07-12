import config from "../config";
import type { Config, PuppeteerServiceI } from "../types";

class PuppeteerService implements PuppeteerServiceI {
  readonly meetUrl: string;
  readonly config: Config;

  constructor(meetUrl: string) {
    this.meetUrl = meetUrl;
    this.config = config;
  }

  init(): Promise<void> {
    return new Promise<void>(() => {});
  }

  startRecording(): Promise<void> {
    return new Promise<void>(() => {});
  }

  stopRecording(): Promise<string> {
    return new Promise<string>(() => {});
  }
}
