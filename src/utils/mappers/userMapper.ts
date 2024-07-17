import { ListUserOutputDTO } from "../../services/users/dtos/listUserOutputDTO";

export function mapUsers(users: ListUserOutputDTO[]) {
  return users.map((user) => ({
    id: user.id,
    uuid: user.uuid,
    code: user.code,
    name: user.name,
    email: user.email,
    enabled: user.enabled,
  }));
}
