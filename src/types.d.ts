export interface RecorderSettings {
  followNewTab: boolean;
  fps: number;
  ffmpeg_Path: string | null;
  videoFrame: {
    width: number;
    height: number;
  };
  videoCrf: number;
  videoCodec: string;
  videoPreset: string;
  videoBitrate: number;
  autopad: {
    color: string;
  };
  aspectRatio: string;
}

export interface Config {
  recorderConfig: RecorderSettings;
  puppeteer_args: string[];
  videoPath: string;
}

export interface PuppeteerServiceI {
  init(): Promise<void>;
  startRecording(): Promise<void>;
  stopRecording(): Promise<string>;
}
