import ProductList from '@/components/shared/product/product-list'
import { getProductsByGenre } from '@/lib/actions/product.actions'

const RelatedProducts = async ({
  genre,
  currentProductId,
}: {
  genre: string
  currentProductId: string
}) => {
  const productsByGenre = await getProductsByGenre(genre, currentProductId)

  return (
    <>
      <ProductList
        data={productsByGenre.products}
        title='Related Books'
        limit={5}
        path={`genre=${genre}`}
      />
    </>
  )
}

export default RelatedProducts
