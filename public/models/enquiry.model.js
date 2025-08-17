import { model, Schema } from "mongoose";
const EnquirySchema = new Schema({
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
}, { timestamps: true });
const Enquiry = model("Enquiry", EnquirySchema);
export default Enquiry;
//# sourceMappingURL=enquiry.model.js.map