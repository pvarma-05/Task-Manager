import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum TaskStatus {
    PENDING = "pending",
    PROGRESS = "in-progress",
    COMPLETED = "completed",
} 

@Schema({ timestamps: true })
export class Task extends Document {  // ✅ Extend Document
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;
    
    @Prop({ required: true, enum: TaskStatus, default: TaskStatus.PENDING })
    status: TaskStatus;
}

export const taskSchema = SchemaFactory.createForClass(Task);
