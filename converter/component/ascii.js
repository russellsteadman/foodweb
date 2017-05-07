var asciiHelper = function () {

    this.convert = function (raw,allowBoolean) {
        var newline = (/\r/g.test(raw)?"\r":"")+(/\n/g.test(raw)?"\n":"");
        raw = raw.split(newline);
        var addition = {};
        for (var i in raw) {
            raw[i] = raw[i].split('^');
            for (var o in raw[i]) {
                if (/^(-?[1-9]+\d*([.]\d+)?)$|^(-?0[.]\d*[1-9]+)$|^0$|^0.0$/.test(raw[i][o])) raw[i][o] = Number(raw[i][o]);
                if (typeof raw[i][o] === 'string') raw[i][o] = raw[i][o].replace(/^~(.*?)~$/,'$1');
                if (raw[i][o] === 'Y'&&allowBoolean) raw[i][o] = true;
                if (raw[i][o] === 'N'&&allowBoolean) raw[i][o] = false;
            }
        }
        return raw;
    };

};

module.exports = new asciiHelper();