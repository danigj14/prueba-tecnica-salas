import { Button } from "@/core/components";
import { useFloorRooms } from "../hooks/useFloorRooms";
import { RoomCard } from "./RoomCard";

interface FloorPanelProps {
  floor: number;
}

export function FloorPanel({ floor }: FloorPanelProps) {
  const { data, isSuccess } = useFloorRooms(floor);

  return (
    <div className="p-4 border border-blue-dark rounded-[26px]">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Planta {floor}</h1>
        <Button>Añadir sala</Button>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isSuccess &&
          data.map((room) => (
            <RoomCard
              key={room.id}
              name={room.name}
              maximumCapacity={room.maximumCapacity}
              occupancyPercent={room.occupancyPercent}
            />
          ))}
      </div>
    </div>
  );
}
