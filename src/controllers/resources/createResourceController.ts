import { Request, Response } from "express";
import { ResourceRepositoryTypeOrm } from "../../repositories/resources/resourceRepositoryTypeOrm";
import { CreateResourceServices } from "../../services/resources/createResourceServices";

export class CreateResourceController {
  public async handle(req: Request, res: Response) {
    const resourceRepository = new ResourceRepositoryTypeOrm();

    const payload = req.body;
    const service = new CreateResourceServices(resourceRepository);
    const output = await service.execute(payload);

    res.json(output);
  }
}
