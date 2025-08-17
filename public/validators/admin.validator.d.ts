import { z } from 'zod';
export declare const AdminValidator: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<{
        ADMIN: "ADMIN";
        SUB_ADMIN: "SUB_ADMIN";
    }>>;
}, z.core.$strip>;
export type AdminType = z.infer<typeof AdminValidator>;
//# sourceMappingURL=admin.validator.d.ts.map