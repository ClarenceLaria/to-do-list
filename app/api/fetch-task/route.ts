import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(){
    try{
        const tasks = await prisma.task.findMany();
        return new Response(
            JSON.stringify(tasks),
            {status:200}
        );
    }catch(error){
        console.error(error);
        return new Response(
            JSON.stringify(JSON.stringify({message: 'An error occured'})),
            {status:500}
        );
    }
}