import { API_URL } from "@/config";
import axios from "axios";
import { Room } from "../types";

export function createRoom(data: Omit<Room, "id">): Promise<Room> {
  return axios
    .post(`${API_URL}/rooms`, data)
    .then((data) => data.data);
}
