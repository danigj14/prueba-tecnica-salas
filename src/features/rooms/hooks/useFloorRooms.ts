import { useQuery } from "@tanstack/react-query";
import { getFloorRooms } from "../api";
import { Room } from "../types";

export function useFloorRooms(floor: number) {
  return useQuery<Room[]>(["rooms", { floor }], () => getFloorRooms(floor));
}
