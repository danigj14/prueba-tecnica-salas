import { Button, Input } from "@/core/components";
import { isNumberInput, isValidPercentInput } from "@/core/util/util";
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
    initialValues?.maximumCapacity.toString() || ""
  );
  const [occupancyPercent, setOccupancyPercent] = useState(
    initialValues?.occupancyPercent.toString() || ""
  );

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    onSave({
      name,
      maximumCapacity: Number.parseInt(maximumCapacity),
      occupancyPercent: Number.parseInt(occupancyPercent),
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-8 bg-white flex flex-col rounded-[26px]"
    >
      <h1 className="text-xl font-bold">{headingText}</h1>
      <label htmlFor="name" className="mt-4 py-1 font-bold">
        Nombre
      </label>
      <Input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor="maximum-capacity" className="mt-4 py-1 font-bold">
        Capacidad máxima
      </label>
      <Input
        id="maximum-capacity"
        value={maximumCapacity}
        onChange={(event) => {
          if (isNumberInput(event.target.value))
            setMaximumCapacity(event.target.value);
        }}
        className="[appearance:textfield]"
      />
      <label htmlFor="occupancy-percent" className="mt-4 py-1 font-bold">
        Ocupación
      </label>
      <div className="flex relative">
        <Input
          id="occupancy-percent"
          value={occupancyPercent}
          onChange={(event) => {
            if (isValidPercentInput(event.target.value))
              setOccupancyPercent(event.target.value);
          }}
          className="[appearance:textfield] w-full pr-8 bg-white"
        />
        <span className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none">
          %
        </span>
      </div>
      <div className="mt-8 flex justify-between">
        <Button onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}
