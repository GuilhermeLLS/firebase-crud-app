import * as functions from "firebase-functions";
import express, { Express } from "express";
import cors from "cors";

import { initializeFirebase } from "./database/config";
import router from "./routes/index";

class App {
  server: Express;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors({ origin: true }));
  }

  routes() {
    this.server.use(router);
  }

  authFirebase() {
    initializeFirebase();
  }
}

export default functions.https.onRequest(new App().server);
