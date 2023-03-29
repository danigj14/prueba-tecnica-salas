import Button from "@/core/components/Button";
import Input from "@/core/components/Input";

export default function RoomCard() {
  return (
    <div className="p-4 flex flex-col bg-blue-light rounded-[26px]">
      <h1 className="text-xl font-bold">Sala planta 1</h1>
      <label className="mt-4 py-1 font-bold">Capacidad máxima</label>
      <Input type="number" value="30" />
      <label className="mt-4 py-1 font-bold">Ocupación</label>
      <Input type="number" value="40" />
      <Button className="mt-4 self-end">Modificar</Button>
    </div>
  );
}
