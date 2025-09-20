import { requireAdmin } from '@/lib/auth-guard'

const CreateProductPage = async () => {
  await requireAdmin()

  return <div>CreateProductPage</div>
}

export default CreateProductPage
