const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create User (Sign Up)
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ error: "User registration failed" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("Login request received with email:", email); // Log email
    try {
        const user = await User.findOne({ email });
        if (user) {
            console.log("User found:", user);
        } else {
            console.log("User not found.");
        }
        if (user && user.password === password) {
            res.status(200).json({ message: "Login successful", user });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.log("Error during login:", err);
        res.status(400).json({ error: "Login failed" });
    }
});

// Route for fetching achievements
router.post("/achievements", async (req, res) => {
    const { email } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return achievements as response
        res.status(200).json({ achievements: user.achievements });
    } catch (error) {
        console.error("Error fetching achievements:", error);
        res.status(500).json({ error: "Failed to fetch achievements" });
    }
});


router.post("/progress", async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ achievements: user.achievements });
});

router.put("/achievements", async (req, res) => {
    console.log("Request received at /achievements");

    const { email, achievements } = req.body;

    console.log("Request body:", req.body);

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }
    if (!achievements) {
        return res.status(400).json({ error: "Achievements are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(404).json({ error: "User not found" });
        }

        console.log("User found:", user);

        const updatedAchievements = {
            ...user.achievements,
            ...achievements,
        };

        user.achievements = updatedAchievements;
        await user.save();

        console.log("Achievements updated successfully:", updatedAchievements);

        res.status(200).json({ message: "Achievements updated", achievements: updatedAchievements });
    } catch (err) {
        console.error("Error while updating achievements:", err);
        res.status(500).json({ error: "Failed to update achievements" });
    }
});


module.exports = router;
