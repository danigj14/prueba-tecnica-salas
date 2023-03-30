import { Button, Input } from "@/core/components";
import { Room } from "../types";

type RoomCardProps = Pick<Room, "name" | "maximumCapacity" | "occupancyPercent">

export function RoomCard({name, maximumCapacity, occupancyPercent}: RoomCardProps) {
  return (
    <div className="p-4 flex flex-col bg-blue-light rounded-[26px]">
      <h1 className="text-xl font-bold">{name}</h1>
      <label className="mt-4 py-1 font-bold">Capacidad máxima</label>
      <Input type="number" value={maximumCapacity} className="[appearance:textfield]" />
      <label className="mt-4 py-1 font-bold">Ocupación</label>
      <div className="flex relative">
        <Input
          type="number"
          value={occupancyPercent}
          className="[appearance:textfield] w-full pr-8"
        />
        <span className="absolute top-1/2 -translate-y-1/2 right-4">%</span>
      </div>
      <Button className="mt-5 self-end">Modificar</Button>
    </div>
  );
}
