import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPortfolio extends Document {
  title: string;
  subTitle: string;
  tags: string;
  image: {
    secure_url: string;
    public_id: string;
  };
}

const PortfolioSchema: Schema<IPortfolio> = new Schema(
  {
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
  },
  { timestamps: true }
);

const Portfolio: Model<IPortfolio> =
  mongoose.models.Portfolio || mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);

export default Portfolio;
