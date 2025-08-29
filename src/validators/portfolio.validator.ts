import z from "zod";
import type { IPortfolio } from "../models/portfolio.model.js";

export const PortfolioValidator = z.object({
    title: z.string().trim().min(3).max(30),
    subTitle: z.string().trim().min(3).max(500),
    tags: z.string().trim().min(3).max(50)
})