import type { Express } from "express";
import { db } from "../db";
import { appointments, trainers, users, progressLogs } from "../db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express) {
  // Appointments
  app.get("/api/appointments", async (req, res) => {
    const results = await db.select().from(appointments);
    res.json(results);
  });

  app.post("/api/appointments", async (req, res) => {
    const { userId, trainerId, date, area } = req.body;
    const result = await db.insert(appointments).values({
      userId,
      trainerId,
      date: new Date(date),
      area
    }).returning();
    res.json(result[0]);
  });

  // Trainers
  app.get("/api/trainers", async (req, res) => {
    const results = await db.select().from(trainers);
    res.json(results);
  });

  // Progress Tracking
  app.get("/api/progress/:userId", async (req, res) => {
    const results = await db.select()
      .from(progressLogs)
      .where(eq(progressLogs.userId, parseInt(req.params.userId)))
      .orderBy(progressLogs.date);
    res.json(results);
  });

  app.post("/api/progress", async (req, res) => {
    const { userId, painLevel, mobility, notes } = req.body;
    const result = await db.insert(progressLogs).values({
      userId,
      date: new Date(),
      painLevel,
      mobility,
      notes
    }).returning();
    res.json(result[0]);
  });
}
