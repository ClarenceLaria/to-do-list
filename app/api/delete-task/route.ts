import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request){
    try{
        const {id} = await req.json();
        
        const task = await prisma.task.delete({
            where: {
                id,
            },
        });
        return new Response(
            JSON.stringify({message: "Task Deleted", task}),
            {status: 200}
        );
    }catch(error){
        console.log("Error Deleting Task: ", error);
        return new Response(
            JSON.stringify(JSON.stringify({message: "An Error Occured"})),
            {status: 500}
        );
    }
}