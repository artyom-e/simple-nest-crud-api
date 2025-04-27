import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, User } from '@prisma/client';
import { TaskListsService } from '../task-lists/task-lists.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly taskListsService: TaskListsService
  ) {
  }

  async create(user: User, taskListId: number, createTaskDto: CreateTaskDto): Promise<Task> {
    const taskList = await this.taskListsService.findOne(user, taskListId);
    const {title, description} = createTaskDto;

    return this.prisma.task.create({
      data: {
        title,
        description: description ?? null,
        taskList: {
          connect: { id: taskList.id }
        }
      },
    });
  }

  async findAll(user: User, taskListId: number): Promise<Task[]> {
    const taskList = await this.taskListsService.findOne(user, taskListId);

    return this.prisma.task.findMany({
      where: { taskListId: taskList.id }
    });
  }

  async findOne(user: User, taskListId: number, id: number): Promise<Task> {
    const taskList = await this.taskListsService.findOne(user, taskListId);
    const task = await this.prisma.task.findUnique({
      where: { id, taskListId: taskList.id }
    })
    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return task;
  }

  async update(user: User, taskListId: number, id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(user, taskListId, id);

    return this.prisma.task.update({
      where: { id: task.id },
      data: updateTaskDto,
    });
  }

  async remove(user: User, taskListId: number, id: number): Promise<void> {
    const task = await this.findOne(user, taskListId, id);

    await this.prisma.task.delete({
      where: { id: task.id }
    });
  }
}
