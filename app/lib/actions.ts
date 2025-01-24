'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function setCompleteTask(id: string): Promise<{ success: boolean; message: string }> {
    try {
        if(!id){
            throw new Error('Task ID is required');
        }
        await prisma.task.update({
            where: { 
                id: id,
            },
            data: { status: 'COMPLETED' },
        });
        return { success: true, message: 'Task completed successfully' };
    } catch (error) {
        console.error("Error completing task: ", error);
        return { success: false, message: 'Error completing task' };
    }
}