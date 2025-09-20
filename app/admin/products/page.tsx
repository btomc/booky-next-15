import { requireAdmin } from '@/lib/auth-guard'

const AdminProductsPage = async () => {
  await requireAdmin()

  return <div>AdminProductsPage</div>
}

export default AdminProductsPage
