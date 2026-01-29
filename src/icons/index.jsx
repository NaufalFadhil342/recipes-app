import { Icon } from "@iconify/react";

export const Icons = ({ iconsName, className, onClick }) => {
  return <Icon icon={iconsName} className={className} onClick={onClick} />;
};
