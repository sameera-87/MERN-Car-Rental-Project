import {
  getAllUsersService,
  updateUserService,
  deleteUserService,
} from "../../services/admin/adminUserService.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.json({success: true, data: users });
  } catch (error) {
    res.status(500).json({success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await updateUserService(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await deleteUserService(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
