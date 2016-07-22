$(document).ready(showQuery());

function showQuery(){
  var validQuery = false;
  var mergeDateIndex;
  var isValidQuery = {
    zip_code : false,
    date : false
  };

  // grab an format search query
  var pageQuery = window.location.search; //grab search
  pageQuery = pageQuery.substr(1); // remove '?' at the head of string
  pageQueryArr = pageQuery.split('&'); // put each query pair in an array index
  
  // check if query is valid, must have at least 2 search items
  if (pageQueryArr.length < 2){ // if less than 2 queries - invalid search
    return;
  }

  // check if query is valid, must contain zip_code and date
  for(var i = 0; i < pageQueryArr.length; i++){
    
    // split search into key value pairs
    var searchPair = pageQueryArr[i].split('=');    
    var searchKey = searchPair[0];
    var searchValue = searchPair[1];

    // check that required search keys are given and that the input is valid
    checkPageQuery(searchKey, searchValue, isValidQuery);


    // if both zip_code and date have been validated
    if(isValidQuery.zip_code && isValidQuery.date){ 
      let zip;
      validQuery = true;
      break;
      /* note: if there are more than one zipcode or date search query, the duplicates will be ignored/skipped over*/
    }
  }

  // if the query is valid, get and display city name and weather data
  if (validQuery){
    requestCityAndWeatherData(zip);
  }

  return;
}


/////////////
//// Function to render data on DOM

function renderWeatherData(data, city){
  // render header text
  document.getElementById('header').innerText = 'WEATHER FORECAST FOR '+ city;
  
  // render weather data for all three days
  for(var i = 1; i< 4; i++){        
    
    let img = '#day'+ i +'image'; // var to grab ith day image div
    let image = document.querySelector(img); // grab ith day image div
    
    let divId = '#day'+ i; // var to grab ith day info div
    let div = document.querySelector(divId); // grab ith day info div
    
    let index = mergeDateIndex + i - 1; // merge date is at the ith index of API data
    let infoObj = data.forecast.simpleforecast.forecastday[index]; //grab info from ajax request for the correct day
    
    
    setDay(infoObj, i-1); // set day text
    setWeatherIcon(image, infoObj, i); // set image icon
    setWeatherInfo(div, infoObj); // set conditions and high/low
  }
}


/***************** HELPER FUNCTIONS ***********************/

/////////////
//// Helper functions to varify zip_code and date input

function checkPageQuery(key, value, isValidObj){    
  // object of queries to validate
  var validQueriesObj = {
    zip_code : getZipCode,
    date : getDate
  };

  if(validQueriesObj[key]){ // if this query is either zip_code or date
   isValidObj[key] = validQueriesObj[key](value); // call that method to verify value
  }
}

function getZipCode(str){
  var result = true;
  // check if zip is superficially valid by length & is all digits
  if(str.length != 5 || Number(str) != str){
    result = false;
  }
  zip = str;
  return result;
}


function getDate(str){
  var result = true; // set flag to true
  
  let queryMoDayYear = str.split('/'); // [ mm , dd, year]  

  var mergeDate = new Date(queryMoDayYear[2], queryMoDayYear[0] - 1, queryMoDayYear[1]); // note: subtract 1 from the month value b/c Jan is 0
  
  let today = new Date();
  today.setHours(0, 0, 0, 0); // sets this to midnight of the day - this is to avoid discrepencies if the merge date == today
 
  // if date is valid (ie on of the first 8 of the 10-day forecast)
  if(mergeDate - today > 691200000 || mergeDate - today < 0){ // eight days == 691200000ms
    result = false; // return blank page
  }
  
  // set merge date param if date is valid
  if(result){    
    // Determine the index of the merge date to be found in API data
    for(var i = 0; i < 8; i++){
      // set temp date to today plus i days in the future. The new Date constructor function takes into consideration end of months and years.
      let tempDate = new Date (today.getYear(), today.getMonth(), today.getDate()+i);      
      if(tempDate.getDate() === mergeDate.getDate()){ // if tempDate is equal to the mergeDate
        mergeDateIndex = i; // set the merge date index to i
      }
    }
  }
  
  return result;
}


/////////////
//// Helper functions to make AJAX requests

function requestCityAndWeatherData(zip){
  // set url for ajax request to get city name
  let url = 'http://api.wunderground.com/api/6ea7cf3bc006012f/geolookup/q/' + zip + '.json';
  
  $.ajax({
    url: url ,
    success: function(data){
      if(Object.keys(data).length > 1){ //double check zip code, if valid data should have 2 keys
        var cityName = data.location.city.toUpperCase() + ', ' + data.location.state; // set header text      
        requestWeatherData(cityName);
      }
    }/*,
    failure: function(err){
      // return blank page to user
      console.log(err);}*/
  });
}

function requestWeatherData(city){
  // set url for ajax request to get weather data
  let url = 'http://api.wunderground.com/api/6ea7cf3bc006012f/forecast10day/q/' + zip + '.json';

  $.ajax({
    url: url ,
    success: function(data){
      renderWeatherData(data, city);
    }/*,
    failure: function(err){
      // return blank page to user
      console.log(err);
    }*/
  });
}


/////////////
//// Helper functions to render data on DOM

function setDay(info, i){
  let day;
  if(mergeDateIndex + i){ // if merge index + i is not zero, write the day name
    day = info.date.weekday;
  } else { // otherwise write today
    day = 'Today';
  }
  // background-color: #63A9C2;
  document.getElementsByClassName('dayOfWeek')[i].innerHTML = '<b>' + day +': </b>';
  document.getElementsByClassName('dayOfWeek')[i].style.backgroundColor = '#63A9C2';
}

function setWeatherIcon(imgTag, info){
  // get url to desired icon suite. change the 26th letter to g
  let icon = info.icon_url.slice(0, 26) + 'g' + info.icon_url.slice(27);
  // set image src
  imgTag.setAttribute('src', icon);
}

function setWeatherInfo(contentDiv, info){
  let conditions = info.conditions;
  let hiLo = info.high.fahrenheit + String.fromCharCode(186) + '</b> / ' + info.low.fahrenheit + String.fromCharCode(186) + ' F';
  let space = '<br>';
  if(conditions.length < 17){
    space +='<br>';
  };
  contentDiv.innerHTML = conditions + space + hiLo;
}
