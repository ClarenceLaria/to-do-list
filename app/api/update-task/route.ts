import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    if (req.method === "PUT") {
        try {
            const url = new URL(req.url); 
            const id = url.searchParams.get("taskId");

            if (!id) {
                return NextResponse.json(
                    { error: "Task ID is missing in query parameters" },
                    { status: 400 }
                );
            }

            const body = await req.json();
            const { title, description, date } = body;

            if (!title || !description || !date) {
                return NextResponse.json(
                    { error: "Please fill all the fields" },
                    { status: 400 }
                );
            }

            const updatedTask = await prisma.task.update({
                where: { id },
                data: {
                    title,
                    description,
                    dueDate: new Date(date), // Ensures the date is correctly parsed
                    status: "INCOMPLETE",
                },
            });

            return NextResponse.json(updatedTask, { status: 200 });
        } catch (error) {
            console.error("Error Updating Task: ", error);
            return NextResponse.json(
                { message: "An Error Occurred" },
                { status: 500 }
            );
        }
    } else {
        return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }
}
