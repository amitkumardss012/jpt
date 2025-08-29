import { deleteFromCloudinary, uploadToCloudinary } from "../config/cloudinary.js";
import ENV from "../config/env.js";
import { asyncHandler } from "../middlewares/error.middleware.js";
import Portfolio from "../models/portfolio.model.js";
import { statusCode, type ImageType } from "../types/types.js";
import { ErrorResponse } from "../utils/response.util.js";
import { PortfolioValidator } from "../validators/portfolio.validator.js";

export const createPortfolio = asyncHandler(async (req, res, next) => {
    const data = PortfolioValidator.parse(req.body);
    const image = req.file;
    if (!image) return next(new ErrorResponse("Please upload an image", statusCode.Bad_Request));

    let imageToCloudinary: ImageType | undefined;
    const cloudinaryResult = await uploadToCloudinary(image.buffer, `${ENV.cloud_folder}/portfolio`);
    imageToCloudinary = {
        public_id: cloudinaryResult.public_id,
        secure_url: cloudinaryResult.secure_url,
    };

    const portfolio = await Portfolio.create({
        ...data,
        image: imageToCloudinary
    })

    return res.status(statusCode.Created).json({
        message: "Portfolio created successfully",
        data: portfolio
    })

});

export const getAllPortfolio = asyncHandler(async (req, res) => {
    const portfolio = await Portfolio.find().sort({ createdAt: -1 });
    return res.status(statusCode.OK).json({
        message: "Portfolio fetched successfully",
        data: portfolio
    })
});

export const getPortfolioById = asyncHandler(async (req, res, next) => {
    const portfolio = await Portfolio.findById(req.params.id)
    if (!portfolio) return next(new ErrorResponse("Portfolio not found", statusCode.Not_Found))
    return res.status(statusCode.OK).json({
        message: "Portfolio fetched successfully",
        data: portfolio
    })
});

export const deletePortfolio = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    if (!id) return next(new ErrorResponse("Portfolio id is required", statusCode.Bad_Request))

    const portfolio = await Portfolio.findById(id)
    if (!portfolio) return next(new ErrorResponse("Portfolio not found", statusCode.Not_Found))

    await Portfolio.findByIdAndDelete(id)

    // delete image from cloudinary
    await deleteFromCloudinary(portfolio.image.public_id)

    return res.status(statusCode.OK).json({
        message: "Portfolio deleted successfully",
        data: portfolio
    })
});