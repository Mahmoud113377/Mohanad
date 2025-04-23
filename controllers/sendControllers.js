import User from "../models/user.js";
import nodemailer from "nodemailer";

const sendMessage = async (req, res) => {
    const { Name, Email, Subject, Message } = req.body;
    if (!Name || !Email || !Subject || !Message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const NameMatch = /^[a-zA-Z\s]+$/;
    const EmailMatch = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const SubjectMatch = /^[a-zA-Z\s]+$/;
    
    if (!NameMatch.test(Name)) {
        return res.status(400).json({ error: 'Invalid Name' });
    }
    if (!EmailMatch.test(Email)) {
        return res.status(400).json({ error: 'Invalid Email' });
    }
    if (!SubjectMatch.test(Subject)) {
        return res.status(400).json({ error: 'Invalid Subject' });
    }
    if (Message.length < 5) {
        return res.status(400).json({ error: 'Message must be at least 10 characters long' });
    }
    if (Message.length > 500) {
        return res.status(400).json({ error: 'Message must be less than 500 characters' });
    }
   


    try {
        // Save the message to the database
        const newUser = new User({ Name, Email, Subject, Message });
        await newUser.save();

        // Send email using nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            subject: `New message from ${Name}`,
            html: `
                <h3>Name: ${Name}</h3>
                <h4>Email: ${Email}</h4>
                <h4>Subject: ${Subject}</h4>
                <p>${Message}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Message stored and email sent successfully!' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Failed to process message' });
    }
}
export { sendMessage };