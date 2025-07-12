import { Request, Response, NextFunction, Router } from "express";
import BrowserService from "../core/browser_service";

const router = Router();
const browserService = BrowserService.getInstance();

router.post(
  "/record",
  async (req: Request, res: Response, next: NextFunction) => {
    const { meetUrl } = req.body;

    await browserService.init(meetUrl);
    await browserService.startRecording();
    return res.json({ message: "Started recording" }).status(200);
  }
);

router.post(
  "/stop",
  async (req: Request, res: Response, next: NextFunction) => {
    await browserService.stopRecording();
    return res.json({ message: "Stopped recording" }).status(200);
  }
);

export default router;
