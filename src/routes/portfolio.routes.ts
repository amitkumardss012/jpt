import { Router } from "express";
import { PortfolioController } from "../controllers/index.js";

const portfolioRoute = Router();

portfolioRoute.post("/create", PortfolioController.createPortfolio);
portfolioRoute.get("/all", PortfolioController.getAllPortfolio);
portfolioRoute.get("/:id", PortfolioController.getPortfolioById);
portfolioRoute.delete("/:id", PortfolioController.deletePortfolio);

export default portfolioRoute;