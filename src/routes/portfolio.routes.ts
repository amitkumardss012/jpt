import { Router } from "express";
import { PortfolioController } from "../controllers/index.js";
import { multerUpload } from "../middlewares/multer.middleware.js";

const portfolioRoute = Router();

portfolioRoute.post("/create", multerUpload.single("image"), PortfolioController.createPortfolio);
portfolioRoute.get("/all", PortfolioController.getAllPortfolio);
portfolioRoute.get("/:id", PortfolioController.getPortfolioById);
portfolioRoute.delete("/:id", PortfolioController.deletePortfolio);

export default portfolioRoute;