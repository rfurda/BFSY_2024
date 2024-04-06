import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeItem, updateItem } from "../../slices/itemSlice";
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
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Switch } from "../../components/ui/switch";
import { Button } from "../../components/ui/button";
import { FilePenLine, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Item = ({ listId, item, refetch, isOwner }) => {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState({ name: item.name, quantity: item.quantity, resolved: item.resolved });

  useEffect(() => {
    setItemData({ name: item.name, quantity: item.quantity, resolved: item.resolved });
  }, [item]);

  const handleItemDataChange = e => setItemData({ ...itemData, [e.target.name]: e.target.value });

  const updateItemHandler = async e => {
    dispatch(updateItem({ id: item._id, data: itemData }));
    toast.success("Item updated");
  };

  const removeItemHandler = async e => {
    dispatch(removeItem(item._id));
    toast.success("Item removed");
  };

  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-1">
        <Checkbox checked={item.resolved} />
      </div>
      <div className="truncate col-span-4">{item.name}</div>
      <div className="truncate col-span-3">{item.quantity}</div>
      <div className="col-span-2 truncate grid place-items-center">
        <Dialog>
          <DialogTrigger asChild>
            <FilePenLine />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update item</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  className="col-span-3"
                  value={itemData.name}
                  onChange={handleItemDataChange}
                />
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
                  value={itemData.quantity}
                  onChange={handleItemDataChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="resolved" className="text-right">
                  Resolved
                </Label>
                <Switch
                  checked={itemData.resolved}
                  onCheckedChange={value => setItemData({ ...itemData, resolved: value })}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={updateItemHandler}>
                  Update item
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="col-span-2 truncate grid place-items-center">
        <Trash2 onClick={removeItemHandler} />
      </div>
    </div>
  );
};

export default Item;
