import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { type TaskList, type User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskListsService {
  constructor(private prisma: PrismaService) {
  }

  async create(user: User, createTaskListDto: CreateTaskListDto): Promise<TaskList> {
    const {title, description} = createTaskListDto;

    return this.prisma.taskList.create({
      data: {
        title,
        description: description ?? null,
        user: {
          connect: { id: user.id }
        }
      },
    });
  }

  findAll(user: User): Promise<TaskList[]> {
    return this.prisma.taskList.findMany({
      where: { userId: user.id }
    });
  }

  async findOne(user: User, id: number): Promise<TaskList> {
    const taskList = await this.prisma.taskList.findUnique({
      where: { id, userId: user.id }
    });
    if (!taskList) {
      throw new NotFoundException('Task list not found.');
    }

    return taskList;
  }

  async update(user: User, id: number, updateTaskListDto: UpdateTaskListDto): Promise<TaskList> {
    const taskList = await this.findOne(user, id);

    return this.prisma.taskList.update({
      where: { id: taskList.id },
      data: updateTaskListDto,
    })
  }

  async remove(user: User, id: number): Promise<void> {
    const taskList = await this.findOne(user, id);

    await this.prisma.taskList.delete({
      where: { id: taskList.id }
    });
  }
}
