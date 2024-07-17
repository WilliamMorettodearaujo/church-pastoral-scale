import { Response } from "express";
import { ResourceRepositoryTypeOrm } from "../../repositories/resources/resourceRepositoryTypeOrm";
import { ListResourceServices } from "../../services/resources/listResourceServices";

export class ListResourceController {
  public async handle(res: Response) {
    const resourceRepository = new ResourceRepositoryTypeOrm();

    const service = new ListResourceServices(resourceRepository);
    const output = await service.execute();
    res.json(output);
  }
}
