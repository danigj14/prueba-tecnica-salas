import { Button, Modal } from "@/core/components";
import { faSpinner, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useCreateRoomMutation } from "../hooks";
import { useFloorRooms } from "../hooks/useFloorRooms";
import { Room } from "../types";
import { FilterControls, RoomFilterFn } from "./FilterControls";
import { RoomCard } from "./RoomCard";
import { RoomForm } from "./RoomForm";

interface FloorPanelProps {
  floor: Room["floor"];
}

export function FloorPanel({ floor }: FloorPanelProps) {
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [filterFn, setFilterFn] = useState<RoomFilterFn>(
    () => (rooms: Room[]) => rooms
  );

  const {
    data,
    isSuccess,
    isError,
    isLoading: roomsLoading,
  } = useFloorRooms(floor);

  const { mutate, isLoading: creationLoading } = useCreateRoomMutation();

  return (
    <section className="p-4 px-8 border border-blue-dark rounded-[26px]">
      {roomsLoading && (
        <FontAwesomeIcon
          className="block mx-auto py-10 text-3xl"
          icon={faSpinner}
          spin
        />
      )}
      {isSuccess && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Planta {floor}</h1>
            <Button onClick={() => setIsCreatingRoom(true)}>Añadir sala</Button>
          </div>
          <FilterControls
            onFilterChange={(filterFn) => setFilterFn(() => filterFn)}
          />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filterFn(data).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
          {isCreatingRoom && (
            <Modal>
              {creationLoading ? (
                <div className="p-32 bg-white rounded-[26px] text-3xl">
                  <FontAwesomeIcon icon={faSpinner} spin />
                </div>
              ) : (
                <RoomForm
                  headingText="Crear Sala"
                  onCancel={() => setIsCreatingRoom(false)}
                  onSave={(data) =>
                    mutate(
                      { floor, ...data },
                      { onSettled: () => setIsCreatingRoom(false) }
                    )
                  }
                />
              )}
            </Modal>
          )}
        </>
      )}
      {isError && (
        <h1 className="py-2 px-4">
          <FontAwesomeIcon icon={faWarning} className="mr-2" />
          No se han podido cargar las salas.
        </h1>
      )}
    </section>
  );
}
