'use server'

import { revalidatePath } from 'next/cache'
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from '../constants'
import { prisma } from '@/db/prisma'
import { convertToPlainObject, formatError } from '../utils'
import { insertProductSchema, updateProductSchema } from '../validators'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

// Get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  })

  // Map over the query result and convert Decimal's to Strings
  return data.map((product) => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  }))
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  })
}

// Get single product by it's ID - ADMIN
export async function getProductById(productId: string) {
  const data = await prisma.product.findFirst({
    where: { id: productId },
  })

  return convertToPlainObject(data)
}

// Get all products - ADMIN
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  price,
  rating,
  sort,
  category,
  author,
}: {
  query: string
  limit?: number
  page: number
  price?: string
  rating?: string
  sort?: string
  category?: string
  author?: string
}) {
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== 'all'
      ? {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { author: { contains: query, mode: 'insensitive' } },
          ],
        }
      : {}

  // Price filter
  const priceFilter: Prisma.ProductWhereInput =
    price && price !== 'all'
      ? {
          price: {
            gte: Number(price.split('-')[0]),
            lte: Number(price.split('-')[1]),
          },
        }
      : {}

  // Rating filter
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            gte: Number(rating),
          },
        }
      : {}

  const data = await prisma.product.findMany({
    where: { ...queryFilter, ...priceFilter, ...ratingFilter },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  })

  const dataCount = await prisma.product.count()

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  }
}

// Delete a product - ADMIN
export async function deleteProduct(id: string) {
  try {
    const productExists = await prisma.product.findFirst({
      where: { id },
    })

    if (!productExists) throw new Error('Product not found')

    await prisma.product.delete({ where: { id } })

    revalidatePath('/admin/products')

    return {
      success: true,
      message: 'Product deleted successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// Create a product - ADMIN
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data)
    await prisma.product.create({ data: product })

    revalidatePath('/admin/products')

    return {
      success: true,
      message: 'Product created successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// Update a product - ADMIN
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data)
    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    })

    if (!productExists) throw new Error('Product not found')

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    })

    revalidatePath('/admin/products')

    return {
      success: true,
      message: 'Product updated successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// Get featured products
export async function getFeaturedProducts() {
  const data = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take: 4,
  })

  return convertToPlainObject(data)
}
