const fonts = {
    Roboto: {
        normal: 'public/fonts/Roboto-Regular.ttf',
        bold: 'public/fonts/Roboto-Medium.ttf',
        italics: 'public/fonts/Roboto-Italic.ttf',
        bolditalics: 'public/fonts/Roboto-MediumItalic.ttf'
    }
};

const PdfPrinter = require('pdfmake');
const printer = new PdfPrinter(fonts);
const fs = require('fs');
const path = require('path');

const makePDF = (data) => {
    const docDefinition = {
        pageSize: 'A4',
        content: [
            { text: `Welcome, ${data.name}` },
            {
                style: 'tableExample',
                table: {
                    headers: ['Products', 'Quantity', 'Price', 'Total_Price'],
                    body: [
                        ['Mobile', '2', '15,000', '30,000'],
                        ['Laptop', '1', '27,500', '27,500'],
                        ['Tablet', '3', '10,000', '30,000'],
                        ['Computer', '3', '20,000', '60,000'],
                    ],
                }
            },
            { text: 'Total Amount: 147,500' },
            `Shipping Address: ${data.address}`,
            { text: 'Thank You!' },
            'BitKhanan IT Education'
        ]
    }
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(path.join(__dirname, 'pdfs/example.pdf')));
    pdfDoc.end();
}

module.exports = makePDF