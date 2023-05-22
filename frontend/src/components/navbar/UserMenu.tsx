import { GoChevronDown } from "react-icons/go";

import Avatar from "./Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsopen] = useState(false);
  const auth = useAppSelector((state) => state.auth);

  const toggleOpen = useCallback(() => {
    setIsopen((value) => !value);
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="relative">
      <div
        className="flex flex-row items-center gap-1 cursor-pointer
        "
        onClick={toggleOpen}
      >
        <div
          className="
              border-[2px]
            border-neutral-400
              flex
              flex-row
              items-center
              gap-3
              rounded-full
              hover:shadow-md
              transition
            "
        >
          <Avatar />
        </div>
        <div
          onClick={() => {}}
          className="
              hidden
              md:block
              text-sm
              font-semibold
              transition
              "
        >
          {auth?.user?.name}
        </div>
        <GoChevronDown />
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-md
            shadow-md
            bg-white
            w-40
            overflow-hidden
            right-0
            top-14
            md:top-12
            text-sm
            "
        >
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={() => {}} label="Settings" />

              <MenuItem onClick={handleLogout} label="Logout" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
