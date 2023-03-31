import { Select } from "@/core/components";

export type FilterType = "gt" | "lt" | "eq";

interface FilterTypeSelect {
  onChange: (filterType: FilterType) => void;
}

export function FilterTypeSelect({ onChange }: FilterTypeSelect) {
  return (
    <Select
      className="text-sm border-0"
      onChange={(event) => onChange(event.target.value as FilterType)}
    >
      <option value="gt">Mayor</option>
      <option value="lt">Menor</option>
      <option value="eq">Igual</option>
    </Select>
  );
}
