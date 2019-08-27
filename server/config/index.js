module.exports = {
    server: {
        secret: process.env.HLS_SECRET || 'secret',
        port: process.env.HLS_PORT || 3333,
    }
};