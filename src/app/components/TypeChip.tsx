import { Chip } from "@nextui-org/react";

interface TypeChipProps {
  id: number;
  name: string;
}

const TypeChip = ({ name, id }: TypeChipProps) => {
  // Explicitly typing the variable to match the Chip color prop types
  let chipColor:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined = "default";

  switch (name.toLowerCase()) {
    case "manhwa":
      chipColor = "danger";
      break;
    case "manga":
      chipColor = "secondary";
      break;
    case "manhua":
      chipColor = "success";
      break;
    default:
      chipColor = "default"; // Default case if none of the conditions match
      break;
  }

  return (
    <Chip
      key={id}
      color={chipColor}
      size="sm"
      className="absolute top-1 right-1 z-10"
    >
      {name}
    </Chip>
  );
};

export default TypeChip;
