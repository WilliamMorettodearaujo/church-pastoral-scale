import { Request, Response } from "express";
import { ValidationException } from "../../exceptions/validationException";
import Registry from "../../registry/Registry";
import { ChurchRepositoryDatabase } from "../../repositories/churchs/churchRepositoryDatabase";
import { CreateChurchServices } from "../../services/churchs/createChurchServices";

export class CreateChurchController {
  public async handle(req: Request, res: Response) {
    try {
      const registry = new Registry();
      registry.provide("IChurchRepository", new ChurchRepositoryDatabase());
      const payload = req.body;
      const service = new CreateChurchServices(registry);
      const output = await service.execute(payload);

      res.json(output);
    } catch (error) {
      if (error instanceof ValidationException) {
        res.status(error.statusCode).json({
          error: "Erro de validação",
          details: error.details,
        });
      } else {
        res.status(500).json({ error: "Erro interno do servidor" });
      }
    }
  }
}
