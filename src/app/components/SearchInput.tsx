import { Button, Input } from "@nextui-org/react";
import { IoMdSearch } from "react-icons/io";

const SearchInput = () => {
  return (
    <Input
      type="text"
      aria-label="Search"
      placeholder="Search manga..."
      size="md"
      endContent={
        <Button isIconOnly variant="light" className="p-0 border-none">
          <IoMdSearch />
        </Button>
      }
    />
  );
};

export default SearchInput;
