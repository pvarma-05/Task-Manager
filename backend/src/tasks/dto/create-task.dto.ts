import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { TaskStatus } from "../schemas/task.schema"


export class createTaskDto{

    @IsString()
    @IsNotEmpty()
    readonly title:string
    
    @IsString()
    @IsNotEmpty()
    readonly description:string

    @IsEnum(TaskStatus)
    @IsOptional()
    readonly status:TaskStatus
}