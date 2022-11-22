import multer from "multer";
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.DATABASE,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (_req, file) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-${file.originalname}`
    };
  }
});

export default multer({ storage });
