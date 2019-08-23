module.exports = {
    server: {
        secret: process.env.HLS_SECRET,
        port: process.env.HLS_PORT || 3333,
    }
};