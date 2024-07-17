import { ListResourceOutputDTO } from "../../services/resources/dtos/listResourceOutputDTO";

export function mapResources(resources: ListResourceOutputDTO[]) {
  return resources.map((resource) => ({
    id: resource.id,
    uuid: resource.uuid,
    name: resource.name,
    description: resource.description,
    enabled: resource.enabled,
  }));
}
