import z from "zod";
export const PortfolioValidator = z.object({
    title: z.string().trim().min(3).max(30),
    subTitle: z.string().trim().min(3).max(100),
    tags: z.string().trim().min(3).max(50)
});
//# sourceMappingURL=portfolio.validator.js.map