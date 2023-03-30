import axios from "@/core/lib/axios";
import { Room } from "../types";

export function updateRoom(
  id: Room["id"],
  data: Omit<Room, "id">
): Promise<Room> {
  return axios.put(`/rooms/${id}`, data);
}
