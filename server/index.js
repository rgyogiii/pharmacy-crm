import MongoDB from "./db";
import "./ipc";

const SERVER = async () => {
  try {
    await new MongoDB().connect();
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

SERVER();
