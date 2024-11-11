import type { Express } from "express";
import { db } from "../db";
import { appointments, messages, progress, therapists, users } from "../db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express) {
  app.get("/api/appointments", async (req, res) => {
    const userAppointments = await db.query.appointments.findMany({
      where: eq(appointments.userId, req.user?.id),
      with: {
        therapist: true,
      },
    });
    res.json(userAppointments);
  });

  app.post("/api/appointments", async (req, res) => {
    const { area, therapistId, date } = req.body;
    const appointment = await db.insert(appointments).values({
      userId: req.user?.id,
      therapistId,
      area,
      date: new Date(date),
    }).returning();
    res.json(appointment[0]);
  });

  app.get("/api/progress", async (req, res) => {
    const userProgress = await db.query.progress.findMany({
      where: eq(progress.userId, req.user?.id),
      orderBy: (progress, { desc }) => [desc(progress.date)],
    });
    res.json(userProgress);
  });

  app.get("/api/messages", async (req, res) => {
    const userMessages = await db.query.messages.findMany({
      where: eq(messages.userId, req.user?.id),
      orderBy: (messages, { asc }) => [asc(messages.createdAt)],
    });
    res.json(userMessages);
  });

  app.post("/api/messages", async (req, res) => {
    const { content } = req.body;
    const message = await db.insert(messages).values({
      userId: req.user?.id,
      content,
      isUser: true,
    }).returning();
    res.json(message[0]);
  });

  app.get("/api/profile", async (req, res) => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, req.user?.id),
    });
    res.json(user);
  });
}
