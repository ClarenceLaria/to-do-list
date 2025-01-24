'use client'
import React, { useEffect, useState } from 'react'
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

    useEffect(() => {
        const handleTasks = async () => {
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
        };
        handleTasks();
    },[]);
  return (
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
                <TableHead>Created On</TableHead>
                <TableHead>Completed by</TableHead>
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
  )
}
