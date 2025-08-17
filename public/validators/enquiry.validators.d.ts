import { z } from "zod";
export declare const EnquiryValidator: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    subject: z.ZodString;
    message: z.ZodString;
    isSeen: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export type EnquiryType = z.infer<typeof EnquiryValidator>;
//# sourceMappingURL=enquiry.validators.d.ts.map