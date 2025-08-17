declare const Enquiry: import("mongoose").Model<{
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    isSeen: boolean;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    isSeen: boolean;
}, {}, {}> & {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    isSeen: boolean;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Enquiry;
//# sourceMappingURL=enquiry.model.d.ts.map