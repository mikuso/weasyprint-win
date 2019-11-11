const WeasyPrintPDF = require('./weasyprintpdf');
const execa = require('execa');
const path = require('path');
const fs = require('fs-extra');
const concat = require('concat-stream');

class WeasyPrint {
    constructor() {
        const wpPath = path.resolve(__dirname, '..');
        this.pythonDir = path.resolve(wpPath, 'python3');
        this.pythonExe = path.resolve(this.pythonDir, 'python.exe');
        this.gtkBin = path.resolve(wpPath, 'gtk/bin');
    }

    async exec(baseUrl, inFile, outFile) {
        const env = {
            PATH: [
                this.gtkBin,
                this.pythonDir,
                path.resolve(this.pythonDir, './Lib'),
                path.resolve(this.pythonDir, './Lib/site-packages'),
            ].join(';'),
        };

        return await execa(this.pythonExe, [
            '-m',
            'weasyprint',
            '-u',
            baseUrl,
            inFile,
            outFile
        ], {env, extendEnv: false});
    }

    async fromString(html, baseHref) {
        return new WeasyPrintPDF({
            weasyprint: this,
            html,
            baseHref
        });
    }

    async fromBuffer(buffer, baseHref) {
        return await this.fromString(buffer.toString('utf8'), baseHref);
    }

    async fromStream(readableStream, baseHref) {
        const html = await new Promise((resolve, reject) => {
            readableStream.on('error', reject);
            readableStream.pipe(concat(resolve));
        });
        return new WeasyPrintPDF({
            weasyprint: this,
            html,
            baseHref
        });
    }

    async fromFile(filepath, baseHref) {
        const html = await fs.readFile(filepath, 'utf8'); // get file
        return new WeasyPrintPDF({
            weasyprint: this,
            html,
            baseHref: baseHref || path.dirname(filepath)
        });
    }
}

module.exports = WeasyPrint;
