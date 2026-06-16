const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { Settings } = require('../models');

const LOG_FILE = path.join(__dirname, '../mailer.log');

function debugLog(msg) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ${msg}\n`;
    fs.appendFileSync(LOG_FILE, line);
    console.log(msg);
}

let cachedTransporter = null;

/**
 * Get email transporter based on settings
 */
async function getTransporter() {
    if (cachedTransporter) return cachedTransporter;

    debugLog('Initializing email transporter...');

    // Try to use environment variables first
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        debugLog('Using Gmail service from environment variables.');
        cachedTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });
        return cachedTransporter;
    }

    // Fallback to database settings
    const settings = await Settings.findOne();
    if (settings && settings.smtpHost && settings.smtpHost !== 'smtp.example.com') {
        debugLog('Using SMTP settings from database: ' + settings.smtpHost);
        cachedTransporter = nodemailer.createTransport({
            host: settings.smtpHost,
            port: parseInt(settings.smtpPort) || 587,
            secure: settings.smtpPort == '465',
            auth: {
                user: settings.smtpUser,
                pass: settings.smtpPassword,
            },
        });
        return cachedTransporter;
    }

    debugLog('No valid email configuration found (env or DB). Email dispatch will fail.');
    return null;
}

/**
 * Send an email
 */
async function sendEmail({ to, subject, html, text }) {
    debugLog(`Attempting to send email to: ${to} | Subject: ${subject}`);
    try {
        const transporter = await getTransporter();
        if (!transporter) {
            debugLog('Email failed: No transporter configured.');
            return false;
        }

        const settings = await Settings.findOne();
        const fromName = settings?.siteName || 'Real Estate Platform';
        const fromEmail = process.env.GMAIL_USER || settings?.smtpUser || 'no-reply@example.com';

        const info = await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to,
            subject,
            text,
            html,
        });

        debugLog('Email sent successfully! Message ID: ' + info.messageId);
        return true;
    } catch (error) {
        debugLog('CRITICAL: Error in sendEmail: ' + error.message);
        return false;
    }
}

module.exports = { sendEmail };
