import { Router } from "express";
import { churchRoutes } from "./churchsRouter";
import { exceptionMiddleware } from "./middlewares/exceptionMiddleware";

export const router = Router();

const date = new Date();
const currentYear = date.getFullYear();

// health check
router.get("/", (req, res) => {
  return res.json({
    hello: `Api - Escalas de agentes de pastorais Igreja Católica - ${currentYear}`,
  });
});

router.use("/church", churchRoutes);

router.use(exceptionMiddleware);
