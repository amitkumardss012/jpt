import { asyncHandler } from "../middlewares/error.middleware.js";
import Enquiry from "../models/enquiry.model.js";
import { statusCode } from "../types/types.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.util.js";
import { EnquiryValidator } from "../validators/enquiry.validators.js";
export const createEnquiry = asyncHandler(async (req, res, next) => {
    const validatedData = EnquiryValidator.parse(req.body);
    const existingEnquiry = await Enquiry.findOne({
        $or: [
            { email: validatedData.email },
            { phone: validatedData.phone },
        ]
    });
    if (existingEnquiry) {
        return next(new ErrorResponse("Enquiry already exists", statusCode.Bad_Request));
    }
    const enquiry = await Enquiry.create(validatedData);
    return SuccessResponse(res, "Enquiry created successfully", enquiry);
});
export const getAllEnquiries = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.searchQuery || "";
    const isSeen = req.query.isSeen === "true" || req.query.isSeen === "false" ? req.query.isSeen === "true" : undefined;
    const date = req.query.date || "";
    const skip = (page - 1) * limit;
    const query = {};
    if (searchQuery) {
        query.$or = [
            { name: { $regex: searchQuery, $options: "i" } },
            { email: { $regex: searchQuery, $options: "i" } },
            { phone: { $regex: searchQuery, $options: "i" } },
            { subject: { $regex: searchQuery, $options: "i" } },
            { message: { $regex: searchQuery, $options: "i" } },
        ];
    }
    if (isSeen !== undefined) {
        query.isSeen = isSeen;
    }
    if (date) {
        query.createdAt = { $gte: new Date(date), $lt: new Date(date).setDate(new Date(date).getDate() + 1) };
    }
    const [Enquiries, totalEnquiry] = await Promise.all([
        Enquiry.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }),
        Enquiry.countDocuments(query),
    ]);
    return SuccessResponse(res, "Enquiries retrieved successfully", {
        enquiries: Enquiries,
        currentPage: page,
        totalPages: Math.ceil(totalEnquiry / limit),
        totalEnquiry,
        count: Enquiries.length,
    });
});
export const getEnquiryById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    if (!id)
        return next(new ErrorResponse("Enquiry id is required", statusCode.Bad_Request));
    // const enquiry = await Enquiry.findById(id)
    const [enquiry] = await Promise.all([
        Enquiry.findByIdAndUpdate(id, { isSeen: true }, { new: true })
    ]);
    if (!enquiry)
        return next(new ErrorResponse("Enquiry not found", statusCode.Not_Found));
    return SuccessResponse(res, "Enquiry retrieved successfully", enquiry);
});
export const deleteEnquiry = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    if (!id)
        return next(new ErrorResponse("Enquiry id is required", statusCode.Bad_Request));
    const enquiry = await Enquiry.findByIdAndDelete(id);
    if (!enquiry)
        return next(new ErrorResponse("Enquiry not found", statusCode.Not_Found));
    return SuccessResponse(res, "Enquiry deleted successfully", enquiry);
});
//# sourceMappingURL=enquiry.controller.js.map