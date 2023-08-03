const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    const NODE = 'development'
    res.status(statusCode);

    res.json({
        message : err.message,
        stack: NODE === 'development' ? err.stack : null,
    });
};

module.exports = errorHandler