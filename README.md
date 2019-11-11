# Description

A pre-built, dependency-bundled version of WeasyPrint for 64-bit Windows OS.

Features:
- Pre-bundled dependencies (Python3 & GTK+)
- Simple NodeJS api

Todo:
- Write API docs

# Usage

## Example 1

```js
const WeasyPrint = require('@flamescape/weasyprint-win');

const wp = new WeasyPrint();

const pdf = await wp.fromString('<body>Hello World</body>');
await pdf.toFile('./test.pdf'); // writes to ./test.pdf
```

# API

- [Class: WeasyPrint](#class-weasyprint)
  - [new WeasyPrint()](#new-weasyprint)
  - [wp.fromString(html[, baseUrl])](#wpfromString)
  - [wp.fromBuffer(buffer[, baseUrl])](#wpfromBuffer)
  - [wp.fromStream(stream[, baseUrl])](#wpfromStream)
  - [wp.fromFile(filepath[, baseUrl])](#wpfromFile)
- [Class: WeasyPrintPDF](#class-weasyprintpdf)
  - [pdf.toFile(filepath)](#pdftoFile)
  - [pdf.toStream()](#pdftoStream)
  - [pdf.toBuffer()](#pdftoBuffer)

### Class: WeasyPrint

### Class: WeasyPrintPDF
