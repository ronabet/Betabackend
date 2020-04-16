'use strict';

var expect = require('chai').expect;
var pdfToJson = require('../index');
const fs = require('fs');

describe('#pdfToJson', function () {
    it('should convert to json', function () {
        fs.readFile('test/test.pdf', (err, data) => {
            if (err) throw err;
            pdfToJson(new Uint8Array(data)).then(function (data) {
                expect(data[0].text).to.equal('This will copy your local module into the node_modules folder, \r\nthe same way it would do with a repository or git hosted module. \r\nObviously, this means your local module should have its \r\nown package.json, README.md, etc, like any regular node mod-\r\nule. \r\n \r\n \r\n \r\n ');
            });
        });
    });
});