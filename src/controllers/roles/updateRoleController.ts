import { Request, Response } from "express";
import { RoleRepositoryTypeOrm } from "../../repositories/roles/roleRepositoryTypeOrm";
import { UpdateRoleServices } from "../../services/roles/updateRoleServices";

export class UpdateRoleController {
  public async handle(id: number, req: Request, res: Response) {
    const roleRepository = new RoleRepositoryTypeOrm();

    const payload = req.body;
    const service = new UpdateRoleServices(roleRepository);

    const output = await service.execute(id, payload);
    res.json(output);
  }
}
