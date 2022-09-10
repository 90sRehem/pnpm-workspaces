import { IconType } from "react-icons";

export interface INavItemProps {
  icon: IconType;
  title: string;
  description?: string;
  url: string;
  navSize?: string;
  active?: boolean;
}

export interface INavHoverProps {
  title: string;
  icon: IconType;
  description: string;
}

export interface INavItems {
  items: INavItemProps[];
}
