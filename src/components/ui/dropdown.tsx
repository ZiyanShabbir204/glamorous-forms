import { 
  Dropdown as HeroDropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  DropdownSection,
  type DropdownProps as HeroDropdownProps 
} from "@heroui/react";
import { cn } from "@/lib/utils";

export interface DropdownProps extends HeroDropdownProps {}

function Dropdown(props: DropdownProps) {
  return <HeroDropdown {...props} />;
}

export { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection };
