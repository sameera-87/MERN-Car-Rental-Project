import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { assets } from '../../assets/assets'

const ManageUsers = () => {
  const { axios } = useAppContext()
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const { data } = await axios.get('/api/admin/users')
    data.success ? setUsers(data.users) : toast.error(data.message)
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
      <Title title="Manage Users" subTitle="Update user roles or remove users from platform" />

      <table className="w-full mt-6 border border-borderColor text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-t">
              <td className="p-3 flex items-center gap-2">
                <img src={user.image || assets.avatar} className="h-8 w-8 rounded-full" />
                {user.name}
              </td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={e => updateRole(user._id, e.target.value)}
                  className="border border-borderColor rounded px-2 py-1"
                >
                  <option value="user">User</option>
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <img
                  src={assets.delete_icon}
                  className="cursor-pointer"
                  onClick={() => deleteUser(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageUsers
