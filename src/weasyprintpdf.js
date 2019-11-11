const path = require('path');
const tmp = require('tmp-promise');
const fs = require('fs-extra');

class WeasyPrintPDF {
    constructor({weasyprint, html, baseHref}) {
        this.weasyprint = weasyprint;
        this.html = html;
        this.baseHref = baseHref;
    }

    async saveTempHtml() {
        const {fd, path, cleanup} = await tmp.file({postfix:'.html'});
        await fs.writeFile(fd, this.html);
        return {path, cleanup};
    }

    async toFile(filepath) {
        let tmpHtml;
        try {
            tmpHtml = await this.saveTempHtml();
            await this.weasyprint.exec(this.baseHref, tmpHtml.path, filepath);
            return filepath;
        } catch (err) {
            throw err;
        } finally {
            tmpHtml.cleanup && tmpHtml.cleanup();
        }
    }

    async toStream() {
        let tmpOut = await tmp.file({postfix:'.pdf'});
        const pdfPath = await this.toFile(tmpOut.path);
        const stream = fs.createReadStream(pdfPath);
        stream.on('end', () => tmpOut.cleanup());
        stream.on('error', () => tmpOut.cleanup());
        return stream;
    }

    async toBuffer() {
        let tmpOut;
        try {
            tmpOut = await tmp.file({postfix:'.pdf'});
            const pdfPath = await this.toFile(tmpOut.path);
            return await fs.readFile(pdfPath);
        } catch (err) {
            throw err;
        } finally {
            tmpOut.cleanup && tmpOut.cleanup();
        }
    }
}

module.exports = WeasyPrintPDF;
