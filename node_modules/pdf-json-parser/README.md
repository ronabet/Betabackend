## 1. Installation
`npm install -S pdf-json-parser`

## 2. Usage
```javascript
var pdfToJson = require('pdf-to-json');
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
```
