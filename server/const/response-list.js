function createJsonMessage(errcode, errmsg, data) {
    return {
        EC: errcode,
        EM: errmsg,
        d: data,
    }
}

module.exports = {
    success: function (errcode, errmsg, data) {
        return createJsonMessage("ok", errmsg, data);
    },
    errBusiness: function (errcode, errmsg, data) {
        return createJsonMessage("error", errmsg, data);
    }
}