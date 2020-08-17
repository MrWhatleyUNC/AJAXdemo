import $ from 'jquery';

'use strict';

function getDogImage(numPics,breed) {
  let url = `https://dog.ceo/api/breed/${breed}/images/random/${numPics}` 
  console.log(url)
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson =>
      displayResults(responseJson))
    .catch(error => alert(`Something went wrong:${error} Try again later.`));
}
function displayResults(responseJson) {
  console.log(responseJson);
  let results = []
  console.log(responseJson.message.length);
  for (let i =0; i <responseJson.message.length; i++){
      console.log(responseJson.message[i])
      results.push(`<img src="${responseJson.message[i]}" class="results-img">`)
  }
  console.log(responseJson.message.length);
  //replace the existing image with the new one
   $('.results-img').html(results)
  //display the results section
   $('.results').removeClass('hidden');
}
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('.results-img').empty();
    console.log('results div-'+ $('.results-img'))
    let numPics= $('.numPics').val()
    let breed = $('.breed').val().toLowerCase()
    console.log(breed, numPics)
    getDogImage(numPics, breed);
  });
}
$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});

// $(main);