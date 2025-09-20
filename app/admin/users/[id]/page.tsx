import { requireAdmin } from '@/lib/auth-guard'

const AdminUserUpdatePage = async () => {
  await requireAdmin()

  return <div>AdminUserUpdatePage</div>
}

export default AdminUserUpdatePage
