'use server'

import { revalidatePath } from 'next/cache'
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from '../constants'
// import { PrismaClient } from '../generated/prisma'
import { prisma } from '@/db/prisma'
import { formatError } from '../utils'
// import { convertToPlainObject } from '../utils'

// Get latest products
export async function getLatestProducts() {
  // const prisma = new PrismaClient()

  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  })

  // return convertToPlainObject(data)
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

// Get all products - ADMIN
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
}: {
  query: string
  limit?: number
  page: number
  category?: string
}) {
  const data = await prisma.product.findMany({
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
