import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui";

import BackspaceIcon from "~icons/custom/backspace";

const Header = ({ title = "", goBackTo = "/", actionButton }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          className="w-auto px-2 hover:bg-secondary-500 hover:text-primary-50 border-none"
          onClick={() => navigate(goBackTo)}
        >
          <BackspaceIcon className="h-6 w-auto" />
        </Button>
        <h1 className="text-lg font-bold tracking-wide">{title}</h1>
      </div>
      {actionButton}
    </div>
  );
};

export default Header;
