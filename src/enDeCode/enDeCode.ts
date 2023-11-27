import * as crypto from 'crypto';


const secretKey: string = 'nolan';

function encrypt(text: string): string {
    const key = crypto.scryptSync(secretKey, 'salt', 32); // 32 is the key length for aes-256
    const iv = crypto.randomBytes(16); // 16 is the IV length for aes-256-cbc
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
}

function decryptt(encryptedText: string): string {
    const key = crypto.scryptSync(secretKey, 'salt', 32);
    const iv = Buffer.from(encryptedText.slice(0, 32), 'hex'); // Extract IV from the first 32 characters
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText.slice(32), 'hex', 'utf-8'); // Remove IV from the encrypted text
    decrypted += decipher.final('utf-8');
    return decrypted;
}

export { encrypt, decryptt };
