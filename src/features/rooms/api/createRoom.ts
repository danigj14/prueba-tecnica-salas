import axios from "axios";
import { Room } from "../types";

export function createRoom(data: Omit<Room, "id">): Promise<Room> {
  return axios
    .post(`${import.meta.env.VITE_API_URL}/rooms`, data)
    .then((data) => data.data);
}
