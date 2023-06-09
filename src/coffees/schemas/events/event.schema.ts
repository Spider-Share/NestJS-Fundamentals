/* Event entity - FINAL CODE */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, SchemaTypes } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;


@Schema()
export class Event extends Document {  // Note "entity" was removed from the class "name"
  @Prop()
  type: string;

  @Prop({ index: true })
  name: string;

  @Prop(SchemaTypes.Mixed)
  payload: string;
  // payload: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
// EventSchema.index({ name: 1, type: 1 }) // Ordem crescente - ascending
EventSchema.index({ name: 1, type: -1 }) // Ordem decrescente - descending
