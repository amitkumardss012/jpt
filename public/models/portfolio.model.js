import mongoose, { Schema, Document, Model } from "mongoose";
const PortfolioSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    subTitle: {
        type: String,
        required: true,
        trim: true,
    },
    tags: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        secure_url: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        },
    }
}, { timestamps: true });
const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);
export default Portfolio;
//# sourceMappingURL=portfolio.model.js.map