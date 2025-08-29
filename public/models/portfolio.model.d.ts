import { Document, Model } from "mongoose";
export interface IPortfolio extends Document {
    title: string;
    subTitle: string;
    tags: string;
    image: {
        secure_url: string;
        public_id: string;
    };
}
declare const Portfolio: Model<IPortfolio>;
export default Portfolio;
//# sourceMappingURL=portfolio.model.d.ts.map