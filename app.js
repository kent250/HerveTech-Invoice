const express = require('express');
const path = require('path');
const cors = require('cors');
const pdf = require('html-pdf');  // Import html-pdf
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function generateInvoiceHtml(client, items, labourAmount) {
    const date = new Date().toLocaleDateString();
    let totalAmount = 0;
    const itemRows = items.map((item, index) => {
        const itemTotal = item.quantity * item.price;
        totalAmount += itemTotal;
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.price} Rwf</td>
                <td>${itemTotal} Rwf</td>
            </tr>
        `;
    }).join('');

    const grandTotal = totalAmount + labourAmount;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Proforma Invoice</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
            h1 { text-align: center; }
            .invoice-container { max-width: 800px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
            .section { margin-bottom: 20px; }
            .section-header { font-weight: bold; margin-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            table, th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f4f4f4; }
            .total-row { font-weight: bold; }
            .technician-details { margin-top: 30px; }
        </style>
    </head>
    <body>
        <div class="invoice-container">
            <h1>Proforma Invoice</h1>
            <div class="section">
                <div class="section-header">Client Details:</div>
                <p>Name: ${client.name}</p>
                <p>Contact: ${client.phone}</p>
            </div>
            <div class="section">
                <p>Date: ${date}</p>
                <p>Invoice For: ${client.invoiceFor}</p>
            </div>
            <table>
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
                        <td>${totalAmount} Rwf</td>
                    </tr>
                    <tr class="total-row">
                        <td colspan="4">Labour</td>
                        <td>${labourAmount} Rwf</td>
                    </tr>
                    <tr class="total-row">
                        <td colspan="4">Grand Total</td>
                        <td>${grandTotal} Rwf</td>
                    </tr>
                </tbody>
            </table>
            <div class="section technician-details">
                <div class="section-header">Technician Details:</div>
                <p>Name: Mugabo Herve</p>
                <p>Contact: +250788861535</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

app.post('/generateInvoice', (req, res) => {
    const { client, items, labourAmount } = req.body;
    const invoiceHTML = generateInvoiceHtml(client, items, labourAmount);

    // Convert HTML to PDF
    pdf.create(invoiceHTML, {}).toBuffer((err, buffer) => {
        if (err) {
            return res.status(500).send('Error generating PDF');
        }

        // Set response headers to download PDF
        res.setHeader('Content-Disposition', 'attachment;filename=invoice.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(buffer);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
