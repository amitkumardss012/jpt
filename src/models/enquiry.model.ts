import { model, Schema } from "mongoose";
import type { EnquiryType } from "../validators/enquiry.validators.js";

const EnquirySchema = new Schema<EnquiryType>({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isSeen: {
        type: Boolean,
        default: false,
    }
},{timestamps: true});

const Enquiry = model<EnquiryType>("Enquiry", EnquirySchema);
export default Enquiry;