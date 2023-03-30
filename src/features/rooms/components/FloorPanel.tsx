import { Button, Input, Modal, Select } from "@/core/components";
import { isNumberInput } from "@/core/util/util";
import { faSpinner, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useCreateRoomMutation } from "../hooks";
import { useFloorRooms } from "../hooks/useFloorRooms";
import { Room } from "../types";
import { RoomCard } from "./RoomCard";
import { RoomForm } from "./RoomForm";

type FilterType = "gt" | "lt" | "eq";

const createFilterTest = (
  filterType: FilterType,
  number: number
): ((x: number) => boolean) => {
  switch (filterType) {
    case "gt":
      return (x: number) => x > number;
    case "lt":
      return (x: number) => x < number;
    case "eq":
      return (x: number) => x === number;
  }
};

interface FloorPanelProps {
  floor: Room["floor"];
}

export function FloorPanel({ floor }: FloorPanelProps) {
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const [maximumCapacityFilter, setMaximumCapacityFilter] = useState("");
  const [maximumCapacityFilterType, setMaximumCapacityFilterType] =
    useState<FilterType>("gt");
  const [occupancyPercentFilter, setOccupancyPercentFilter] = useState("");
  const [occupancyPercentFilterType, setOccupancyPercentFilterType] =
    useState<FilterType>("gt");

  const {
    data,
    isSuccess,
    isError,
    isLoading: roomsLoading,
  } = useFloorRooms(floor);
  const { mutate, isLoading: creationLoading } = useCreateRoomMutation();

  const filterRooms = (rooms: Room[]) => {
    const maximumCapacityFilterTest = maximumCapacityFilter
      ? createFilterTest(
          maximumCapacityFilterType,
          Number.parseInt(maximumCapacityFilter)
        )
      : () => true;

    const occupancyPercentFilterTest = occupancyPercentFilter
      ? createFilterTest(
          occupancyPercentFilterType,
          Number.parseInt(occupancyPercentFilter)
        )
      : () => true;

    return rooms.filter(
      (room) =>
        maximumCapacityFilterTest(room.maximumCapacity) &&
        occupancyPercentFilterTest(room.occupancyPercent)
    );
  };

  return (
    <div className="p-4 border border-blue-dark rounded-[26px]">
      {roomsLoading && (
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
            <Button onClick={() => setIsCreatingRoom(true)}>Añadir sala</Button>
          </div>
          <div className="mt-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
            <span className="font-bold">Filtros:</span>
            <div className="border border-blue-dark rounded-[12px] w-full md:w-fit">
              <Select
                className="text-sm border-0"
                onChange={(event) =>
                  setMaximumCapacityFilterType(event.target.value as FilterType)
                }
              >
                <option value="gt">Mayor</option>
                <option value="lt">Menor</option>
                <option value="eq">Igual</option>
              </Select>
              <Input
                value={maximumCapacityFilter}
                onChange={(event) => {
                  if (isNumberInput(event.target.value))
                    setMaximumCapacityFilter(event.target.value);
                }}
                className="text-sm border-0 px-0 outline-none"
                placeholder="Capacidad Máxima"
              />
            </div>
            <div className="border border-blue-dark rounded-[12px] w-full md:w-fit">
              <Select
                className="text-sm border-0"
                onChange={(event) =>
                  setOccupancyPercentFilterType(
                    event.target.value as FilterType
                  )
                }
              >
                <option value="gt">Mayor</option>
                <option value="lt">Menor</option>
                <option value="eq">Igual</option>
              </Select>
              <Input
                value={occupancyPercentFilter}
                onChange={(event) => {
                  if (isNumberInput(event.target.value))
                    setOccupancyPercentFilter(event.target.value);
                }}
                className="text-sm border-0 px-0 outline-none"
                placeholder="% Ocupación"
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filterRooms(data).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
          {isCreatingRoom && (
            <Modal>
              {creationLoading ? (
                <div className="p-32 bg-white rounded-[26px] text-3xl">
                  <FontAwesomeIcon icon={faSpinner} spin />
                </div>
              ) : (
                <RoomForm
                  headingText="Crear Sala"
                  onCancel={() => setIsCreatingRoom(false)}
                  onSave={(data) =>
                    mutate(
                      { floor, ...data },
                      { onSettled: () => setIsCreatingRoom(false) }
                    )
                  }
                />
              )}
            </Modal>
          )}
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
