import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom } from "../api";
import { Room } from "../types";

export function useDeleteRoomMutation() {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, Room["id"]>(deleteRoom, {
    onSuccess: () => queryClient.invalidateQueries(["rooms"]),
  });
}
