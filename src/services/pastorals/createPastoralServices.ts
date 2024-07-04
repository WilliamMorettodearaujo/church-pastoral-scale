import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { ChurchRepositoryTypeOrm } from "../../repositories/churchs/churchRepositoryTypeOrm";
import { CommonRepositoryTypeOrm } from "../../repositories/common/commonRepositoryTypeOrm";
import { PastoralRepositoryTypeOrm } from "../../repositories/pastorals/pastoralRepositoryTypeOrm";
import { PastoralValidador } from "../../validator/pastoralsValidador";
import { CreatePastoralInputDTO } from "./dtos/createPastoralInputDTO";
import { createPastoralOutputDTO } from "./dtos/createPastoralOutputDTO";

export class CreatePastoralServices {
  private repository: CommonRepositoryTypeOrm;
  private pastoralRepository: PastoralRepositoryTypeOrm;
  private churchRepository: ChurchRepositoryTypeOrm;

  constructor() {
    this.repository = new CommonRepositoryTypeOrm();
    this.pastoralRepository = new PastoralRepositoryTypeOrm();
    this.churchRepository = new ChurchRepositoryTypeOrm();
  }

  public async execute(
    payload: CreatePastoralInputDTO
  ): Promise<createPastoralOutputDTO> {
    PastoralValidador.handle([payload]);

    const pastoralAlreadyExists =
      await this.pastoralRepository.findByNameAndChurch(
        payload.name,
        payload.churchId
      );

    if (pastoralAlreadyExists) {
      throw new ExceptionHandler(
        "Error",
        `Pastoral ${payload.name} already exists`,
        409
      );
    }

    const church = await this.churchRepository.getById(payload.churchId);

    if (!church) {
      throw new ExceptionHandler("Error", "Church not found", 404);
    }

    try {
      payload.code = await this.repository.lastCodeByChurch(
        "pastorals",
        payload.churchId
      );

      const pastoral = await this.pastoralRepository.create(payload, church);

      return {
        id: pastoral.id,
      };
    } catch (error) {
      throw new ExceptionHandler("Error", error.message, 500);
    }
  }
}
