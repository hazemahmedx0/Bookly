import { z } from 'zod'

// SignUp
export const signupFormSchema = z.object({
    email: z
        .string()
        .email({ message: 'Please enter a valid email' })
        .trim()
        .toLowerCase(),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' }),
})

export type SignUpForm = z.infer<typeof signupFormSchema>

// Login

export const loginFormSchema = z.object({
    email: z
        .string({ required_error: 'email is reqired' })
        .email({ message: 'Please enter a valid email' })
        .trim()
        .toLowerCase(),
    password: z
        .string({ required_error: 'paswword is reqired' })
        .min(8, { message: 'Password must be at least 8 characters long' }),
})

export type LoginForm = z.infer<typeof loginFormSchema>
