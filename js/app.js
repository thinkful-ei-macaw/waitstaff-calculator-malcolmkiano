/* global $ */
import store from './store.js';

/**
 * sets up all the listeners
 */
function init(){
  handleFormSubmit();
  handleResetButton();
  render();
}


// ===============================================
// LISTENER FUNCTIONS
// ===============================================
/**
 * listens for submission of the form
 */
function handleFormSubmit(){
  $('main').on('submit', 'form', function(e){
    e.preventDefault();

    let basePrice = parseFloat($('#price').val());
    let taxRate = parseFloat($('#tax').val());
    let tipPercentage = parseFloat($('#tip').val());

    store.addMeal(basePrice, taxRate, tipPercentage);
    render();
  });
}

/**
 * listens for the click of the reset button
 */
function handleResetButton(){
  $('main').on('click', '#reset', function(){
    store.reset();
    render();
  });
}


// ===============================================
// TEMPLATE GENERATION FUNCTIONS
// ===============================================
function generateMealDetailsForm(){
  return `
  <section id="mealDetails" class="column box">
    <h2>Enter the Meal Details</h2>
    <form class="content">
      <div class="group">
        <label for="price" data-unit="$">Base Meal Price:</label>
        <input id="price" required type="number" min="0" step="0.01"/>
      </div>
      <div class="group">
        <label for="tax" data-unit="%">Tax Rate:</label>
        <input id="tax" required type="number" min="0" max="100" step="0.01"/>
      </div>
      <div class="group">
        <label for="tip" data-unit="%">Tip Percentage:</label>
        <input id="tip" required type="number" min="0" step="0.01"/>
      </div>
      <div class="buttons">
        <input  class="btn"type="submit" value="Submit">
        <input  class="btn"type="reset" value="Cancel">
      </div>
    </form>
  </section>
  `;
}

function generateInfoSection(){
  return `
  <section class="column">
    ${generateCustomerCharges()}
    ${generateEarningsInfo()}
  </section>
  `;
}

function generateCustomerCharges(){
  return `
  <article id="charges" class="box">
    <h2>Customer Charges</h2>
    <div class="content">
      <p class="group">
        <span>Subtotal</span>
        <span>${store.getLastCharges().subtotal}</span>
      </p>
      <p class="group">
        <span>Tip</span>
        <span>${store.getLastCharges().tip}</span>
      </p>
      <p class="group total">
        <span>Total</span>
        <span>${store.getLastCharges().total}</span>
      </p>
    </div>
  </article>
  `;
}

function generateEarningsInfo(){
  return `
  <article id="earnings" class="box">
    <h2>My Earnings Info</h2>
    <div class="content">
      <p class="group">
        <span>Tip Total:</span>
        <span>${store.getEarnings().tipTotal}</span>
      </p>
      <p class="group">
        <span>Meal count:</span>
        <span>${store.getEarnings().mealCount}</span>
      </p>
      <p class="group">
        <span>Average Tip Per Meal:</span>
        <span>${store.getEarnings().averageTip}</span>
      </p>
    </div>
  </article>
  `;
}

function generateResetButton(){
  return `
  <footer>
    <button id="reset" class="btn">Reset</button>
  </footer>
  `;
}


// ===============================================
// RENDER FUNCTION
// ===============================================
function render(){
  let html = '';
  
  // add the different parts
  html += generateMealDetailsForm();
  html += generateInfoSection();
  html += generateResetButton();

  // put it out there
  $('main').html(html);
}


// Calls the init function on DOM ready
$(init);