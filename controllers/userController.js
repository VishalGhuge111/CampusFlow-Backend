import User from "../models/User.js";
import Task from "../models/Task.js";
import bcrypt from "bcryptjs";

// =======================
// GET USER PROFILE
// =======================
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      college: user.college,
      branch: user.branch,
      year: user.year,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// UPDATE USER PROFILE
// =======================
export const updateUserProfile = async (req, res) => {
  try {
    const { name, college, branch, year, avatar, phoneNumber } = req.body;

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.college = college || user.college;
    user.branch = branch || user.branch;
    user.year = year || user.year;
    user.avatar = avatar || user.avatar;
    user.phoneNumber = phoneNumber !== undefined ? phoneNumber : user.phoneNumber;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        college: user.college,
        branch: user.branch,
        year: user.year,
        avatar: user.avatar,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// CHANGE PASSWORD
// =======================
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// DELETE USER ACCOUNT
// =======================
export const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user;

    await Task.deleteMany({ userId });
    await User.findByIdAndDelete(userId);

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
