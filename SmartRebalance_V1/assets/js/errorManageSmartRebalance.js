
//--- Define Manage Error Functions
//---------------------------------
/**
 * Manage errors due to Time Frame's inputs.
 * @param {number} fromTimestamp
 * @param {number} toTimestamp
 */
function errorTimeFrame(fromTimestamp, toTimestamp) {
    let errorID = 0;
    let errorMessage = "";
    switch (true) {
        case (isNaN(fromTimestamp) || isNaN(toTimestamp)):
            errorID = 1;
            errorMessage = "fromTimestamp or toTimestamp is NaN";
            break;
        case (fromTimestamp > toTimestamp):
            errorID = 2;
            errorMessage = "fromTimestamp is grather than toTimestamp";
    }

    return { errorID: errorID, errorMessage: errorMessage };
}

/**
 * Manage errors due to fetching datas.
 * @param {boolean} getUSDThistoryFlag
 * @param {boolean} getBTChistoryFlag
 * @param {boolean} getETHhistoryFlag
 */
function errorFetchingData(getUSDThistoryFlag, getBTChistoryFlag, getETHhistoryFlag) {
    let errorID = 0;
    let errorMessage = "";
    switch (true) {
        case (!getUSDThistoryFlag):
            errorID = 1;
            errorMessage = "Get USDT History!";
            break;
        case (!getBTChistoryFlag):
            errorID = 2;
            errorMessage = "Get BTC History!";
            break;
        case (!getETHhistoryFlag):
            errorID = 3;
            errorMessage = "Get ETH History!"
    }

    return { errorID: errorID, errorMessage: errorMessage };
}