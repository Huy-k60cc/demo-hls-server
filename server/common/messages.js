var dict = {
    'vi': require('../const/errdef/vi'),
};
module.exports = {
    getMessageByLang: function (code, lang) {
        if (!lang) lang = 'vi';
        return dict[lang][code];
    }
}