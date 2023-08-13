# inventory-management-system_assessment
This is a web application that provides functionalities for inventory management, user authentication, sales recording, and generating reports. The application allows users to manage their inventory items, record sales, and generate various reports related to sales, items, and customer transactions.

##Link

The Inventory Management System is deployed at:https://astounding-truffle-8eaad3.netlify.app/


#Installation
1. Clone the repository: https://github.com/Anurag-M-K/inventory-management-system_assessment.git
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Start the frontend : `npm run dev`
5.frontend env : VITE_APP_BACKEND_URL = http://localhost:8000/api 


## Features

1. **User Authentication**: Users can log in to access the application and perform various actions based on their role and permissions.

2. **Inventory Management**:
   - Add New Items: Users can add new items to the inventory with details like name, description, quantity, and price.
   - CRUD Functionality: Basic CRUD operations are supported to manage inventory items, enabling users to create, read, update, and delete items.
   - Search: Users can search for items based on their name or description.
   - Add New Customers: Users can add new customers to the system with details like name, address, and mobile number.

3. **Sales Recording**:
   - Record Sales: Users can record sales of inventory items with details like date, quantity, customer name, and payment method (cash).
   
4. **Reports**:
   - Sales Report: Generate a sales report that provides an overview of all sales transactions.
   - Items Report: Generate a report that displays detailed information about inventory items.
   - Customer Ledger: Generate a report that shows all transactions related to a specific customer, helping track their purchases and payments.

5. **Data Export**:
   - Print: Export data in a printable format.
   - Excel: Export data in Excel format for further analysis and record-keeping.
   - PDF: Export data in PDF format for easy sharing and viewing.
   - Email: Send data via email to specified recipients.
   
