import { Button } from "@/core/components";
import { RoomCard } from "./RoomCard";

export function FloorPanel() {
  return (
    <div className="p-4 border border-blue-dark rounded-[26px]">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Planta 1</h1>
        <Button>Añadir sala</Button>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
      </div>
    </div>
  );
}
