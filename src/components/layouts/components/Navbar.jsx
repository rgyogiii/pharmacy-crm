import { useNavigate, useLocation } from "react-router-dom";

import { Avatar, Button } from "@/components/ui";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks";

const { AvatarContainer, AvatarImage, AvatarFallback } = Avatar;

const menus = [
  { name: "POS", link: "/pos", logo: "/assets/illustrations/payment.png", lock: false },
  { name: "Inventory", link: "/inventory", logo: "/assets/illustrations/stocks.png", lock: false },
  // { name: "Sales", link: "/sales", logo: "/assets/illustrations/charts.png", lock: false },
  // { name: "Receipt", link: "/receipt", logo: "/assets/illustrations/receipt.png", lock: false },
  { name: "User Management", link: "/user-management", logo: "/assets/illustrations/users.png", lock: false },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { permissions } = useAuth();

  console.log({ permissions });
  // console.log({ ff:permissions.includes menus[0].link.substring(1) });
  return (
    <nav className="p-2 fixed z-10 inset-x-0 border-b border-none bg-clip-padding backdrop-filter backdrop-blur-md bg-transparent bg-opacity-60">
      <div className="flex items-center gap-3">
        <div className=" flex items-center">
          <Button variant="icon" size="sm" className="p-0" onClick={() => navigate("/")}>
            <AvatarContainer className="h-10 w-auto hover:outline outline-1 outline-offset-1 outline-secondary-500">
              <AvatarImage src="/assets/logo.ico" alt="@logo" draggable="false" />
              <AvatarFallback>A</AvatarFallback>
            </AvatarContainer>
          </Button>
          {location.pathname !== "/dashboard" && (
            <div className="ml-3">
              {menus
                .filter((menu) => permissions?.includes(menu.link.substring(1)))
                .map((menu, i) => (
                  <Button
                    key={i}
                    variant="link"
                    size="sm"
                    className={cn(
                      "hover:no-underline hover:text-secondary-500 text-neutral-700 text-sm uppercase",
                      location.pathname.split("/")[1] === menu.link.substring(1) && "text-secondary-500 cursor-default"
                    )}
                    onClick={() => navigate(menu.link)}
                    disabled={location.pathname.split("/")[1] === menu.link.substring(1)}
                  >
                    {menu.name}
                  </Button>
                ))}
            </div>
          )}
        </div>
        {/* <Search /> */}
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
