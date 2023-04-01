import { fireEvent, render, screen } from "@/core/test/test-utils";
import { describe, expect, it, vi } from "vitest";
import { RoomForm } from "../RoomForm";

describe("RoomForm", () => {
  it("Should render a form with a heading, room fields, and save and cancel buttons.", () => {
    render(
      <RoomForm
        headingText="Test Heading"
        onSave={() => {}}
        onCancel={() => {}}
      />
    );

    screen.getByRole("heading", { name: "Test Heading" });
    screen.getByLabelText("Nombre");
    screen.getByLabelText("Capacidad máxima");
    screen.getByLabelText("Ocupación");
    screen.getByRole("button", { name: "Cancelar" });
    screen.getByRole("button", { name: "Guardar" });
  });

  it("Should render form input fields with initial values", () => {
    render(
      <RoomForm
        headingText="Test Heading"
        initialValues={{
          name: "Initial Name",
          maximumCapacity: 50,
          occupancyPercent: 75,
        }}
        onSave={() => {}}
        onCancel={() => {}}
      />
    );

    screen.getByDisplayValue("Initial Name");
    screen.getByDisplayValue("50");
    screen.getByDisplayValue("75");
  });

  it("Should call onSave callback with room data on save button click", async () => {
    const onSaveMock = vi.fn();

    render(
      <RoomForm
        headingText="Test Heading"
        onSave={onSaveMock}
        onCancel={() => {}}
      />
    );

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "New Name" },
    });
    fireEvent.change(screen.getByLabelText("Capacidad máxima"), {
      target: { value: "50" },
    });
    fireEvent.change(screen.getByLabelText("Ocupación"), {
      target: { value: "20" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Guardar" }));

    expect(onSaveMock).toBeCalledWith({
      name: "New Name",
      maximumCapacity: 50,
      occupancyPercent: 20,
    });
  });

  it("Should call onCancel callback when cancel button is clicked", () => {
    const onCancelMock = vi.fn();

    render(
      <RoomForm
        headingText="Test Heading"
        onSave={() => {}}
        onCancel={onCancelMock}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(onCancelMock).toBeCalled();
  });
});
