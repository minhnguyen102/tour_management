import "express";

declare module "express-serve-static-core" {
  interface Request {
    flash(type: string, message: string): void;
    flash(type: string): string[];
  }
}