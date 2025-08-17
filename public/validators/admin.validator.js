import { z } from 'zod';
const AdminRoleEnum = z.enum(['ADMIN', 'SUB_ADMIN']);
export const AdminValidator = z.object({
    name: z
        .string("Name is required")
        .trim()
        .nonempty({ message: 'Name is required' })
        .min(2, { message: 'Name must be at least 2 characters long' })
        .max(50, { message: 'Name must be at most 50 characters long' }),
    email: z
        .string("Email is required")
        .trim()
        .nonempty({ message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    password: z
        .string("Password is required")
        .nonempty({ message: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(100, { message: 'Password must be at most 100 characters long' }),
    role: AdminRoleEnum.default('SUB_ADMIN')
});
//# sourceMappingURL=admin.validator.js.map