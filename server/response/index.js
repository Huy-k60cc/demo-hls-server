module.exports = {
    success: function (req, res, data) {
        res.status(200);
        return res.json(data);
    },
}