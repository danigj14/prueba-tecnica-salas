import axios from "axios";
import { Room } from "../types";

export function updateRoom(id: Room["id"], data: Omit<Room, "id">): Promise<Room> {
  return axios
    .put(`${import.meta.env.VITE_API_URL}/rooms/${id}`, data)
    .then((data) => data.data);
}
