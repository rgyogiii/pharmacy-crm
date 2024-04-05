import { useNavigate } from "react-router-dom";
import { Avatar, Button, DropdownMenu } from "@/components/ui";

import Settings from "~icons/lucide/settings";
import LogOut from "~icons/custom/shutdown";
import User from "~icons/custom/user-circle";
import { useAuth } from "@/hooks";

const { AvatarContainer, AvatarImage, AvatarFallback } = Avatar;
const {
  DropdownMenuContainer,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} = DropdownMenu;

const UserMenu = () => {
  const navigate = useNavigate();
  const { account, signout } = useAuth();

  return (
    <DropdownMenuContainer>
      <DropdownMenuTrigger asChild>
        <div className="ml-auto rounded-full group hover:outline outline-1 outline-offset-1 outline-secondary-500">
          <AvatarContainer className="group-hover:opacity-80">
            <AvatarImage
              src="https://api.dicebear.com/8.x/notionists/svg?backgroundType=gradientLinear&backgroundColor=8a2387,e94057,f27121&baseColor=f9c9b6&seed=Abby"
              alt="@avatar"
              draggable="false"
            />
            <AvatarFallback>A</AvatarFallback>
          </AvatarContainer>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-0.5">
            <div className="flex justify-end pb-3">
              <p className="rounded-md bg-secondary-500 text-xs font-bold tracking-wide text-primary-100 px-1.5 py-0.5 uppercase">
                {account.role}
              </p>
            </div>
            {account.username && (
              <p className="text-sm font-medium leading-4 truncate">
                {account.username}
              </p>
            )}
            <p className="text-xs leading-none text-primary-700">
              {account.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="font-medium"
          onClick={async () => await signout()}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuContainer>
  );
};

export default UserMenu;
