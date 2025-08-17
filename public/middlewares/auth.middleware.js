import { statusCode } from "../types/types.js";
import { verifyToken } from "../utils/jwt.util.js";
import { ErrorResponse } from "../utils/response.util.js";
import { asyncHandler } from "./error.middleware.js";
export const authenticate = asyncHandler(async (req, res, next) => {
    const tokenFromCookie = req.cookies?.token;
    const tokenFromHeader = req.headers["authorization"]?.split("Bearer ")[1]?.trim() ||
        req.headers.cookie?.split("=")[1]?.trim();
    const tokenFromHeader2 = req.headers["authorization"]
        ?.split("Bearer ")[1]
        ?.trim();
    const token = tokenFromCookie || tokenFromHeader || tokenFromHeader2;
    if (!token) {
        return next(new ErrorResponse("Not authorized, token missing", statusCode.Unauthorized));
    }
    let decoded;
    try {
        decoded = verifyToken(token);
    }
    catch (error) {
        return next(new ErrorResponse("Invalid or expired token", statusCode.Unauthorized));
    }
    // const admin = await AdminService.findById(decoded?.id);
    // if (!admin) {
    //   return next(
    //     new ErrorResponse(
    //       "Not authorized, admin or Sub Admin not found",
    //       statusCode.Unauthorized
    //     )
    //   );  
    // }
    // req.admin = {
    //   ...admin,
    //   id: admin.id.toString(),
    // };
    next();
});
export const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.admin?.role === "ADMIN")
        next();
    else {
        return next(new ErrorResponse("Permission Denied", statusCode.Forbidden));
    }
});
export const allowSubAdmin = asyncHandler(async (req, res, next) => {
    if (req.admin?.role === "ADMIN" || req.admin?.role === "SUB_ADMIN")
        next();
    else {
        return next(new ErrorResponse("Permission Denied", statusCode.Forbidden));
    }
});
//# sourceMappingURL=auth.middleware.js.map