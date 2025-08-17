import { model, Schema } from "mongoose";
import type { AdminType } from "../validators/admin.validator.js";

const adminSchema = new Schema<AdminType>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'SUB_ADMIN'],
        default: 'SUB_ADMIN'
    }
    }, {
    timestamps: true
})

const Admin = model<AdminType>("Admin", adminSchema);
export default Admin;