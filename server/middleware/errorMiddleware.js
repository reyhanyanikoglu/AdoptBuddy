//bulunmayan rotalar için
const notFound = (req,res,next) => {
    const error = new Error(`Not found - ${req.originalUrl}`) //bulunamayan url
    res.status(404)
    next(error)
}

const errorHandler = (error, req, res, next) => {
    if(res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500).json({message: error.message || "An unknow error occured"})
}

module.exports = {notFound,errorHandler}