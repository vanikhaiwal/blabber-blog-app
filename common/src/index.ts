import {z} from "zod";


export const signUpInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})
export const signInInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
})
export const updateBlogInput = z.object({
    id: z.number(),
    title: z.string().optional(),
    content: z.string().optional(),
})
export type UpdateblogInput = z.infer<typeof updateBlogInput>
export type CreateblogInput = z.infer<typeof createBlogInput>
export type SignUpInput = z.infer<typeof signUpInput>
export type SignInInput = z.infer<typeof signInInput>