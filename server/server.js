// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import connectCloudiary from "./config/cloudinary.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { clerkMiddleware } from '@clerk/express';

// ✅ Sentry instrumentation
import * as Sentry from "@sentry/node";
import { sentryRequestHandler, sentryErrorHandler } from "./config/instrument.js";

const app = express();

// ✅ Apply Sentry request handler FIRST
app.use(sentryRequestHandler);

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// ✅ Routes before error handler
app.get("/", (req, res) => {
  res.send("API is working");
});

// ✅ This route throws an error to test Sentry
app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

app.post("/webhooks", clerkWebhooks);
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/user', userRoutes);

// ✅ Apply Sentry error handler LAST
app.use(sentryErrorHandler);

// ✅ Optional: Fallback error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || "Internal server error" });
});

// ✅ Start server
(async () => {
  await connectDB();
  await connectCloudiary();

  if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
})();

export default app;
