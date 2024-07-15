import { mapUsers } from "./userMapper";

export function mapScales(scales) {
  return scales.map((scale) => ({
    id: scale.id,
    pastoral: {
      id: scale.pastoral.id,
      code: scale.pastoral.code,
      name: scale.pastoral.name,
    },
    user: scale.users ? mapUsers(scale.users) : [],
  }));
}
