const _0 = '0.00'; // default empty value for this project

let meals = []; // all the meals will be held here

/**
 * formats a number to 2 decimal places
 * @param {number} num
 */
function forceRound(num){
  return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2);
}

/**
 * creates a meal object and adds it to the meals array
 * @param {number} basePrice
 * @param {number} taxRate
 * @param {number} tipPercentage
 */
function addMeal(basePrice, taxRate, tipPercentage){
  meals.push({ basePrice, taxRate, tipPercentage });
}

/**
 * returns a breakdown of the charges for a provided meal object
 * @param {object} meal meal object to calculate the charges on
 */
function calculateCharges(meal){
  let subtotal = meal.basePrice + (meal.taxRate/100 * meal.basePrice);
  let tip = meal.tipPercentage/100 * meal.basePrice;
  let total = subtotal + tip;
  return { subtotal, tip, total };
}

/**
 * returns the charge breakdown of the last entered meal
 * or 0s if none is present
 */
function getLastCharges(){
  let output = { subtotal: _0, tip: _0, total: _0 };

  if (meals.length > 0){
    let values = calculateCharges( meals[meals.length - 1] );
    output = {
      subtotal: forceRound(values.subtotal),
      tip: forceRound(values.tip),
      total: forceRound(values.total)
    };
  }

  return output;
}

/**
 * returns summarized earnings info based on the data in the meals array
 */
function getEarnings(){
  let tipTotal = 0;
  meals.forEach(meal => {
    let charges = calculateCharges(meal);
    tipTotal += charges.tip;
  });
  let averageTip = meals.length > 0 ? tipTotal / meals.length : 0;
  
  return {
    tipTotal: forceRound(tipTotal),
    averageTip: forceRound(averageTip),
    mealCount: meals.length
  };
}

/**
 * does what it says
 */
function reset(){
  meals = [];
}

// expose only the parts we need.
// Direct access to the 'meals' array is a NO-NO!
export default {
  addMeal,
  getLastCharges,
  getEarnings,
  reset
};