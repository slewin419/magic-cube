'use strict';

(function() {
  var fundingDaysLeft = 5,
      numOfDonations = 26,
      totalDonationAmount = 450,
      fundingProgressPercent = 0,
      fundingGoalAmount = 600;

  var $fundingDaysLeft = $('#funding-days-left'),
      $fundingRemaining = $('#funding-remaining'),
      $donationForm = $('#donation-form'),
      $donationAmount = $('#donation-amount'),
      $donateNowBtn = $('#donate-now-btn'),
      $numOfDonations = $('.number-of-donations'),
      $fundingProgressBar = $('.progress-bar').find('.bar'),
      $weatherDisplay = $('#weather-display'),
      $confirmDonation = $('#confirm-donation-modal'),
      $modalBackDrop = $('#modal-backdrop');

  function addDonation(amount) {
    totalDonationAmount += amount;
  }

  function donationProgress() {
    return totalDonationAmount / fundingGoalAmount * 100;
  }

  function getFundingDaysLeft() {
    return fundingDaysLeft;
  }

  function getFundingRemaining() {
    return fundingGoalAmount - totalDonationAmount;
  }

  function getNumberOfDonations() {
    return numOfDonations;
  }

  function confirm2(question) {
    $modalBackDrop.addClass('show');
    $confirmDonation.addClass('show');
    $('#confirm-question').text(question);

    var defer = $.Deferred();
    $confirmDonation.find('.btn').one('click', function(){
        if($(this).hasClass('yes')){
            defer.resolve("true");
            closeConfirm();
        } else {
            defer.resolve("false");
            closeConfirm();
            $donationAmount.focus();
        }
    });

    var closeConfirm = function(){
      $modalBackDrop.removeClass('show');
      $confirmDonation.removeClass('show');
    }

    $confirmDonation.find('.close-modal').on('click', closeConfirm);

    return defer.promise();
  }

  $donationForm.on('submit', function(e) {
    e.preventDefault();
    var donationAmount = parseInt($donationAmount.val());

    if (donationAmount <= 0 || donationAmount === null) {
      return false;
    }

    var donationConfirmed = confirm2('Are you sure you want to donate $' + $donationAmount.val());

    donationConfirmed.then(function(answer){
      if (answer === "true") {
        addDonation(donationAmount);
        numOfDonations++;
        renderForm();
        alert("Thank you for your donation!");
      }
    });

  }); //Setup view

  function renderForm() {
    $fundingDaysLeft.text(getFundingDaysLeft);
    $fundingRemaining.text(getFundingRemaining);
    $numOfDonations.text(getNumberOfDonations);
    $fundingProgressBar.css('width', function() {
      return donationProgress() + '%';
    });
    $('#complete-funding-status').find('.arrow').css('left', function(){
      return 'calc(' + donationProgress() + '% - 7px)';
    });
  }

  renderForm(); //Panels

  $('.panel').on('click', '.panel-header', function(e) {
    e.preventDefault();
    $('.panel').removeClass('active');
    $(this).closest('.panel').toggleClass('active');
  }); //Tabs

  $('.tabs').on('click', 'li', function(e) {
    e.preventDefault();
    var tabContentId = $(this).find('a')[0].hash;
    $('.tab-panel').removeClass('active');
    $('.tabs').find(tabContentId).toggleClass('active');
  }); //Weather

  var OPEN_WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather';
  var OPEN_WEATHER_API_KEY = '74d9bc317f6cb40688304324e3555d46';
  $('.weather-btn').on('click', function() {
    var cityId = $(this).data('city-id');
    getWeatherData(cityId).then(displayWeatherData);
  });

  /**
   * Get current weather info from OpenWeather API
   *
   * @param cityId
   * @returns {Deffered}
   */

  function getWeatherData(cityId) {
    return $.get(OPEN_WEATHER_API_URL, {
      id: cityId,
      appid: OPEN_WEATHER_API_KEY,
    });
  }

  function displayWeatherData(weather) {
    $weatherDisplay.html(JSON.stringify(weather));
  }
})();