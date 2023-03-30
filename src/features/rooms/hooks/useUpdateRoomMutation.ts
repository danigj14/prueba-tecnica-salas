import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoom } from "../api";
import { Room } from "../types";

export function useUpdateRoomMutation(id: Room["id"]) {
  const queryClient = useQueryClient();

  return useMutation<Room, unknown, Omit<Room, "id">>({
    mutationFn: (data) => updateRoom(id, data),

    // After a successful update, update the room data in the floor rooms query to avoid an extra network request.
    onSuccess: (updatedRoom) =>
      queryClient.setQueryData<Room[]>(
        ["rooms", { floor: updatedRoom.floor }],
        (oldData) =>
          oldData &&
          oldData.map((room) =>
            room.id === updatedRoom.id ? updatedRoom : room
          )
      ),
  });
}
