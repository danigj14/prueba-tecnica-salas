import { Input } from "@/core/components";
import { isNumberInput, isValidPercentInput } from "@/core/util/util";
import { useState } from "react";
import { Room } from "../types";
import { FilterType, FilterTypeSelect } from "./FilterTypeSelect";

interface FilterSettings {
  maximumCapacity: string;
  maximumCapacityType: FilterType;
  occupancyPercent: string;
  occupancyPercentType: FilterType;
}

export type RoomFilterFn = (rooms: Room[]) => Room[];

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

const createFilterFn = (filterSettings: FilterSettings) => (rooms: Room[]) => {
  const maximumCapacityFilterTest = filterSettings.maximumCapacity
    ? createFilterTest(
        filterSettings.maximumCapacityType,
        Number.parseInt(filterSettings.maximumCapacity)
      )
    : () => true;

  const occupancyPercentFilterTest = filterSettings.occupancyPercent
    ? createFilterTest(
        filterSettings.occupancyPercentType,
        Number.parseInt(filterSettings.occupancyPercent)
      )
    : () => true;

  return rooms.filter(
    (room) =>
      maximumCapacityFilterTest(room.maximumCapacity) &&
      occupancyPercentFilterTest(room.occupancyPercent)
  );
};

interface FilterControlsProps {
  onFilterChange: (filterFn: RoomFilterFn) => void;
}

export function FilterControls({ onFilterChange }: FilterControlsProps) {
  const [filterSettings, setFilterSettings] = useState<FilterSettings>({
    maximumCapacity: "",
    maximumCapacityType: "gt",
    occupancyPercent: "",
    occupancyPercentType: "gt",
  });

  const changeFilterSettings = (newFilterSettings: FilterSettings) => {
    setFilterSettings(newFilterSettings);
    onFilterChange(createFilterFn(newFilterSettings));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
      <span className="font-bold">Filtros:</span>
      <div className="border border-blue-dark rounded-[12px] w-full md:w-fit">
        <FilterTypeSelect
          onChange={(type) =>
            changeFilterSettings({
              ...filterSettings,
              maximumCapacityType: type,
            })
          }
        />
        <Input
          value={filterSettings.maximumCapacity}
          onChange={(event) => {
            if (isNumberInput(event.target.value)) {
              changeFilterSettings({
                ...filterSettings,
                maximumCapacity: event.target.value,
              });
            }
          }}
          className="text-sm border-0 px-0 outline-none"
          placeholder="Capacidad Máxima"
        />
      </div>
      <div className="border border-blue-dark rounded-[12px] w-full md:w-fit">
        <FilterTypeSelect
          onChange={(type) =>
            changeFilterSettings({
              ...filterSettings,
              occupancyPercentType: type,
            })
          }
        />
        <Input
          value={filterSettings.occupancyPercent}
          onChange={(event) => {
            if (isValidPercentInput(event.target.value)) {
              changeFilterSettings({
                ...filterSettings,
                occupancyPercent: event.target.value,
              });
            }
          }}
          className="text-sm border-0 px-0 outline-none"
          placeholder="% Ocupación"
        />
      </div>
    </div>
  );
}
