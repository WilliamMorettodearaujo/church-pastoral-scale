import { Router } from "express";
import { churchRoutes } from "./churchsRouter";

export const router = Router();

const date = new Date();
const currentYear = date.getFullYear();

// health check
router.get("/", (req, res) => {
  return res.json({
    hello: `Api - Metta Produções - ${currentYear}`,
  });
});

router.use("/church", churchRoutes);
