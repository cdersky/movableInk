# How to use:
* Fork and clone this repository. 
* Open the index.html file in the browser. 
* Add a query string, for example: 
  * ` index.html?zip_code=10011&date=07/26/2016 `
* If the query is valid, the page will automatically render weather data. Otherwise the page will remain blank.


# Gotchas
* (1) Weather data will not render in Safari.
* (2) _Lastly, when you send the completed assignment, please outline any gotchas that the end user may experience. In other words, what instructions / explanations can you provide to ensure that the end user does not break what you've built?_ -- I'm unsure by what you means by this question. This is not meant for user interaction. Specifically the user does not do anything actively. I assumed that the date and zip code are grabbed passivley. The code verifies the data. If they are not valid, the DOM renders a blank screen. If those data are valid, the weather is displayed.

* Note: if the merge date is not within the first 8 days of the 10-day forecast, no weather data will render. In other words there must be three days of weather data available for any data to display. It's all or nothing.
