import axios from "axios";
import { Room } from "../types";

export function getFloorRooms(floor: number): Promise<Room[]> {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/rooms?floor=${floor}`)
    .then((data) => data.data);
}
