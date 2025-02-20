import { UserSchema } from "../models/users.js";

// Function to register user to DB
const registerUserToDB = async (req, res) => {
  try {
    const { name, phone, collegeName, course, hodName, hodPhone, transactionId, events, eventDetails, totalAmount } = req.body;

    const existingUser = await UserSchema.findOne({ transactionId });
    if (existingUser) {
      return res.status(400).json({ message: "Transaction ID already exists!" });
    }

    const newUser = new UserSchema({
      name,
      phone,
      collegeName,
      course,
      hodName,
      hodPhone,
      transactionId,
      events,
      eventDetails,
      totalAmount,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default registerUserToDB;
