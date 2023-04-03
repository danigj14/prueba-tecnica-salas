import { fireEvent, render, screen } from "@/core/test/test-utils";
import { describe, it } from "vitest";
import { Room } from "../../types";
import { RoomCard } from "../RoomCard";

const roomMock: Room = {
  id: 1,
  name: "Test Room",
  floor: 1,
  maximumCapacity: 25,
  occupancyPercent: 50,
};

describe("Room Card", () => {
  it("Should render room name, maximum capacity and occupancy percent", () => {
    render(<RoomCard room={roomMock} />);

    screen.getByRole("heading", { name: "Test Room" });
    screen.getByText("Capacidad máxima");
    screen.getByText("25");
    screen.getByText("Ocupación");
    screen.getByText("50");
  });

  it("Should render a modify button and open an edit form when clicked", () => {
    render(<RoomCard room={roomMock} />);

    const modifyButton = screen.getByRole("button", { name: "Modificar" });

    fireEvent.click(modifyButton);

    screen.getByRole("heading", { name: "Editar Sala" });
  });
});
