// config/instrument.js
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://8a87cf71b25a3c8925de637a29b6a77e@o4509642889166848.ingest.us.sentry.io/4509643749588992",
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
});

export const sentryRequestHandler = Sentry.Handlers.requestHandler();
export const sentryErrorHandler = Sentry.Handlers.errorHandler();
