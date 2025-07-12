import { Request, Response, NextFunction, Router } from "express";

const router = Router();

router.post("/record", (req: Request, res: Response, next: NextFunction) => {
  console.log("Starting recording");
});

router.post("/stop", (req: Request, res: Response, next: NextFunction) => {
  console.log("Stopping recording");
});

export default router;
