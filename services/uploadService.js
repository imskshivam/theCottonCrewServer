const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dka9ujhvo',
  api_key: '689244497416562',
  api_secret: 'ov5VjhoIU5LfuFQ-z6zpA9dED0A',
});

async function uploadImage(file) {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  uploadImage,
};
