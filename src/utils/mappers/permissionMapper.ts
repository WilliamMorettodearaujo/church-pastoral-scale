import { ListPermissionOutputDTO } from "../../services/permissions/dtos/listPermissionOutputDTO";

export function mapPermissions(permissions: ListPermissionOutputDTO[]) {
  return permissions.map((permissions) => ({
    id: permissions.id,
    uuid: permissions.uuid,
    name: permissions.name,
    description: permissions.description,
    resource: {
      id: permissions.resource.id,
      name: permissions.resource.name,
      description: permissions.resource.description,
    },
    enabled: permissions.enabled,
  }));
}
