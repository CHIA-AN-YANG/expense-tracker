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
```bash
npm run seed
```
This category seeder should only be executed once. Otherwise, there will be redundant categories.
```bash
npm run categorySeed
```
### Run on browser
The npm used in this project is **6.14.12**. This project is built under **Node.js v14.16.1** runtime environment, with Express framework. To start it on local server, simply run the app.js file with `node` command in CLI:

```bash
node app.js
```
If you wish to automatically restarting the node application when file changes are detected, you may run nodemon.

```bash
nodemon app.js
```
You can also take advantage of the script:
```bash
npm run dev
```
Now, enter http://localhost:3000/ in your browser to see it on the browser!

### Delete all records
The link http://localhost:3000/destroy will remove all data in your records. Please use with caution.

## Contact
Feel free to drop me a line and let me know how can I make this project better