function sanitizeCheck (input){
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    const reg = /[&<>"'`=\/]/g;
    return input.replace(reg, (match)=>(map[match]));
}

module.exports = {sanitizeCheck};