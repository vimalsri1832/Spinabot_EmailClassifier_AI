import { Hono } from "hono";

// Define environment bindings type
type Env = Record<string, unknown>;

const app = new Hono<{ Bindings: Env }>();

export default app;
