import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
    if (!isValidObjectId.params.id) {
        res.status(404)
        throw new Error(`Invalid object of: ${req.params.id}`)
    }

    next()
}

export default checkId