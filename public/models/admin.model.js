import { model, Schema } from "mongoose";
const adminSchema = new Schema({
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
});
const Admin = model("Admin", adminSchema);
export default Admin;
//# sourceMappingURL=admin.model.js.map