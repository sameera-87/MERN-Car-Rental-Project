import React, { useEffect, useState } from 'react'
import AdminTitle from '../../components/admin/AdminTitle'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { assets } from '../../assets/assets'

const ManageUsers = () => {

  const { axios } = useAppContext()
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const { data } = await axios.get('/api/admin/users')
    data.success ? setUsers(data.data) : toast.error(data.message)
  }

  const updateRole = async (id, role) => {
    await axios.put(`/api/admin/users/${id}`, { role })
    toast.success('User updated')
    fetchUsers()
  }

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return
    await axios.delete(`/api/admin/users/${id}`)
    toast.success('User deleted')
    fetchUsers()
  }

  useEffect(() => { fetchUsers() }, [])

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <AdminTitle
        title="Manage Users"
        subTitle="Update user roles or remove users from platform"
      />

      {/* Card Container */}
      <div className="mt-6 w-250 overflow-hidden rounded-xl border border-borderColor bg-white shadow-sm">
        <table className="w-full text-sm">

          {/* Table Head */}
          <thead className="bg-primary/10 border-b border-borderColor text-[#334155]">
            <tr>
              <th className="py-3 px-3 text-left font-semibold">User</th>
              <th className="py-3 px-3 text-left font-semibold">Email</th>
              <th className="py-3 px-3 text-left font-semibold">Role</th>
              <th className="py-3 px-3 text-center font-semibold">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-borderColor">
            {users.map(user => (
              <tr
                key={user._id}
                className="hover:bg-light transition-colors"
              >

                {/* User + Avatar */}
                <td className="py-2.5 px-3 flex items-center gap-3">
                  <img
                    src={user.image || assets.userAvatar}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover border-none"
                  />
                  <span className="font-medium text-[#2D3436]">
                    {user.name}
                  </span>
                </td>

                {/* Email */}
                <td className="py-2.5 px-3 text-gray-600">
                  {user.email}
                </td>

                {/* Role */}
                <td className="py-2.5 px-3">
                  <select
                    value={user.role}
                    onChange={e => updateRole(user._id, e.target.value)}
                    className="rounded-md border border-borderColor bg-white px-2 py-1 text-sm text-[#334155]
                               focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="user">User</option>
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                {/* Action */}
                <td className="py-2.5 px-3 text-center">
                  <img
                    src={assets.delete_icon}
                    alt="Delete"
                    className="mx-auto h-8 w-8 cursor-pointer opacity-70
                               hover:opacity-100 hover:scale-110 transition"
                    onClick={() => deleteUser(user._id)}
                  />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default ManageUsers
