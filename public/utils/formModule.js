
import { invoiceModule } from './invoiceModule.js';
let itemCount = 0;

export const formModule = {
    createItemFields() {
        itemCount++;
        const itemContainer = document.createElement('div');
        itemContainer.className = 'item-container';
        itemContainer.id = `item-${itemCount}`;

        itemContainer.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label for="name-${itemCount}">Item Name</label>
                    <input type="text" id="name-${itemCount}" required>
                </div>
                <div class="form-group">
                    <label for="quantity-${itemCount}">Quantity</label>
                    <input type="number" id="quantity-${itemCount}" required min="1">
                </div>
                <div class="form-group">
                    <label for="price-${itemCount}">Price/item</label>
                    <input type="number" id="price-${itemCount}" step="0.01" required min="0">
                </div>
            </div>
            ${itemCount > 1 ? `<button type="button" class="btn btn-danger" onclick="formModule.removeItem(${itemCount})">Remove</button>` : ''}
        `;

        document.getElementById('itemsContainer').appendChild(itemContainer);
    },

    removeItem(id) {
        const item = document.getElementById(`item-${id}`);
        item.remove();
    },

    collectFormData() {
        return {
            client: this.getClientData(),
            items: this.getItemsData(),
            labourAmount: this.getLabourAmount()
        };
    },

    getClientData() {
        return {
            name: document.getElementById('clientName').value,
            phone: document.getElementById('clientPhone').value,
            invoiceFor: document.getElementById('invoiceFor').value
        };
    },

    getItemsData() {
        const items = [];
        const containers = document.querySelectorAll('.item-container');

        containers.forEach(container => {
            const id = container.id.split('-')[1];
            items.push({
                name: document.getElementById(`name-${id}`).value,
                quantity: Number(document.getElementById(`quantity-${id}`).value),
                price: Number(document.getElementById(`price-${id}`).value)
            });
        });

        return items;
    },

    getLabourAmount() {
        return Number(document.getElementById('labourAmount').value);
    },

    resetForm() {
        document.getElementById('itemForm').reset();
        document.getElementById('itemsContainer').innerHTML = '';
        this.createItemFields();
    },

    setupFormListeners() {
        document.getElementById('addItemBtn').addEventListener('click', () => this.createItemFields());
        document.getElementById('itemForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const formData = this.collectFormData();
                await invoiceModule.generateAndDownloadPDF(formData);
                this.resetForm();
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Error generating PDF. Please try again.');
            }
        });
    }
};
