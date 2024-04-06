import React from "react";
import { Link } from "react-router-dom";
import { removeList, removeMemberList } from "../../slices/listSlice";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "../../components/ui/checkbox";
import { ScanEye, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ListView = ({ list }) => {
  const dispatch = useDispatch();
  const { users } = useSelector(({ users }) => users);
  const { userinfo } = useSelector(({ auth }) => auth);

  const deleteHandler = e => {
    e.stopPropagation();
    if (userinfo._id === list.owner) {
      dispatch(removeList(list._id));
      toast.success("List deleted successfully");
    } else {
      dispatch(removeMemberList({ listId: list._id, memberId: userinfo._id }));
      toast.success("Member removed");
    }
  };

  return (
    <div className="grid grid-cols-12 border gap-2 p-4 rounded-md items-center">
      <div className="col-span-1 text-center grid place-items-center">
        <Checkbox checked={list.archived} className="disabled:cursor-auto" />
      </div>
      <div className="col-span-3 truncate">{users.find(user => user._id === list.owner)?.username}</div>
      <div className="col-span-4 truncate">{list.name}</div>
      <Link to={`/${list._id}`} className="col-span-2 grid place-items-center py-1 rounded-sm border">
        <ScanEye />
      </Link>
      <div
        className="col-span-2 grid place-items-center py-1 rounded-sm border hover:cursor-pointer"
        onClick={deleteHandler}
      >
        <Trash2 />
      </div>
    </div>
  );
};

export default ListView;
