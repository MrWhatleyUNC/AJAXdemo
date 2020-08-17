import $ from 'jquery';

'use strict';

// function getDogImage(numPics,breed) {
//   let url = `https://dog.ceo/api/breed/${breed}/images/random/${numPics}` 
//   console.log(url)
//   fetch(url)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error(response.statusText);
//     })
//     .then(responseJson =>
//       displayResults(responseJson))
//     .catch(error => alert(`Something went wrong:${error} Try again later.`));
// }
// function displayResults(responseJson) {
//   console.log(responseJson);
//   let results = []
//   console.log(responseJson.message.length);
//   for (let i =0; i <responseJson.message.length; i++){
//       console.log(responseJson.message[i])
//       results.push(`<img src="${responseJson.message[i]}" class="results-img">`)
//   }
//   console.log(responseJson.message.length);
//   //replace the existing image with the new one
//    $('.results-img').html(results)
//   //display the results section
//    $('.results').removeClass('hidden');
// }
// function watchForm() {
//   $('form').submit(event => {
//     event.preventDefault();
//     $('.results-img').empty();
//     console.log('results div-'+ $('.results-img'))
//     let numPics= $('.numPics').val()
//     let breed = $('.breed').val().toLowerCase()
//     console.log(breed, numPics)
//     getDogImage(numPics, breed);
//   });
// }

// put your own value below!
// const apiKey = 'AIzaSyBPYJDb8tIlsBL-iZrz9XnEUn0bHr45Z9o'; 
// const searchURL = 'https://www.googleapis.com/youtube/v3/search';


// function formatQueryParams(params) {
//   const queryItems = Object.keys(params)
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//   return queryItems.join('&');
// }


// function getYouTubeVideos(query, maxResults=10) {
//   const params = {
//     key: apiKey,
//     q: query,
//     part: 'snippet',
//     maxResults
//   };
//   const queryString = formatQueryParams(params)
//   const url = searchURL + '?' + queryString;

//   fetch(url)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error(response.statusText);
//     })
//     .then(responseJson => console.log(JSON.stringify(responseJson)))
//     .catch(err => {
//       $('#js-error-message').text(`Something went wrong: ${err.message}`);
//     });
// }

// function watchForm() {
//   $('form').submit(event => {
//     event.preventDefault();
//     const searchTerm = $('#js-search-term').val();
//     const maxResults = $('#js-max-results').val();
//     getYouTubeVideos(searchTerm, maxResults);
//   });
// }

const api_Key= 'g0aIdwv6czlBbuli52kiQEg9YCIntjj61RZnIRtY'
const searchURL = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getNationalParks(stateCode, limit) {
  const params = {
    stateCode,
    limit,
    api_Key
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  console.log(url)
  fetch(url)
    .then(response => {
      if (response.ok) {
        console.log(response)
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  console.log(responseJson.data);
  let results = []

  for (let i =0; i <responseJson.data.length; i++){
      console.log(responseJson.data[i].fullName)
      console.log(responseJson.data[i].description)
      console.log(responseJson.data[i].url)
      results.push(`
      <li class="results">
        <p>${responseJson.data[i].fullName}</p>
        <p>${responseJson.data[i].description}</p>
        <p>Address:</p>
        <p>${responseJson.data[i].addresses[1].line1}<br>
           ${responseJson.data[i].addresses[1].line2}<br>
           ${responseJson.data[i].addresses[1].city}, ${responseJson.data[i].addresses[1].stateCode} ${responseJson.data[i].addresses[1].postalCode}</p>
        <a href= '${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      </li>
      `)
      //results.push(`<img src="${responseJson.message[i]}" class="results-img">`)
  }

  $('#results-list').html(results);
  // console.log(responseJson.message.length);
  // //replace the existing image with the new one
  //  $('.results-img').html(results)
  // //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const stateCode = $('#js-state-code').val().toLowerCase();
    const limit = $('#js-limit').val();
    $('#results-list').empty();
    getNationalParks(stateCode, limit);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});

// $(main);