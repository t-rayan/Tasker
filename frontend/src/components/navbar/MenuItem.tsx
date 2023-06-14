interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
      px-4
      py-3
      text-neutral-600
      hover:bg-neutral-100
      transition
      font-noral
      "
    >
      {label}
    </div>
  );
};

export default MenuItem;
