import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 20, // Limit each IP to 20 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

export default limiter;
