import { z } from 'zod'
import { formatNumberWithDecimal } from './utils'

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Price must have exactly two decimal places'
  )

// Schema for inserting products
export const insertProductSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  author: z.string().min(3, 'Author must be at least 3 characters'),
  genres: z.array(z.string()).min(1, 'Product must have at least one genre'),
  plot: z.string().min(3, 'Plot must be at least 3 characters'),
  pages: z.string().min(3, 'Pages must be at least 1 character'),
  publicationDate: z
    .string()
    .min(3, 'Publication Date must be at least 4 characters'),
  language: z.string().min(3, 'Language must be at least 3 characters'),
  binding: z
    .string()
    .min(3, 'Binding must be at least 3 characters')
    .nullable(),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must have at least one image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
})

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

// Schema for signing up a user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
