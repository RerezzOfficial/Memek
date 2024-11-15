
const axios = require('axios'); 
const fs = require('fs');
const FormData = require('form-data');

// Fungsi untuk mengupload gambar ke ImgBB
async function uploadToImgBB(imagePath) {
    return new Promise(async (resolve, reject) => {
        if (!fs.existsSync(imagePath)) return reject(new Error("File tidak ditemukan"));

        try {
            const form = new FormData();
            form.append('image', fs.createReadStream(imagePath));

            const response = await axios({
                method: 'post',
                url: 'https://api.imgbb.com/1/upload',
                params: {
                    key: 'da5518a384007ee98f91f18cda4dbab6' // Ganti dengan API key ImgBB kamu
                },
                headers: {
                    ...form.getHeaders()
                },
                data: form
            });

            const imageUrl = response.data.data.url; // Mengambil link hasil upload
            resolve(imageUrl);
        } catch (error) {
            reject(new Error(`Error upload ke ImgBB: ${error.message}`));
        }
    });
}

// file io lu
async function uploadToFileio(filePath) {
    return new Promise(async (resolve, reject) => {
        if (!fs.existsSync(filePath)) return reject(new Error("File tidak ditemukan"));

        try {
            const form = new FormData();
            form.append('file', fs.createReadStream(filePath));

            const response = await axios({
                method: 'post',
                url: 'https://file.io',
                headers: {
                    ...form.getHeaders()
                },
                data: form
            });

            const fileUrl = response.data.link; // Mengambil link hasil upload
            resolve(fileUrl);
        } catch (error) {
            reject(new Error(`Error upload ke File.io: ${error.message}`));
        }
    });
}

module.exports = { uploadToImgBB, uploadToFileio };