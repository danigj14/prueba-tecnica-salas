import axios from "@/core/lib/axios";
import { Room } from "../types";

export function createRoom(data: Omit<Room, "id">): Promise<Room> {
  return axios.post(`/rooms`, data);
}
