import { gfs } from "../../server";

export const uploadImage = async (req, res) => {
    try {
        if (req.file === undefined) {
            res.json({
                msg: "File not uploaded",
                success: false
            });
        } else {
            res.json({
                msg: req.file.filename,
                success: true
            });
        }
    } catch (error) {
        console.log("error in controllers/images/index.ts/uploadImage =>", error);
        res.json({
            msg: "Error",
            success: false
        });
    }
};

export const getImage = async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("Image not found");
    }
};

export const deleteImage = async (req, res) => {
    try {
        const file = await gfs.files.findOne({
            filename: req.params.filename
        });

        await gfs.files.deleteOne({
            _id: file._id
        });

        gfs.db
            .collection("photos" + ".chunks")
            .remove({ files_id: file._id }, function (err) { });

        res.json({
            msg: "Image deleted",
            success: true
        });
    } catch (error) {
        console.log("error in controllers/images/index.ts/deleteImage =>", error);
        res.json({
            msg: "Error",
            success: false
        });
    }
};
