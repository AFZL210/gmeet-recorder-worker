import type { Config } from "./types";

const config: Config = {
  recorderConfig: {
    followNewTab: true,
    fps: 25,
    ffmpeg_Path: null,
    videoFrame: {
      width: 1024,
      height: 768,
    },
    videoCrf: 18,
    videoCodec: "libx264",
    videoPreset: "ultrafast",
    videoBitrate: 1000,
    autopad: {
      color: "black",
    },
    aspectRatio: "4:3",
  },
  puppeteer_args: [
    "--disable-blink-features=AutomationControlled",
    "--use-fake-ui-for-media-stream",
  ],
  videoPath: "./rec/v1.mp4",
};

export default config;
