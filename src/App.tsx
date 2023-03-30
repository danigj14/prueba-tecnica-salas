import { useState } from "react";
import { Select } from "./core/components";
import { FloorPanel } from "./features/rooms";

export default function App() {
  const [selectedFloor, setSelectedFloor] = useState(1);

  return (
    <div className="text-blue-dark container xl:max-w-screen-xl mx-auto p-4">
      <h1 className="mb-5 text-3xl font-bold">Salas</h1>
      <Select
        className="mb-5"
        onChange={(event) =>
          setSelectedFloor(Number.parseInt(event.target.value))
        }
      >
        <option value="1">Planta 1</option>
        <option value="2">Planta 2</option>
        <option value="3">Planta 3</option>
        <option value="4">Planta 4</option>
      </Select>
      <div className="pt-5 border-t-2 border-blue-light"></div>
      <FloorPanel floor={selectedFloor} />
    </div>
  );
}
