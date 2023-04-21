import { SessionData } from "express-session";
import { Socket } from "socket.io";
export interface CustomSocket extends Socket {
  userEmail?: string;
  room?: any;
  authorization: boolean;
  userId: number;
}

export interface CustomSession extends SessionData {
  verifyEmail?: any;
}
