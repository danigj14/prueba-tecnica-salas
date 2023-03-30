import { Button, Input } from "@/core/components";
import { useState } from "react";
import { Room } from "../types";

interface RoomFormProps {
  headingText: string;
  initialValues?: Omit<Room, "id" | "floor">;
  onSave: (data: Omit<Room, "id" | "floor">) => void;
  onCancel: () => void;
}

export function RoomForm({
  headingText,
  initialValues,
  onSave = () => {},
  onCancel = () => {},
}: RoomFormProps) {
  const [name, setName] = useState(initialValues?.name || "");
  const [maximumCapacity, setMaximumCapacity] = useState(
    initialValues?.maximumCapacity || 0
  );
  const [occupancyPercent, setOccupancyPercent] = useState(
    initialValues?.occupancyPercent || 0
  );

  return (
    <div className="p-8 bg-white flex flex-col rounded-[26px]">
      <h1 className="text-xl font-bold">{headingText}</h1>
      <label className="mt-4 py-1 font-bold">Nombre</label>
      <Input value={name} onChange={(event) => setName(event.target.value)} />
      <label className="mt-4 py-1 font-bold">Capacidad máxima</label>
      <Input
        type="number"
        value={maximumCapacity}
        onChange={(event) =>
          setMaximumCapacity(Number.parseInt(event.target.value))
        }
        className="[appearance:textfield]"
      />
      <label className="mt-4 py-1 font-bold">Ocupación</label>
      <div className="flex relative">
        <Input
          type="number"
          value={occupancyPercent}
          onChange={(event) =>
            setOccupancyPercent(Number.parseInt(event.target.value))
          }
          className="[appearance:textfield] w-full pr-8 bg-white"
        />
        <span className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none">
          %
        </span>
      </div>
      <div className="mt-8 flex justify-between">
        <Button onClick={onCancel}>Cancelar</Button>
        <Button
          onClick={() => onSave({ name, maximumCapacity, occupancyPercent })}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}
