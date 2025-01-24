'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/Components/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/Components/Table";
import { Badge } from "./Badge";
import { Status } from '@prisma/client';
import { Button } from './Button';
import { Check, Trash2,  } from 'lucide-react';
import { DeleteTaskDialog } from './delete-task-dialog';
import toast from 'react-hot-toast';
import { setCompleteTask } from '../lib/actions';

interface Task{
    id: string;
    title: string;
    description: string;
    status: Status;
    createdAt: Date;
    dueDate: Date;
    updatedAt: Date;
}
export default function TasksTable() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [id, setId] = useState('');
    const [openDelete, setOpenDelete] = useState(false);

    const handleOpenDelete = () => {
        setOpenDelete((prev) => !prev);
    };

    const handleTasks = useCallback(async () => {
        try{
            const response = await fetch('/api/fetch-task');
            const data = await response.json();

            const tasksWithDates = data.map((task: Task) => ({
                ...task,
                dueDate: new Date(task.dueDate),
                updatedAt: new Date(task.updatedAt),
              }));
            setTasks(tasksWithDates);
        }catch(error){
            console.error("Error fetching tasks: ",error);
        }
    },[]);
    useEffect(() => {
        handleTasks();
    },[handleTasks]);

    const handleCompleteTask = async () => {
        const result = await setCompleteTask(id)

        if(result.success){
            toast.success(result.message);
            await handleTasks();
        } else {
            toast.error(result.message); // Log or show a toast for error
        }
    }
  return (
    <>
    <Card>
        <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Your created tasks and their status</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated On</TableHead>
                <TableHead>Completed by</TableHead>
                <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.length > 0 ? 
                tasks.map((task) => (
                <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell className="font-medium">{task.description}</TableCell>
                    <TableCell>
                    <Badge
                        variant={task.status === Status.INCOMPLETE ? "destructive" : "success"}
                        >
                        {task.status}
                    </Badge>
                    </TableCell>
                    <TableCell>{task.updatedAt.toDateString()}</TableCell>
                    <TableCell>{task.dueDate.toDateString()}</TableCell>
                    <TableCell className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => {setId(task.id); handleCompleteTask()}}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => {setId(task.id); handleOpenDelete(); }}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">No Tasks found</TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </CardContent>
  </Card>
  <DeleteTaskDialog open={openDelete} id={id} />
  </>
  )
}
