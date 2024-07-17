import { Request, Response } from "express";
import { ResourceRepositoryTypeOrm } from "../../repositories/resources/resourceRepositoryTypeOrm";
import { UpdateResourceServices } from "../../services/resources/updateResourceServices";

export class UpdateResourceController {
  public async handle(id: number, req: Request, res: Response) {
    const resourceRepository = new ResourceRepositoryTypeOrm();

    const payload = req.body;
    const service = new UpdateResourceServices(resourceRepository);

    const output = await service.execute(id, payload);
    res.json(output);
  }
}
