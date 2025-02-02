const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0w1S3RzenVQSmdHclFhZmtsVDVUVVkweG95RVBZOTdNb0FSQUJEWG5YYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidXRyeFVmV1ZneUZUdWxjRjZnS1RldllOaE8yL240bEQxbFpYaFhZQlFobz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5R2Vpd3NNQnJvcm9QZnRnM1RHWlBqODVOd2NZNDk1dU9xRllUWVh0cEVVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0QzJWd2xvdlpnMWV0NjltNTFiTk1kMm5rZkt2WDU5b1ZhcXVkNjBIbVc4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitETHpTSHVQVlBYTXNmUnZMSzhCVTNYK01nUmZvTEdkWGl3c0I0a2hHR2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkMyekxwK3RldlIyNTdETmFtQjdFbW1PNk1rQkpSWWkyWXJmWjVqVm1xeHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU1PZDVSRUF3MjdVaUt4SFBKbktIQUN4aFRPaHpRQU5OVldJb000d2FFdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiekNLcTFjTnZlY1FRYzVLaFlmbHRkdWhGbUh6S21mVzEyTVZONEFBSG9Rcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVJS3k5bmlFZVRhcWxhRVFPNmRkZzVHQS9JZERnZkVnYVhZbkt0V24wSnJFT1BROUlhcHhIU3hsRHVBSFVzamc3bUhSd0NqcXNYVi9IYm9Kc2hSL0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM4LCJhZHZTZWNyZXRLZXkiOiJOeFU3UFd4SmorQzdQZ2xVQUU3SDJBMkwzcEVQRFBKT0YzWFRMNnpRY1BnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJlb1pPWmtma1RraXh5MEZ4cDYtNUZBIiwicGhvbmVJZCI6Ijk2NTlmNGZkLTVkZTctNDRmOS05NjMzLWQ3NDlmNTMwMTIyMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4aWpmZ2UrQmJiQ012bmlWUkhSRkkwRU9lc3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVUySDJ4dXBHZTJrbWxReFd6Y3J4M0FtNmJVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlE4SDQySjg2IiwibWUiOnsiaWQiOiIyMzc2ODAzMzM2MDU6NDZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2aqfCdkIvwnZqr8J2QgvCdkIog8J2QhvCdmqrwnZq18J2QmCDwnZCL8J2atfCdmq/wnZq08J2asPCdkIPwnZqr8J2QkiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTjZlNHRBSEVLcSsvTHdHR0JVZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQzJxcWd0MzZJb2p1Z2ZMN1pITEZDc1VIcUlUaWVtKyszSWxISzM2bVlqZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiaFUrUEVXNkpZS2NocDU3em5xMmFUUHZxaU05SnNPbFZmekRWTHJTd1dCaVRQZm40aW9kM3VWMFpQdVo0UmY3U3d3ditWV0p5Mmx3MlJGa3p6a3RxQUE9PSIsImRldmljZVNpZ25hdHVyZSI6ImM5aHdQTGl2VXJ0OXJHT3lRUUpnaHZpVjI0OGZET0dzNXBpUTVobm82aW01bHVLWGMyREhsTW9BTkt4Z3NUb3l2MlhEOW9WYysvVHMvbFNIV3Q3OERBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3NjgwMzMzNjA1OjQ2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlF0cXFvTGQraUtJN29IeSsyUnl4UXJGQjZpRTRucHZ2dHlKUnl0K3BtSTQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mzg0ODE0NjN9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "♛𝚩𝐋𝚫𝐂𝐊 𝐆𝚪𝚵𝐘 𝐋𝚵𝚯𝚴𝚰𝐃𝚫𝐒♛",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "237680333605",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'GREY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
                  ANTIDELETE2 : process.env.ANTIDELETE2 || "no",
                  ANTIDELETE1 : process.env.ANTIDELETE1 || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANYWAY_MD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
