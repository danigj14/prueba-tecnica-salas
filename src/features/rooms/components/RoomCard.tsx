import { Button, Input } from "@/core/components";

export function RoomCard() {
  return (
    <div className="p-4 flex flex-col bg-blue-light rounded-[26px]">
      <h1 className="text-xl font-bold">Sala planta 1</h1>
      <label className="mt-4 py-1 font-bold">Capacidad máxima</label>
      <Input type="number" value="30" className="[appearance:textfield]" />
      <label className="mt-4 py-1 font-bold">Ocupación</label>
      <div className="flex relative">
        <Input
          type="number"
          value="40"
          className="[appearance:textfield] w-full pr-8"
        />
        <span className="absolute top-1/2 -translate-y-1/2 right-4">%</span>
      </div>
      <Button className="mt-5 self-end">Modificar</Button>
    </div>
  );
}
