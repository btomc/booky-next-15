import ProductList from '@/components/shared/product/product-list'
import { getProductsByAuthor } from '@/lib/actions/product.actions'

const ProductsByAuthor = async ({
  author,
  currentProductId,
}: {
  author: string
  currentProductId: string
}) => {
  const productsByAuthor = await getProductsByAuthor(author, currentProductId)

  return (
    <>
      <ProductList
        data={productsByAuthor.products}
        title='Other Books of the Author'
        limit={5}
        path={`author=${author}`}
      />
    </>
  )
}

export default ProductsByAuthor
