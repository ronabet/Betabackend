var pdfToJson = require('../index.js');
fetch('/test/test.pdf').then((response) => {
    return response.blob();
}).then((response) => {
    var fileReader = new FileReader();
    fileReader.onload = function (e) {
        pdfToJson(new Uint8Array(e.target.result)).then(function (pages) {
            pages.forEach(element => {
                var div = document.createElement('div');
                div.innerHTML = ('<span>' + element.text + '</span><img src="' + element.images[0] + '">');
                document.getElementById('app').append(div);
            });
        });
    };
    fileReader.readAsArrayBuffer(response);
});