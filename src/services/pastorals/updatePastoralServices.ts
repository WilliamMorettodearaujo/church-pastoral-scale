import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { IPastoralRepository } from "../../repositories/pastorals/IpastoralRepository";
import { PastoralValidador } from "../../validator/pastoralValidador";

import { CreatePastoralInputDTO } from "./dtos/createPastoralInputDTO";
import { ListPastoralOutputDTO } from "./dtos/listPastoralOutputDTO";

export class UpdatePastoralServices {
  constructor(readonly pastoralRepository: IPastoralRepository) {}

  public async execute(
    id: number,
    payload: CreatePastoralInputDTO
  ): Promise<ListPastoralOutputDTO> {
    PastoralValidador.handle([payload]);

    const pastoralAlreadyExists = await this.pastoralRepository.getById(id);

    if (!pastoralAlreadyExists) {
      throw new ExceptionHandler("Error", `Pastoral ${id} Not Found`, 409);
    }

    const pastoralAndChurch = await this.pastoralRepository.findByNameAndChurch(
      payload.name,
      payload.churchId
    );

    if (pastoralAndChurch && pastoralAndChurch.id != id) {
      throw new ExceptionHandler(
        "Error",
        `Pastoral with federal document ${payload.name} already exists`,
        409
      );
    }

    try {
      const pastoral = await this.pastoralRepository.update(id, payload);
      return {
        id: pastoral.id,
        code: pastoral.code,
        name: pastoral.name,
        observation: pastoral.observation,
        churchId: pastoral.church.id,
        churchName: pastoral.church.corporateName,
        enabled: pastoral.enabled,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
