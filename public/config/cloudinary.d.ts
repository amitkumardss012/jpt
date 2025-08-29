import { v2 as cloudinary } from "cloudinary";
export default cloudinary;
export declare const uploadToCloudinary: (fileBuffer: Buffer, folder: string) => Promise<{
    public_id: string;
    secure_url: string;
}>;
export declare const deleteFromCloudinary: (publicId: string) => Promise<void>;
//# sourceMappingURL=cloudinary.d.ts.map