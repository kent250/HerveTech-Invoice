import { CONFIG } from '../utils/constants.js';
import { formModule } from '../utils/formModule.js';
import { invoiceModule } from '../utils/invoiceModule.js';

function initializeApp() {
    formModule.createItemFields();
    formModule.setupFormListeners();
}

document.addEventListener('DOMContentLoaded', initializeApp);