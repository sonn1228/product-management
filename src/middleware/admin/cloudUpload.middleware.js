import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

const { v2: cloudinaryV2 } = cloudinary;

cloudinaryV2.config({
  cloud_name: 'di5h6fj4a',
  api_key: '171191531728459',
  api_secret: 'ZuoaRv1uSOlWmnJZxS5sPxy9D5E',
  secure: true,
});

export const uploadCloud = (req, res, next) => {
  if (req.file) {
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinaryV2.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const upload = async (req, next) => {
      const result = await streamUpload(req);
      req.body[req.file.fieldname] = result.secure_url;
      next();
    };

    upload(req, next);
  } else {
    next();
  }
};
