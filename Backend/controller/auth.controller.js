import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokeAndSetCookies from "../utils/generateToken.js";


export const SignUpUser = async (req, res) => {
  try {
    const { fullname, username, password, gender, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password Dosen't Match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already Exists" });
    }
    //Hash Password Here
    const salt = await bcrypt.genSalt(8);
    const hashedPasswrod = await bcrypt.hash(password, salt);
    //https://avatar-placeholder.iran.liara.run
    const BoyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const GirlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullname: fullname,
      username: username,
      password: hashedPasswrod,
      gender: gender,
      profilePicture: gender === "male" ? BoyProfilePic : GirlProfilePic,
    })

    if (newUser) {
      // Generate JWT Here
      generateTokeAndSetCookies(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePicture: newUser.profilePicture,

      })
    } else {
      res.status(400).json({ error: 'Invalid User Data' })
    }

  } catch (error) {
    console.log('Error in SignUp Controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const LoginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");


    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Username or Password" });
    }

    generateTokeAndSetCookies(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePicture: user.profilePicture,
    })



  } catch (error) {
    console.log('Error in Login Controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const LogoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { expires: 0 })
    res.status(500).json({ message: "Logged Out Successfully" });

  } catch (error) {
    console.log('Error in Logout Controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' })
  }
} 