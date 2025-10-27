import ProductList from '@/components/shared/product/product-list'
import { getProductsByGenre } from '@/lib/actions/product.actions'

const RelatedProducts = async ({ genre }: { genre: string }) => {
  const productsByGenre = await getProductsByGenre(genre)
  // console.log(productsByGenre)

  return (
    <>
      <ProductList data={productsByGenre} title='Related Books' limit={5} />
    </>
  )
}

export default RelatedProducts
