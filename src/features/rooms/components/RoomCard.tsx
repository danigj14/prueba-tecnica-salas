import { Button, Modal } from "@/core/components";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDeleteRoomMutation } from "../hooks";
import { useUpdateRoomMutation } from "../hooks/useUpdateRoomMutation";
import { Room } from "../types";
import { RoomForm } from "./RoomForm";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: updateRoom, isLoading: updateIsLoading } =
    useUpdateRoomMutation(room.id);
  const { mutate: deleteRoom, isLoading: deleteIsLoading } =
    useDeleteRoomMutation();

  return (
    <>
      <div className="p-4 flex flex-col bg-blue-light rounded-[26px] relative">
        <Button
          className="absolute top-3 right-3 h-6 w-6 p-0 flex justify-center items-center"
          onClick={() => deleteRoom(room.id)}
        >
          <FontAwesomeIcon
            icon={deleteIsLoading ? faSpinner : faXmark}
            spin={deleteIsLoading}
          />
        </Button>
        <h1 className="text-xl font-bold pr-7">{room.name}</h1>
        <h2 className="mt-4 py-1 font-bold">Capacidad máxima</h2>
        <p className="p-2 px-4 border border-blue-dark rounded-[12px] bg-white w-full">
          {room.maximumCapacity}
        </p>
        <h2 className="mt-4 py-1 font-bold">Ocupación</h2>
        <div className="flex relative">
          <p className="p-2 px-4 border border-blue-dark rounded-[12px] bg-white w-full">
            {room.occupancyPercent}
          </p>
          <span className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none">
            %
          </span>
        </div>
        <Button
          className="mt-5 self-end"
          onClick={() => setIsEditing(!isEditing)}
        >
          Modificar
        </Button>
      </div>
      {isEditing && (
        <Modal>
          {updateIsLoading ? (
            <div className="p-32 bg-white rounded-[26px] text-3xl">
              <FontAwesomeIcon icon={faSpinner} spin />
            </div>
          ) : (
            <RoomForm
              headingText="Editar Sala"
              initialValues={{
                name: room.name,
                maximumCapacity: room.maximumCapacity,
                occupancyPercent: room.occupancyPercent,
              }}
              onSave={(data) =>
                updateRoom(
                  { ...room, ...data },
                  { onSettled: () => setIsEditing(false) }
                )
              }
              onCancel={() => setIsEditing(false)}
            />
          )}
        </Modal>
      )}
    </>
  );
}
