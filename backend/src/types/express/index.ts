import { JwtPayload } from "../../interfaces/jwtPayload";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Request interface
 */