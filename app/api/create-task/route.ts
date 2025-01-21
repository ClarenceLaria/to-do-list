import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:Request){
    try{
        const body = await req.json();
        const {title,description,date} = body;

        if (!title || !description || !date){
            return NextResponse.json({ error: 'Please fill all the fields' }, { status: 400 });
        };
        const task = await prisma.task.create({
            data:{
                title,
                description,
                dueDate: date,
            }
        })
        return new Response(
            JSON.stringify(task),
            {status:201}
        )
    }catch(error){
        console.error("Error Creating A Task: ", error)
        return new Response(
            JSON.stringify(JSON.stringify({message:'An error occurred'})),
            {status:500}
        )
    }
}