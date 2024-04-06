import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../slices/authSlice";
import Theme from "./Theme";
import { Button } from "../components/ui/button";
import { LogOut } from "lucide-react";
import isEmpty from "../utils/isEmpty";
import { toast } from "sonner";
import { Languages } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const { userinfo } = useSelector(({ auth }) => auth);

  const logoutHandler = async e => {
    e.preventDefault();
    dispatch(logout());
    toast.success("Logged out");
  };

  return (
    <div className="border-b-2 shadow-md">
      <header className="container py-3">
        <div className=" flex flex-row justify-between items-center space-x-4">
          <div className="max-mx:hidden text-xl font-bold flex-grow space-x-4">
            <Link to="/">{userinfo?.username || "Shopping List"}</Link>
          </div>
          <Button variant="outline" size="sm">
            <Languages />
          </Button>
          <div>
            <Theme />
          </div>
          <div className="space-x-4">
            {isEmpty(userinfo) ? (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
            ) : (
              <Button variant="outline" onClick={logoutHandler} size="sm" className="">
                <LogOut />
              </Button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
