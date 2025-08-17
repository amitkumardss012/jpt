import { asyncHandler } from "../middlewares/error.middleware.js";
import Admin from "../models/admin.model.js";
import { statusCode } from "../types/types.js";
import { generateToken } from "../utils/jwt.util.js";
import { hashPassword, verifyPassword } from "../utils/password.util.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.util.js";
import { AdminValidator } from "../validators/admin.validator.js";


export const createAdmin = asyncHandler(async (req, res, next) => {
    const validData = AdminValidator.parse(req.body)


    const [existingAdmin, hashedPassword] = await Promise.all([
        Admin.findOne({email: validData.email}),
        hashPassword(validData.password)
    ])

    if(existingAdmin) return next(new ErrorResponse("Admin already exists", statusCode.Bad_Request))

    const admin = await Admin.create({
        ...validData,
        password: hashedPassword
    })

    return res.status(statusCode.Created).json({
        message: "Admin created successfully",
        data: admin
    })
 });

export const loginAdmin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) return next(new ErrorResponse("Email and password are required", statusCode.Bad_Request))

    const admin = await Admin.findOne({email})

    if(!admin) return next(new ErrorResponse("Admin not found", statusCode.Not_Found))

    const isPasswordValid = await verifyPassword(password, admin.password);

    if(!isPasswordValid) return next(new ErrorResponse("Invalid password", statusCode.Bad_Request))

    const token = generateToken({id: admin._id, email: admin.email, role: admin.role})

    return res.status(statusCode.OK).cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }).header({
        authorization: `Bearer ${token}`,
      }).json({
        message: "Admin logged in successfully",
        success: true,
        data: {admin, token},
    })
 });

export const getAllAdmins = asyncHandler(async (req, res) => {
    const admin = await Admin.find()

    return SuccessResponse(res,"Admins retrieved successfully", admin)
 });

export const getAdminById = asyncHandler(async (req, res, next) => { 
    const id = req.params.id;

    if(!id) return next(new ErrorResponse("Admin id is required", statusCode.Bad_Request))

    const admin = await Admin.findById(id)

    if(!admin) return next(new ErrorResponse("Admin not found", statusCode.Not_Found))

    return SuccessResponse(res,"Admin retrieved successfully", admin)
});

export const updateAdmin = asyncHandler(async (req, res, next) => { 
    const id = req.params.id;

    const validData = AdminValidator.partial().parse(req.body)

    if(!id) return next(new ErrorResponse("Admin id is required", statusCode.Bad_Request))

        const updatedData = {...validData}

        if(validData.password) {
            const hashedPassword = await hashPassword(validData.password)
            updatedData.password = hashedPassword
        }

        const admin = await Admin.findByIdAndUpdate(id, updatedData, {new: true})

        if(!admin) return next(new ErrorResponse("Admin not found", statusCode.Not_Found))

        return SuccessResponse(res,"Admin updated successfully", admin)
    
});

export const deleteAdmin = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    if(!id) return next(new ErrorResponse("Admin id is required", statusCode.Bad_Request))

    const admin = await Admin.findByIdAndDelete(id)

    if(!admin) return next(new ErrorResponse("Admin not found", statusCode.Not_Found))

    return SuccessResponse(res,"Admin deleted successfully", admin) 
 });

export const logoutAdmin = asyncHandler(async (req, res) => {
    return res.status(statusCode.OK).clearCookie("token", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 0,
        expires: new Date(0),
    }).json({
        message: "Admin logged out successfully",
        success: true,
    })
 });

