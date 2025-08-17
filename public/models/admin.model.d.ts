declare const Admin: import("mongoose").Model<{
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "SUB_ADMIN";
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "SUB_ADMIN";
}, {}, {}> & {
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "SUB_ADMIN";
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Admin;
//# sourceMappingURL=admin.model.d.ts.map