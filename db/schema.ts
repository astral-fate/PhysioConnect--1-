import { pgTable, text, integer, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").unique().notNull()
});

export const trainers = pgTable("trainers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  rating: real("rating").notNull(),
  image: text("image").notNull()
});

export const appointments = pgTable("appointments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").references(() => users.id).notNull(),
  trainerId: integer("trainer_id").references(() => trainers.id).notNull(),
  date: timestamp("date").notNull(),
  area: text("area").notNull(),
  status: text("status").default("scheduled")
});

export const progressLogs = pgTable("progress_logs", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").references(() => users.id).notNull(),
  date: timestamp("date").notNull(),
  painLevel: integer("pain_level").notNull(),
  mobility: integer("mobility").notNull(),
  notes: text("notes")
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertTrainerSchema = createInsertSchema(trainers);
export const selectTrainerSchema = createSelectSchema(trainers);
export const insertAppointmentSchema = createInsertSchema(appointments);
export const selectAppointmentSchema = createSelectSchema(appointments);
export const insertProgressLogSchema = createInsertSchema(progressLogs);
export const selectProgressLogSchema = createSelectSchema(progressLogs);

export type User = z.infer<typeof selectUserSchema>;
export type Trainer = z.infer<typeof selectTrainerSchema>;
export type Appointment = z.infer<typeof selectAppointmentSchema>;
export type ProgressLog = z.infer<typeof selectProgressLogSchema>;
