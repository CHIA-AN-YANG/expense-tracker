# expense-tracker

Expense-tracker helps you record your expenses.

## Installation
This project has an online version deployed with heroku server: 
https://serene-mountain-30107.herokuapp.com/

To run it locally, you can clone this project from here: 
[github link](https://github.com/CHIA-AN-YANG/expense-tracker)

Clone with HTTPs:

```bash
git clone https://github.com/CHIA-AN-YANG/expense-tracker.git
```
Alternatively, clone with SSH:
```bash
git clone git@github.com:CHIA-AN-YANG/expense-tracker.git
```
Run npm install to install required plug-ins.

```bash
npm install
```
## About the Webpage

1. Click on the nav bar links to switch between home page and create new record page.
2. Record your money with categorized records. You can also edit and delete them. 

## Usage
### Set up
Download mongoDB Campass to set up your own local database.
### Seeding
There are two seeder files for this project. Simply use the following command to seed:
This is for category seeder. It should only be executed once. Otherwise, there will be redundant categories.
```bash
npm run categorySeed
```
This command is for records. Only use it after category is seeded. It requires Category's ObjectId (from Category Model).
```bash
npm run recordSeed
```
### Run on browser
The npm used in this project is **6.14.12**. This project is built under **Node.js v14.16.1** runtime environment, with Express framework. To start it on local server, simply run the app.js file with `node` command in CLI:

```bash
node app.js
```
Or use the script:
```bash
npm run start
```
If you wish to automatically restarting the node application when file changes are detected, you may run nodemon.

```bash
nodemon app.js
```
You can also take advantage of the script:
```bash
npm run dev
```
Now, enter http://localhost:3000/ in your browser to see it on web!

### Delete all records
In order to re-run seeder files, you can delete all documents first:
The link http://localhost:3000/records/destroy will remove all data in your records. Please use with caution.
The link http://localhost:3000/categories/destroy will remove all data in your records. Please use with caution.

## Contact
Feel free to drop me a line about this project, and let me know how to make it better.
Email: chiaan.y.creativeworker@gmail.com