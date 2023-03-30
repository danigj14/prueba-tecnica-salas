import axios from "@/core/lib/axios";
import { Room } from "../types";

export function deleteRoom(id: Room["id"]): Promise<Room> {
  return axios.delete(`/rooms/${id}`);
}
