import { API_URL } from "@/config";
import axios from "axios";
import { Room } from "../types";

export function deleteRoom(id: Room["id"]): Promise<Room> {
  return axios
    .delete(`${API_URL}/rooms/${id}`)
    .then((data) => data.data);
}
