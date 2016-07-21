This assignment is designed to give us a good sense of how you code as well as give you a glimpse of how our system works. 
It is a javascript integration with the Weather Underground API. 

Deliverable:
An HTML file, or if you want to split out js/css, feel free to use multiple files.

API Documentation to use:
http://www.wunderground.com/weather/api/d/docs?d=data/forecast10day
http://www.wunderground.com/weather/api/d/docs?d=resources/icon-sets

API Key: 
6ea7cf3bc006012f

Assignment: 
Create an HTML file that is reactive to the query string at the end of the URL. The query strings are 'zip_code' and 'date'.
For example, if the file is index.html, it should be reactive to: index.html?zip_code=10011&date=04/10/2016

- Use API data to create a page with the attached creative spec 
- The 'zip_code' param should be use as part of the API request
- The 'date' param should be use to extract the corresponding forecasts from the API response (assume the merged in "date" will be within the next ten days)
- Use Helvetica for all fonts instead of what is in the image 
- Link to the icons used in the creative is above
- If the page must error out, it should appear as a blank page (completely blank)
- You may use jQuery

Lastly, when you send the completed assignment, please outline any gotchas that the end user may experience.  
In other words, what instructions / explanations can you provide to ensure that the end user does not break what you've built?
