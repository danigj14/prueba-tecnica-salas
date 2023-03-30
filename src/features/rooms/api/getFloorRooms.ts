import { API_URL } from "@/config";
import axios from "axios";
import { Room } from "../types";

export function getFloorRooms(floor: Room["floor"]): Promise<Room[]> {
  return axios
    .get(`${API_URL}/rooms?floor=${floor}`)
    .then((data) => data.data);
}
