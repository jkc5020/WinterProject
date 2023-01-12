
# Project title
WinterProject Full Stack Web  App

# Purpose

The purpose of this app is to create a full-stack application using React, Nodejs, and a Microsoft SQL database.

## Design
The website contains two drop down menus. Upon render, a call is made to an API to retrieve all distinct countries in the database.
The first menu is populated with these. After the user selects a country, another API call is made to query all states in the database 
that are of this country. Upon selection of both the country and state, a third API call runs to populate the values of the data analysis
section of the webpage. The React portion of the application is done with functional components, with the useState and useEffect hooks used to re-render the webpage 
according to new selection the user makes with the UI. There is one .get request used to retrieve the list of countries. All other API endpoints are .post requests as they require data to be sent

## Availability
The application runs locally currently, but the database is derived from the [this](https://www.kaggle.com/datasets/thedevastator/analyzing-customer-spending-habits-to-improve-sa?resource=download) dataset 

# Screenshots/Code Snippets
Database table sample
![database](https://user-images.githubusercontent.com/69863203/212089810-2490f347-7b28-4304-b850-608f4b747350.jpg)

The UI when the page first renders
![originalUI](https://user-images.githubusercontent.com/69863203/212089920-56bbf75b-6d68-4145-95fb-3c071eaeedc1.jpg)

The United States and Arizona selected
![USArizona](https://user-images.githubusercontent.com/69863203/212089942-197574f0-087a-4159-8452-c41b38ed2da8.jpg)

France and Loir et Cheir selected
![France](https://user-images.githubusercontent.com/69863203/212089892-faf2f282-d134-4513-aa0f-86867af5d227.jpg)

SQL Code Used for Data Analysis

``` SQL
select * 
from
(select top 1 x.Sub_Category, SUM((x.c * Quantity)) as tQuanity
from
(select Sub_Category, count(Sub_Category) as c, Quantity
	from MasterTable
	where Country = 'United States' and State_Region = 'Washington'
	group by Sub_Category, Quantity
	) x
group by x.Sub_Category
order by tQuanity desc)a cross join

(select distinct top 1 Purchase_Year, COUNT(Purchase_Year) as Count_Year
from MasterTable
where Country = 'United States' and State_Region = 'Washington'
group by Purchase_Year
order by Count_Year desc)b cross join

(select distinct top 1 Purchase_Month, COUNT(Purchase_Month) as count_Month
from MasterTable
where Country = 'United States' and State_Region = 'Washington'
group by Purchase_Month
order by count_Month desc)c cross join

(select f.Female_count, M.Male_count
from(select count(Customer_Gender) as Female_count from MasterTable 
		where Country = 'United States' and State_Region = 'Washington' and Customer_Gender = 'F')f cross join
	(select count(Customer_Gender) as Male_count from MasterTable
		where Country = 'United States' and State_Region = 'Washington' and Customer_Gender = 'M')M)d cross join

(select ROUND(AVG(Customer_Age), 0) as avg_Customer_Age
from MasterTable
where Country = 'United States' and State_Region = 'Washington')e cross join

(select ROUND(MAX(Customer_Age), 0) as Max_Customer_Age
from MasterTable
where Country = 'United States' and State_Region = 'Washington')f cross join

(select ROUND(MIN(Customer_Age), 0) as Min_Customer_Age
from MasterTable
where Country = 'United States' and State_Region = 'Washington')g 
```


# Technologies Used

* React - Used to create the front end
* NodeJS - Used to develop the back end server
* Express 
* Microsoft SQL/ SQL Server 
* SQL Server Management Studio - Used to manage database and develop queries
* Visual Studio Code - Used to develop front end, back end


# Credits
In order to gain the initial understanding of how a full-stack application works and how to start one, the following tutorial was [watched:](https://www.youtube.com/watch?v=Uh2JCSUjA_E)

After learning the basic skills required to set up a project and watching the example of the endpoint being created, most development was done with the assist of stack overflow and [geeksforgeeks](https://www.geeksforgeeks.org/how-to-change-a-selects-options-based-on-another-dropdown-using-react/)

# Status

The project runs locally. Next steps are to investigate ways to run on the internet to allow for a live demo. Other goals are to fix bugs in the dropdown. For example, when a user changes the country, the corresponding index in the new render of the dropdown changes to display the state in the same position as the previous selection. However, this selection is not stored in the code, meaning unless the user is aware of this the API will fail, but not the app.
# Set up, installation

The app was created using create-react-app (see next section for the standard instructions on that), but the following are the libraries specifically 
installed for this project
#### `npm i mssql -- save` -SQL client for Node
#### `npm i nodemon` - restarts server whenever changes detected
#### `npm i cors` - a middleware
#### `npm i express` - lightweight web dev framework

### the following section can be skipped if create-react-app has been already run

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

#### `nodemon .\server.js`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
