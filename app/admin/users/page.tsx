import { requireAdmin } from '@/lib/auth-guard'

const AdminUsersPage = async () => {
  await requireAdmin()

  return <div>AdminUsersPage</div>
}

export default AdminUsersPage
