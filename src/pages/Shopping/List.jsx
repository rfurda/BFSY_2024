import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addList } from "../../slices/listSlice";
import ListView from "./ListView";
import { Button } from "../../components/ui/button";
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
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { toast } from "sonner";

const List = () => {
  const dispatch = useDispatch();
  const { lists } = useSelector(({ lists }) => lists);
  const { userinfo } = useSelector(({ auth }) => auth);
  const [newData, setNewData] = useState({ name: "", archived: false, owner: userinfo._id });

  const handleNewDataChange = e => setNewData({ ...newData, [e.target.name]: e.target.value });

  const handleCreate = e => {
    dispatch(addList(newData));
    toast.success("New list added successfully");
    setNewData({ name: "", archived: false, owner: userinfo._id });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 justify-around items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-full">
              Create
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new list</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" name="name" className="col-span-3" onChange={handleNewDataChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="archived" className="text-right">
                  Archived
                </Label>
                <Switch onCheckedChange={value => setNewData({ ...newData, archived: value })} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={handleCreate}>
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Select>
          <SelectTrigger className="rounded-full text-center w-full">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Show all</SelectItem>
            <SelectItem value="true">Archived</SelectItem>
            <SelectItem value="false">Active</SelectItem>
          </SelectContent>
        </Select>

        <Input type="search" placeholder="Search by name..." className="w-full rounded-full" />
      </div>

      {lists?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md">
          {lists.map(
            list =>
              (list?.members.includes(userinfo._id) || list.owner === userinfo._id) && (
                <ListView key={list._id} list={list} />
              )
          )}
        </div>
      ) : (
        <div className="py-4 text-center">There is no list</div>
      )}
    </div>
  );
};

export default List;
