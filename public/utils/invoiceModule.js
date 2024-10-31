import { CONFIG } from './constants.js';

export const invoiceModule = {
    calculateTotals(items, labourAmount) {
        const itemsTotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        return {
            itemsTotal,
            grandTotal: itemsTotal + labourAmount
        };
    },

    generateItemRows(items) {
        return items.map((item, index) => {
            const itemTotal = item.quantity * item.price;
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price} ${CONFIG.CURRENCY}</td>
                    <td>${itemTotal} ${CONFIG.CURRENCY}</td>
                </tr>
            `;
        }).join('');
    },

    generateInvoiceHTML(data) {
        const date = new Date().toLocaleDateString();
        const { itemsTotal, grandTotal } = this.calculateTotals(data.items, data.labourAmount);
        const itemRows = this.generateItemRows(data.items);

        return `
            <div class="invoice-container">
                <h1 style="text-align: center">Proforma Invoice</h1>
                <div class="section">
                    <div class="section-header" style="font-weight: bold">Client Details:</div>
                    <p><b>Name:</b> ${data.client.name}</p>
                    <p><b>Contact:</b> ${data.client.phone}</p>
                </div>
                <br>
                <div class="section">
                    <div class="section-header" style="font-weight: bold">Invoice Details:</div>
                    <p><b>Invoice For:</b> ${data.client.invoiceFor}</p>
                    <p><b>Date:</b> ${date}</p>
                </div>
                <table class="invoice-table">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>ITEM</th>
                            <th>QTY</th>
                            <th>PRICE/ITEM</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemRows}
                        <tr class="total-row">
                            <td colspan="4">Total</td>
                            <td>${itemsTotal} ${CONFIG.CURRENCY}</td>
                        </tr>
                        <tr>
                            <td colspan="4">Labour</td>
                            <td>${data.labourAmount} ${CONFIG.CURRENCY}</td>
                        </tr>
                        <tr class="total-row">
                            <td colspan="4">Grand Total</td>
                            <td>${grandTotal} ${CONFIG.CURRENCY}</td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <div class="section technician-details">
                    <div class="section-header" style="font-weight: bold">Technician Details:</div>
                    <p><b>Name:</b> ${CONFIG.TECHNICIAN_NAME}</p>
                    <p><b>Contact:</b> ${CONFIG.TECHNICIAN_CONTACT}</p>
                </div>
            </div>
        `;
    },

    async generateAndDownloadPDF(formData) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const pdfContainer = document.getElementById('pdfContainer');
        pdfContainer.innerHTML = this.generateInvoiceHTML(formData);

        const invoice = pdfContainer.querySelector('.invoice-container');
        const canvas = await html2canvas(invoice, CONFIG.PDF_SETTINGS);

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        doc.save('invoice.pdf');

        pdfContainer.innerHTML = '';
    }
};