import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import dotenv from "dotenv";
import CreditDevice from "../models/creditDevice.js";
import Contact from "../models/contactUs.js";
import fs from "fs";

dotenv.config();


const convertImageToBase64 = (imagePath) => {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString("base64");
};

const createCreditDevice = async (req, res) => {
  try {
    const { deviceName, creditPoints } = req.body;

    // Check if deviceName and creditPoints are provided
    if (!deviceName || !creditPoints) {
      return res.status(400).json({ message: "Device name and credit points are required" });
    }

    // Check if the device already exists in the database
    let existingDevice = await CreditDevice.findOne({ deviceName });

    if (existingDevice) {
      // If the device already exists, update its credit points
      existingDevice.creditPoints = creditPoints;
      await existingDevice.save();
      return res.status(200).json({ message: "Credit device updated successfully" });
    } else {
      // If the device does not exist, create a new credit device
      const newCreditDevice = new CreditDevice({
        deviceName,
        creditPoints,
      });
      await newCreditDevice.save();
      return res.status(201).json({ message: "Credit device created successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getAllDevices = async (req, res) => {
  try {
    // Fetch all credit devices from the database
    const devices = await CreditDevice.find();

    // Check if any devices were found
    if (devices.length === 0) {
      return res.status(404).json({ message: "No devices found" });
    }

    // Respond with the array of devices
    res.status(200).json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



const signIn = async (req, res) => {
  try {
    const { email, googleSignIn } = req.body;

    let user;
    let isNewUser = false;

    if (googleSignIn) {
      // Google Sign-In flow
      user = await User.findOne({ email });

      if (!user) {
        const newUser = new User({
          firstname: given_name,
          lastname: family_name,
          email,
          registrationType: "Individual",
          isAdmin: false,
        });
        await newUser.save();
        user = newUser;
        isNewUser = true;
      }
    } else {
      // Regular Sign-In with email and password
      const { password } = req.body;
      user = await User.findOne({ email });

      if (!user || !user.isActive) {
        return res.status(404).json({ message: "User not found or inactive" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }

    const userName = user.firstname ;
    const token = generateToken({
      _id: user._id,
    });
    const isAdmin = user.isAdmin;

    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: true,
      expires: new Date(Date.now() + 5184000000),
    });

    res.status(200).json({
      isAuthenticated: true,
      user: { email, avatar: user.avatar },
      userName: userName,
      isAdmin: isAdmin,
      token: token,
      message: isNewUser
        ? "User registered and signed in successfully"
        : "User signed in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for Registration (Form 1)
const register = async (req, res) => {
  try {
    const {
      _id,
      firstname,
      lastname,
      email,
      password,
      registrationType,
      companyName,
      companySize,
      country,
      primaryInterest,
    } = req.body;

    // Check if email, password, and firstname are provided
    if (!email || !password || !firstname) {
      return res
        .status(400)
        .json({ message: "Email, password, and firstname are required" });
    }
    if (
      registrationType === "Company" &&
      (!companyName || !companySize || !country || !primaryInterest)
    ) {
      return res.status(400).json({
        message: 'Company details are required for registration type "Company"',
      });
    }

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.registrationType === "Company") {
        return res.status(400).json({ message: "Email already registered" });
      } else if (registrationType === "Company") {
        existingUser.registrationType = registrationType;
        existingUser.companyName = companyName;
        existingUser.companySize = companySize;
        existingUser.country = country;
        existingUser.primaryInterest = primaryInterest;
      } else {
        return res.status(400).json({
          message: "Email already registered",
        });
      }

      await existingUser.save();
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        registrationType,
        companyName: registrationType === "Company" ? companyName : undefined,
        companySize: registrationType === "Company" ? companySize : undefined,
        country: registrationType === "Company" ? country : undefined,
        primaryInterest:
          registrationType === "Company" ? primaryInterest : undefined,
        isAdmin: false,
      });
      const randomAvatarNumber = Math.floor(Math.random() * 4) + 1;
      const avatarBase64 = convertImageToBase64(
        `assets/avatar${randomAvatarNumber}.png`
      );
      newUser.avatar = avatarBase64;
      // Save the user data to the database
      await newUser.save({ session: null, dbName: "portalify" });
      existingUser = newUser;
    }
    const token = generateToken({
      _id: _id,
    });
    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: true,
      expires: new Date(Date.now() + 5184000000),
    });

    res.status(201).json({
      isAuthenticated: true,
      user: { email },
      token: token,
      isAdmin: isAdmin,
      message: "User registered successfully",
    });

    sendWelcomeEmail(email);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



const contactUsForm = async (req, res) => {
  try {
    const { email, name, description } = req.body;

    // Validate request
    if (!email || !name || !description) {
      return res.status(400).json({ message: "Please provide all the required fields" });
    }

    // Create a new contact
    const newContact = new Contact({
      email,
      name,
      description,
    });

    // Save contact to the database
    await newContact.save();

    res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};





const getUserIsAuthenticated = (req, res) => {
  const { email } = req.user;
  res.status(200).json({ isAuthenticated: true, user: { email } });
};

const postCheckAuthenticated = (req, res) => {
  if (req.isAuthenticated()) res.status(200).json({ isAuthenticated: true });
};

const getUserLogout = (req, res) => {
  res.clearCookie("access_token");
  res.json({ user: { email: "" }, success: true });
};



export {
  signIn,
  register,
  getUserIsAuthenticated,
  getUserLogout,
  postCheckAuthenticated,
  contactUsForm,
  createCreditDevice,
  getAllDevices,
};
