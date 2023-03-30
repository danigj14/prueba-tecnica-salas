import { Button } from "@/core/components";
import { faSpinner, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFloorRooms } from "../hooks/useFloorRooms";
import { RoomCard } from "./RoomCard";

interface FloorPanelProps {
  floor: number;
}

export function FloorPanel({ floor }: FloorPanelProps) {
  const { data, isSuccess, isError, isLoading } = useFloorRooms(floor);

  return (
    <div className="p-4 border border-blue-dark rounded-[26px]">
      {isLoading && (
        <FontAwesomeIcon
          className="block mx-auto py-10 text-3xl"
          icon={faSpinner}
          spin
        />
      )}
      {isSuccess && (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Planta {floor}</h1>
            <Button>Añadir sala</Button>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </>
      )}
      {isError && (
        <h1 className="py-2 px-4">
          <FontAwesomeIcon icon={faWarning} className="mr-2" />
          No se han podido cargar las salas.
        </h1>
      )}
    </div>
  );
}
