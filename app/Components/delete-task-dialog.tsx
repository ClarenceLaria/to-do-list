"use client";

import { Button } from "@/app/Components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/Components/dialog";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface DeleteSchoolDialogProps {
  open: boolean;
  id: string;
}

export function DeleteTaskDialog({ open, id}: DeleteSchoolDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setIsOpen(true);
    }
  }, [open]);

  const handleDelete = async () => {
    try{
      toast.loading('Sending Request...');
      const response = await fetch('/api/delete-task', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            id,
          }
        ),
      });

      toast.dismiss();

      if(response.ok && response.status === 200){
        const data = await response.json();
        toast.success(data.message);
      }else if (response.status === 400){
        const errorData = await response.json();
        toast.error(errorData.error);
      } else {
        toast.error('Failed to delete school');
      }
      
    }catch(error){
      console.error('Error Deleting school: ',error);
      toast.error('An error occurred while deleting school');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            Delete a task completely
          </DialogDescription>
        </DialogHeader>
            <DialogFooter>
              <Button type="submit" className="bg-destructive items-center" onClick={() => handleDelete()}>Delete Task</Button>
            </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}