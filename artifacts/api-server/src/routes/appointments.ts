import { Router, type IRouter } from "express";
import { db, appointmentsTable, insertAppointmentSchema } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.post("/appointments", async (req, res) => {
  const parsed = insertAppointmentSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "validation_error", issues: parsed.error.issues });
    return;
  }

  try {
    const [appointment] = await db
      .insert(appointmentsTable)
      .values(parsed.data)
      .returning();
    req.log.info({ id: appointment.id, name: appointment.name }, "Appointment created");
    res.status(201).json({ success: true, id: appointment.id });
  } catch (err) {
    req.log.error({ err }, "Failed to create appointment");
    res.status(500).json({ error: "server_error", message: "Could not save appointment." });
  }
});

router.get("/appointments", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(appointmentsTable)
      .orderBy(desc(appointmentsTable.createdAt))
      .limit(200);
    res.json(rows);
  } catch (err) {
    req.log.error({ err }, "Failed to list appointments");
    res.status(500).json({ error: "server_error" });
  }
});

router.patch("/appointments/:id/status", async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body as { status: string };
  const allowed = ["pending", "confirmed", "cancelled", "completed"];
  if (!allowed.includes(status)) {
    res.status(400).json({ error: "invalid_status" });
    return;
  }
  try {
    const { eq } = await import("drizzle-orm");
    const [updated] = await db
      .update(appointmentsTable)
      .set({ status })
      .where(eq(appointmentsTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "not_found" });
      return;
    }
    res.json(updated);
  } catch (err) {
    req.log.error({ err }, "Failed to update appointment status");
    res.status(500).json({ error: "server_error" });
  }
});

export default router;
