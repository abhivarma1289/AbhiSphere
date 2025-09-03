import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'doing' | 'done';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true, index: true })
  userId: string; // Firebase uid

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ type: Date })
  dueDate?: Date;

  @Prop({ type: String, enum: ['low', 'medium', 'high'], default: 'medium' })
  priority: TaskPriority;

  @Prop({
    type: String,
    enum: ['todo', 'doing', 'done'],
    default: 'todo',
    index: true,
  })
  status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

// Helpful indexes
TaskSchema.index({ userId: 1, dueDate: 1 });
TaskSchema.index({ userId: 1, status: 1, createdAt: -1 });
