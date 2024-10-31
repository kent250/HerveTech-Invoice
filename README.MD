# Invoice Generator Application

This application was born out of a need to simplify a recurring task. ✨ I frequently created invoices for a friend of mine, and while handling a few invoices a week was manageable, the constant back-and-forth of revisions became quite burdensome. To streamline this process and reduce stress, I decided to develop this app, allowing for a more efficient way to handle invoices and saving everyone time and frustration. ⏱️

## Features

- **Invoice Creation**: Generate invoices in PDF format easily.
- **Dynamic Item Management**: Add or remove invoice items dynamically.
- **Client and Technician Details**: Input and display client and technician information.
- **User-Friendly Interface**: Intuitive design for seamless user experience.

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: HTML, CSS, JavaScript
- **PDF Generation**: jsPDF, html2canvas

## Prerequisites

- **Node.js** and **npm** installed

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kent250/invoice-generator.git
   cd invoice-generator
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the Application Locally:**

   ```bash
   node app.js
   ```

   The application will be accessible at `http://localhost:3000`.

## File Structure

```
.
├── public
│   ├── js
│   │   └── app.js
│   └── utils
│       ├── constants.js
│       ├── formModule.js
│       └── invoiceModule.js
├── app.js
└── .env
```

### Main Files

- **app.js**: Entry point of the application that sets up the Express server and handles routing.
- **public/js/app.js**: Initializes the application and sets up event listeners for form handling.
- **public/utils/constants.js**: Contains configuration constants for the application.
- **public/utils/formModule.js**: Manages form creation, submission, and data collection.
- **public/utils/invoiceModule.js**: Handles invoice calculations and PDF generation.

## Usage

1. Navigate to `http://localhost:3000/dev` to view developer information.
2. Use the frontend form to input client details and item information for generating invoices.
3. Submit the form to generate and download the invoice as a PDF.

## Troubleshooting

- **PDF Generation Issues**: Ensure `html2canvas` and `jsPDF` libraries are included correctly.
