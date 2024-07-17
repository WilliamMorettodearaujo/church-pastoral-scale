import { Response } from "express";
import { ResourceRepositoryTypeOrm } from "../../repositories/resources/resourceRepositoryTypeOrm";
import { GetOneResourceService } from "../../services/resources/getOneResourceServices";

export class GetOneResourceController {
  public async handle(id: number, res: Response) {
    const resourceRepository = new ResourceRepositoryTypeOrm();
    const service = new GetOneResourceService(resourceRepository);
    const output = await service.execute(id);
    res.json(output);
  }
}
