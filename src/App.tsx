import Select from "./core/components/Select";
import FloorPanel from "./features/rooms/components/FloorPanel";

export default function App() {
  return (
    <div className="text-blue-dark container xl:max-w-screen-xl mx-auto p-4">
      <h1 className="mb-5 text-3xl font-bold">Salas</h1>
      <Select className="mb-5">
        <option>Planta 1</option>
        <option>Planta 2</option>
        <option>Planta 3</option>
        <option>Planta 4</option>
      </Select>
      <div className="pt-5 border-t-2 border-blue-light"></div>
      <FloorPanel />
    </div>
  );
}
