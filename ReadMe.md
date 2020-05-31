# Natural Language Processing application
## Overview
1. This application allow you to scrap websites.
2. You can then predict the sentiment and cosine similarity of the chosen text within, using tf*idf

## Quick overview of the NLP portion
1. To view only the NLP analysis portion, open the Jupyter Notebook files under the Jupyter folder, 

## Instructions to run the application
1. The relevant folders are under the NLP Folder
2. Make sure you have MSSQL server up and running.
3. Run the ASP Core application in IIS express. This application is reponsible for scrapping websites and saving the results.
	- Go to appsettings.json. Under ConnectionStrings > MSSQL, change the server name to that of your local server
4. Run the Fast Api Python application in an IDE of your choice. This application is responsible for the NLP analysis.
	- Activate the virtual environment by first navigating to `NLP\fastApi`, and then typing `venv\Scripts\activate` in the terminal
	- Type `pip install -r requirements.txt` to install the dependencies.
	- Type `uvicorn main:app --reload` to run the application. 
5. Run the React application in an IDE of your choice. 
	- Type `npm install` to install the dependencies. 
	- Then type `npm start` to run the application
