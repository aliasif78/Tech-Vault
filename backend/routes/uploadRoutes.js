import path from 'path'
import express from 'express'
import multer from 'multer'
import { deflate } from 'zlib'

const router = express.Router()

// Where and how to store the uploaded file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Directory where it will be stored
        cb(null, 'uploads/')
    },

    filename: (req, file, cb) => {
        // Get the file extension
        const extensionName = path.extname(file.originalname)

        // Generate a unique name for the file
        cb(null, `${file.fieldname}-${Date.now()}${extensionName}`)
    }
})

// To check if the correct file is being uploaded
const fileFilter = (req, file, cb) => {
    // Only allow these file extensions
    const filetypes = /jpe?g|png|webp/

    // Only allow image files with these file extensions
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/

    // Get the file extension and the mime types
    const extname = path.extname(file.originalname).toLowerCase()
    const mimetype = file.mimetype

    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        // Correct file has been uploaded
        cb(null, true)
    }

    else {
        // Incorrect file has been uploaded
        cb(new Error("Images only"), false)
    }
}

const upload = multer({ storage, fileFilter })
const uploadSingleImage = upload.single('image')

router.post('/', (req, res) => {
    uploadSingleImage(req, res, (err) => {

        if (err) {
            res.status(400).send({ message: err.message })
        }

        else if (req.file) {
            res.status(200).send({
                message: "Image uploaded successfully",
                image: `/${req.file.path}`
            })
        }

        else {
            res.status(400).send({ message: "No image file provided." })
        }
    })
})

export default router