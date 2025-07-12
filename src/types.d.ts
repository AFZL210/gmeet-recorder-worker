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
  puppeteerArgs: string[];
  videoPath: string;
  headlessModeEnabled: boolean
}

export interface BrowserServiceI {
  init(meetUrl: string): Promise<void>;
  startRecording(): Promise<void>;
  stopRecording(): Promise<string>;
}
