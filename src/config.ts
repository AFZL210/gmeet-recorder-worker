import type { Config } from "./types";

const config: Config = {
  recorderConfig: {
    followNewTab: true,
    fps: 25,
    ffmpeg_Path: null,
    videoFrame: {
      width: 1920,
      height: 1080,
    },
    videoCrf: 18,
    videoCodec: "libx264",
    videoPreset: "ultrafast",
    videoBitrate: 1000,
    autopad: {
      color: "black",
    },
    aspectRatio: "16:9",
  },
  puppeteerArgs: [
    "--disable-blink-features=AutomationControlled",
    "--use-fake-ui-for-media-stream",
    "--window-size=1920,1080"
  ],
  videoPath: "./recordings",
  headlessModeEnabled: false
};

export default config;
