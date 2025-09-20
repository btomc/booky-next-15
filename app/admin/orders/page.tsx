import { requireAdmin } from '@/lib/auth-guard'

const AdminOrdersPage = async () => {
  await requireAdmin()

  return <div>AdminOrdersPage</div>
}

export default AdminOrdersPage
