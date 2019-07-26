"use strict";

(function () {
  var fundingDaysLeft = 0,
      fundingGoalAmount = 600,
      numOfDonations = 0,
      totalDonationAmount = 0;
  var $fundingDaysLeft = $('#funding-days-left'),
      $fundingRemaining = $('#funding-remaining'),
      $donationForm = $('#donation-form'),
      $donationAmount = $('#donation-amount'),
      $donateNowBtn = $('#donate-now-btn'),
      $numOfDonations = $('#number-of-donations');

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

  $donationForm.on('submit', function () {
    var donationAmount = parseInt($donationAmount.val());
    addDonation(donationAmount);
    numOfDonations++;
    renderForm();
    return false;
  }); //Setup view

  function renderForm() {
    $fundingDaysLeft.text(getFundingDaysLeft);
    $fundingRemaining.text(getFundingRemaining);
    $numOfDonations.text(getNumberOfDonations);
  }

  renderForm();
})();