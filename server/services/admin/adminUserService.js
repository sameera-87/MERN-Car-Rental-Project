import User from "../../models/User.js";

export const getAllUsersService = async () => {
  return await User.find({ role: "user" }).select("-password");
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
