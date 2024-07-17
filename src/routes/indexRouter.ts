import { Router } from "express";
import { authenticationMiddleware } from "../middleware/authenticationMiddleware";
import { authenticationRouters } from "./authenticationRouter";
import { churchRoutes } from "./churchsRouter";
import { cityRoutes } from "./citiesRouter";
import { federalUnitRoutes } from "./federalUnitRouter";
import { massRoutes } from "./massRouter";
import { exceptionMiddleware } from "./middlewares/exceptionMiddleware";
import { pastoralRoutes } from "./pastoralRouter";
import { permissionRoutes } from "./permissionRouter";
import { resourceRoutes } from "./resourcesRouter";
import { roleRoutes } from "./rolesRouter";
import { userRoutes } from "./userRouter";
import { utilityRouters } from "./utilityRouter";

export const router = Router();

const date = new Date();
const currentYear = date.getFullYear();

// health check
router.get("/", (req, res) => {
  return res.json({
    hello: `Api - Escalas de agentes de pastorais Igreja Católica - ${currentYear}`,
  });
});

router.use("/church", authenticationMiddleware, churchRoutes);
router.use("/city", authenticationMiddleware, cityRoutes);
router.use("/federal-unit", authenticationMiddleware, federalUnitRoutes);
router.use("/pastoral", authenticationMiddleware, pastoralRoutes);
router.use("/mass", authenticationMiddleware, massRoutes);
router.use("/user", authenticationMiddleware, userRoutes);
router.use("/utility", authenticationMiddleware, utilityRouters);
router.use("/resource", authenticationMiddleware, resourceRoutes);
router.use("/permission", authenticationMiddleware, permissionRoutes);
router.use("/role", authenticationMiddleware, roleRoutes);

router.use("/authentication", authenticationRouters);

router.use(exceptionMiddleware);
