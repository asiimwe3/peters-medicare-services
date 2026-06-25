import { Router, type IRouter } from "express";
import healthRouter from "./health";
import donateRouter from "./donate";
import appointmentsRouter from "./appointments";

const router: IRouter = Router();

router.use(healthRouter);
router.use(donateRouter);
router.use(appointmentsRouter);

export default router;
