import axios from "@/core/lib/axios";
import { Room } from "../types";

export function getFloorRooms(floor: Room["floor"]): Promise<Room[]> {
  return axios.get(`/rooms?floor=${floor}`);
}
