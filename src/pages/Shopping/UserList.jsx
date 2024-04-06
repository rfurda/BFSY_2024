import React from "react";
import { useDispatch } from "react-redux";
import { addMemberList, removeMemberList } from "../../slices/listSlice";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { clsx } from "clsx/lite";

const UserList = ({ user, listId, type, isOwner }) => {
  const dispatch = useDispatch();

  const addMemberHandler = e => {
    dispatch(addMemberList({ listId: listId, memberId: user._id }));
    toast.success("New member added successfully");
  };

  const removeMemberHandler = async e => {
    dispatch(removeMemberList({ listId: listId, memberId: user._id }));
    toast.success("New member removed successfully");
  };

  return (
    <div className="grid grid-cols-4 items-center">
      <div className={clsx("truncate", isOwner ? "col-span-3" : "col-span-full")}>{user.username}</div>
      {isOwner && (
        <div className="col-span-1 text-right">
          {type === "users" ? (
            <Button variant="outline" size="sm" className="w-full rounded-full h-8" onClick={addMemberHandler}>
              Add
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="w-full rounded-full h-8" onClick={removeMemberHandler}>
              Remove
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;
