import ProductList from '@/components/shared/product/product-list'
import { getProductsByAuthor } from '@/lib/actions/product.actions'

const ProductsByAuthor = async ({ author }: { author: string }) => {
  const productsByAuthor = await getProductsByAuthor(author)
  //   console.log(productsByAuthor)

  return (
    <>
      <ProductList
        data={productsByAuthor}
        title='Other Books of the Author'
        limit={5}
      />
    </>
  )
}

export default ProductsByAuthor
