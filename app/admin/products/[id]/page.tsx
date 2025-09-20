import { requireAdmin } from '@/lib/auth-guard'

const AdminProductUpdatePage = async () => {
  await requireAdmin()

  return <div>AdminProductUpdatePage</div>
}

export default AdminProductUpdatePage
