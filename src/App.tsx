import Button from "./core/components/Button";
import Input from "./core/components/Input";
import Select from "./core/components/Select";

export default function App() {
  return (
    <div>
      <h1 className="text-3xl">Hello World!</h1>
      <Button>Button</Button>
      <Input placeholder="Input Element"/>
      <Select>
        <option>Option 1</option>
        <option>Option 2</option>
      </Select>
    </div>
  );
}