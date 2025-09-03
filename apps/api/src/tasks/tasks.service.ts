import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Task, TaskDocument, TaskStatus } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(userId: string, dto: CreateTaskDto) {
    const doc = await this.taskModel.create({
      userId,
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      priority: dto.priority ?? 'medium',
    });
    return doc;
  }

  async findAll(
    userId: string,
    query: { status?: TaskStatus; page?: number; limit?: number },
  ) {
    const filter: FilterQuery<TaskDocument> = { userId };
    if (query.status) filter.status = query.status;

    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.taskModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.taskModel.countDocuments(filter),
    ]);
    return { items, page, limit, total };
  }

  async findOne(userId: string, id: string) {
    const doc = await this.taskModel.findOne({ _id: id, userId }).lean();
    if (!doc) throw new NotFoundException('Task not found');
    return doc;
  }

  async update(userId: string, id: string, dto: UpdateTaskDto) {
    const update: any = { ...dto };
    if (dto.dueDate) update.dueDate = new Date(dto.dueDate);

    const doc = await this.taskModel
      .findOneAndUpdate({ _id: id, userId }, { $set: update }, { new: true })
      .lean();
    if (!doc) throw new NotFoundException('Task not found');
    return doc;
  }

  async remove(userId: string, id: string) {
    const res = await this.taskModel.deleteOne({ _id: id, userId });
    if (res.deletedCount === 0) throw new NotFoundException('Task not found');
    return { ok: true };
  }
}
