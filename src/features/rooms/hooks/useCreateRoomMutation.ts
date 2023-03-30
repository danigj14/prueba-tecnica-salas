import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoom } from "../api";
import { Room } from "../types";

export function useCreateRoomMutation() {
  const queryClient = useQueryClient();
  return useMutation<Room, unknown, Omit<Room, "id">>(createRoom, {
    onSuccess: (newRoom) =>
      queryClient.setQueryData<Room[]>(
        ["rooms", { floor: newRoom.floor }],
        (oldData) => oldData && [...oldData, newRoom]
      ),
  });
}
