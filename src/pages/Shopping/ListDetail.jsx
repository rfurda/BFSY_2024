import React, { useEffect, useState } from "react";
import { addItemList, updateList, removeList, removeMemberList } from "../../slices/listSlice";
import { addItem } from "../../slices/itemSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "../../components/ui/dialog";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import Item from "./Item";
import isEmpty from "../../utils/isEmpty";
import UserList from "./UserList";
import { clsx } from "clsx/lite";

const ListDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [listData, setListData] = useState({ name: "", archived: false });

  const listId = parseInt(useParams().listId);
  const { userinfo } = useSelector(({ auth }) => auth);
  const { lists } = useSelector(({ lists }) => lists);
  const { users } = useSelector(({ users }) => users);
  const [unUsers, setUnUsers] = useState([]);
  const { items } = useSelector(({ items }) => items);

  useEffect(() => {
    if (isEmpty(listId) || isEmpty(lists) || isEmpty(users) || isEmpty(items) || isEmpty(userinfo)) return;
    const ct = lists.find(list => list._id === parseInt(listId));
    const owner = users.find(user => user._id === ct.owner);
    const it = items.filter(item => item.list === ct._id);
    const mb = users.filter(user => ct.members.includes(user._id));
    setData({ ...ct, owner, items: it, members: mb });
    setListData({ name: ct.name, archived: ct.archived });
    const un = users.filter(user => !ct.members.includes(user._id) && user._id !== userinfo._id);
    setUnUsers([...un]);
  }, [listId, lists, users, items, userinfo]);

  const [query, setQuery] = useState("all");
  const [newItem, setNewItem] = useState({ name: "", quantity: 0, resolved: false });

  const updateHandler = e => {
    dispatch(updateList({ id: listId, data: listData }));
    toast.success("Updated successfully");
  };

  const deleteHandler = e => {
    if (window.confirm("Do you want to remove this list?")) {
      dispatch(removeList(listId));
      toast.success("List deleted successfully");
      navigate("/");
    }
  };

  const handleNewItemChange = e => setNewItem({ ...newItem, [e.target.name]: e.target.value });
  const addItemHandler = e => {
    const { payload } = dispatch(addItem({ ...newItem, list: parseInt(listId) }));
    dispatch(addItemList({ listId, itemId: payload._id }));
    toast.success("Item added");
    setNewItem({ name: "", quantity: 0, resolved: false });
  };

  const leaveMemberHandler = async e => {
    dispatch(removeMemberList({ listId, memberId: userinfo._id }));
    toast.success("Member removed");
    navigate("/");
  };

  return !isEmpty(data) ? (
    <div className="">
      <div className="flex flex-row space-x-4 w-full justify-end items-center">
        <Select onValueChange={value => setQuery(value)}>
          <SelectTrigger className="rounded-full text-center">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Show all</SelectItem>
            <SelectItem value="false">Active</SelectItem>
            <SelectItem value="true">Resolved</SelectItem>
          </SelectContent>
        </Select>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-full">
              Add new item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new item</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" name="name" className="col-span-3" onChange={handleNewItemChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="col-span-3"
                  onChange={handleNewItemChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="resolved" className="text-right">
                  Resolved
                </Label>
                <Switch onCheckedChange={value => setNewItem({ ...newItem, resolved: value })} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={addItemHandler}>
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {userinfo._id === data.owner._id && (
          <Button variant="outline" size="sm" className="rounded-full" onClick={updateHandler}>
            Update
          </Button>
        )}

        {userinfo._id === data.owner._id ? (
          <Button variant="outline" size="sm" className="rounded-full" onClick={deleteHandler}>
            Delete
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="rounded-full" onClick={leaveMemberHandler}>
            Leave
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mt-4">
        <div className="grid grid-cols-3 gap-2 [&>div]:space-y-2 items-center h-min">
          <div className="col-span-1 font-semibold">
            <div>Name</div>
          </div>
          <div className="col-span-2">
            <Input
              defaultValue={listData.name}
              disabled={userinfo._id !== data.owner._id}
              onChange={e => setListData({ ...listData, name: e.target.value })}
            />
          </div>

          <div className="col-span-1 font-semibold">
            <div>Owner</div>
          </div>
          <div className="col-span-2">
            <div>{data.owner.username}</div>
          </div>

          <div className="col-span-1 font-semibold">
            <div>Archived</div>
          </div>
          <div className="col-span-2">
            <Switch
              checked={listData.archived}
              onCheckedChange={v => setListData({ ...listData, archived: v })}
              disabled={userinfo._id !== data.owner._id}
            />
          </div>

          <div className="col-span-1 font-semibold">
            <div>Created</div>
          </div>
          <div className="col-span-2">{data.created_at.slice(0, 10)}</div>
          {data.items.length > 0 ? (
            <div className="col-span-full">
              <div className="font-bold text-xl p-2 shadow-sm">Items</div>
              <div className="space-y-2 max-h-96 overflow-auto">
                {data.items.map(item =>
                  query === "all" ? (
                    <Item key={item._id} listId={listId} item={item} isOwner={data.owner._id === userinfo._id} />
                  ) : query === "true" ? (
                    item.resolved && (
                      <Item key={item._id} listId={listId} item={item} isOwner={data.owner._id === userinfo._id} />
                    )
                  ) : (
                    !item.resolved && (
                      <Item key={item._id} listId={listId} item={item} isOwner={data.owner._id === userinfo._id} />
                    )
                  )
                )}
              </div>
            </div>
          ) : (
            <div className="col-span-full text-center py-8 text-xl font-bold text-sky-500">There is no item</div>
          )}
        </div>

        <div
          className={clsx(
            "grid",
            userinfo._id === data.owner._id ? "grid-cols-2 sm:grid-cols-1 sm:space-y-8" : "grid-cols-1"
          )}
        >
          <div className="space-y-4">
            <div className="font-bold text-xl p-2 shadow-sm">Members</div>
            {data.members.length > 0 ? (
              <div className="space-y-2 max-h-60 px-2 overflow-auto">
                {data.members.map(user => (
                  <UserList
                    key={user._id}
                    listId={listId}
                    user={user}
                    isOwner={data.owner._id === userinfo._id}
                    type="member"
                  />
                ))}
              </div>
            ) : (
              <div className="col-span-full text-center py-8 text-xl font-bold text-sky-500">There is no members</div>
            )}
          </div>

          {userinfo._id === data.owner._id && (
            <div className="space-y-4">
              <div className="font-bold text-xl py-2 shadow-sm">Users</div>
              {users?.length > 0 ? (
                <div className="space-y-2 max-h-60 px-2 overflow-auto">
                  {unUsers.map(user => {
                    return (
                      <UserList
                        key={user._id}
                        listId={listId}
                        user={user}
                        isOwner={data.owner._id === userinfo._id}
                        type="users"
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="col-span-full text-center py-8 text-xl font-bold text-sky-500">There is no users</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center py-8 text-xl font-bold text-sky-500">There is no data</div>
  );
};

export default ListDetail;
