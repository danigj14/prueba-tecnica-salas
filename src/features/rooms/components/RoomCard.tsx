import { Button, Input, Modal } from "@/core/components";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useUpdateRoomMutation } from "../hooks/useUpdateRoomMutation";
import { Room } from "../types";
import { RoomForm } from "./RoomForm";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { mutate, isLoading } = useUpdateRoomMutation(room.id);

  return (
    <>
      <div className="p-4 flex flex-col bg-blue-light rounded-[26px]">
        <h1 className="text-xl font-bold">{room.name}</h1>
        <label className="mt-4 py-1 font-bold">Capacidad máxima</label>
        <Input
          type="number"
          value={room.maximumCapacity}
          disabled
          className="[appearance:textfield] bg-white"
        />
        <label className="mt-4 py-1 font-bold">Ocupación</label>
        <div className="flex relative">
          <Input
            type="number"
            value={room.occupancyPercent}
            disabled
            className="[appearance:textfield] w-full pr-8 bg-white"
          />
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
          {isLoading ? (
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
                mutate(
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
