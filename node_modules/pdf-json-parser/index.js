'use strict';
const PDFJS = require('pdfjs-dist/build/pdf.js');
require('pdfjs-dist/build/pdf.worker.js');

/**
 * Covert pdf to Json
 * @param {Uint8Array} pdf
 * @return {Object}
 */
module.exports = function (str) {
    return readPDFFile(str).then(function (pages) {
        return pages.sort(function (a, b) {
            return a.page - b.page;
        });
    });
}

/**
 * 
 * @param {Uint8Array} pdf
 */
var readPDFFile = function (pdf) {
    return new Promise(function (resolve) {
        return PDFJS.getDocument({
            data: pdf
        }).then(function (PDFDocumentInstance) {
            var totalPages = PDFDocumentInstance._pdfInfo.numPages;
            var pagesPromisesArray = new Array(totalPages + 1).join('0').split('').map(function (
                value, index) {
                return PDFDocumentInstance.getPage(++index);
            });

            var items = [];
            return Promise.all(pagesPromisesArray).then(function (pages) {
                return pages.map(function (page, index) {
                    return Promise.all([getPageText(page), getImages(page)]).then(function (values) {
                        items.push({
                            text: values[0],
                            images: values[1],
                            page: index + 1
                        });
                        if (items.length === pages.length) {
                            return resolve(items);
                        }

                        return items;
                    })
                });
            });
        });
    });
}

/**
 * 
 * @param {*} pdfPage 
 */
var getImages = function (pdfPage) {
    var imagesList = [];
    return pdfPage.getOperatorList().then(function (ops) {
        for (var i = 0; i < ops.fnArray.length; i++) {
            if (ops.fnArray[i] == PDFJS.OPS.paintImageXObject || ops.fnArray[i] == PDFJS.OPS.paintJpegXObject) {
                imagesList.push(pdfPage.objs.getData(ops.argsArray[i][0]).src)
            }
        }

        return imagesList;
    });
}

/**
 * 
 * @param {*} pdfPage 
 */
var getPageText = function (pdfPage) {
    return pdfPage.getTextContent().then(function (textContent) {
        var textItems = textContent.items;
        var finalString = "";
        var yLinePos;

        // Concatenate the string of the item to the final string
        for (var i = 0; i < textItems.length; i++) {
            var item = textItems[i];
            var currentYlinePos = item.transform[5];

            if (currentYlinePos !== yLinePos && finalString) {
                finalString.trim();
                finalString += "\r\n";
            }

            finalString += item.str;
            yLinePos = currentYlinePos;
        }
        return finalString;
    });
}

/**
 * 
 * @param {*} pageNum 
 * @param {*} PDFDocumentInstance 
 */
var getPage = function (pageNum, PDFDocumentInstance) {
    return PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
        return pdfPage;
    });
}