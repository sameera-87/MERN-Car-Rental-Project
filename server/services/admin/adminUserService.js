import User from "../../models/User.js";

export const getAllUsersService = async () => {
  console.log("/api/admin/users req reached to the backend")
  return await User.find({
    role: { $in: ["user", "owner"] }
    }).select("-password");
};

export const updateUserService = async (userId, data) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.name = data.name || user.name;
  user.email = data.email || user.email;

  return await user.save();
};

export const deleteUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  await user.deleteOne();
  return true;
};
