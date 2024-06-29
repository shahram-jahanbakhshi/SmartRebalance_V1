//
// --- Global Function to using Wallex.ir

/**
 * Get time stamp.
 * @param {number} myZoonDate
 */
function getTimestamp(myZoonDate) {
    // Create a new Date object with your desired date and time
    const date = new Date(myZoonDate);

    // Convert the date to a Unix timestamp (in milliseconds)
    const unixTimestamp = date.getTime() / 1000;

    return unixTimestamp;
}

/**
 * Convert String Array to intiger Array.
 * @param {string[]} inputArray
 */
function getIntArray(inputArray) {
    let resultIntArray = inputArray.map(num => parseInt(num));
    return resultIntArray;
}

/**
 * This function export the close prices from json object and convert it to integer.
 * @param {object} data
 */
function exportClosePrice(data) {
    let closePrice = data.c;
    let IntClosePrice = getIntArray(closePrice);
    return IntClosePrice;
}

/**
 * This function maps 'id' and 'value' attributes of  an HTML <input> tag
 * based on the class name's to key-value pairs of result object.
 * @param {string} classname
 */
function shGetObjectFromClassName(classname) {
    const resultObject = new Object();
    let getClassFromDOM = document.getElementsByClassName(classname);

    for (let i = 0; i < getClassFromDOM.length; i++) {
        let pro = getClassFromDOM[i].id;
        let val = $("#" + pro).val();
        resultObject[pro] = val;
    }
    //console.log("getClassFromDOM:", getClassFromDOM);
    //console.log("resultObject:", resultObject);

    //for (const [key, value] of Object.entries(resultObject)) {
    //    console.log(`${key}: ${value}`);
    //}

    return resultObject;
}

/**
 * This function distribute a given total initial investment across different
 * asset investment options based on their respective weights in the portfolio.
 * @param {number[]} ratioArray
 * @param {number} initTotalInvest
 */
function shGetInitInvestArray(ratioArray, initTotalInvest) {
    let percentageArray = valuePerSumRatioArray(ratioArray);
    let resultInitInvestArray = [];

    for (let i = 0; i < percentageArray.length; i++) {
        resultInitInvestArray[i] = percentageArray[i] * initTotalInvest;
    }

    return resultInitInvestArray;
}

/**
 *  This function takes an input array and calculates the ratio of each element
 *  in the array to the sum of all elements in the array.
 * @param {any[]} inputArray
 */
function valuePerSumRatioArray(inputArray) {
    let sum = 0;
    let inputIntArray = getIntArray(inputArray);
    for (let v of inputIntArray) {
        sum += v;
    }

    let resultArray = [];
    for (let i = 0; i < inputIntArray.length; i++) {
        resultArray[i] = inputIntArray[i] / sum;
    }

    return resultArray;
}