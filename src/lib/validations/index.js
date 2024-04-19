import * as z from "zod";

export const SignupValidation = z.object({
    name: z.string().min(2, {message: "Name is too short"}).max(50, {message: "Name is too long"}),
    username: z.string().min(2, {message: "Username is too short"}).max(50),
    email: z.string().email(),
    password: z.string().min(5, {message: "Password should be at least 2 characters"})
});

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(5, {message: "Password should be at least 2 characters"})
});

