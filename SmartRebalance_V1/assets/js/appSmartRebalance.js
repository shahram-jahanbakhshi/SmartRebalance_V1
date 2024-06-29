$(document).ready(function () {

    /**
     * Class Basket provide's tools to simolate Smart Rebalance Strategy
     * */
    class Basket {
        constructor(arrayInvestment, arrayExchangeRate, arrayAssets) {
            this.arrayInvestment = arrayInvestment;
            this.arrayExchangeRate = arrayExchangeRate;
            this.arrayAssets = arrayAssets;
            this.TotalInvestment = 0;
            this.arrayBasketPercentage = [];
        }

        getTotalInvestment() {
            const sum = this.arrayInvestment.reduce((acc, curr) => acc + curr, 0);
            return sum;
        }

        getBasketPercentage() {
            const percen = [];
            for (var i = 0; i < this.arrayInvestment.length; i++) {
                percen[i] = this.arrayInvestment[i] / this.TotalInvestment;
            }

            return percen;
        }

        getInvestment() {
            const investment = [];
            for (var i = 0; i < this.arrayExchangeRate.length; i++) {
                investment[i] = this.arrayExchangeRate[i] * this.arrayAssets[i];
            }

            return investment;
        }

        getInvestmentUsingTotalInvestment() {
            const investment = [];
            for (var i = 0; i < this.arrayBasketPercentage.length; i++) {
                investment[i] = this.arrayBasketPercentage[i] * this.TotalInvestment;
            }

            return investment;
        }

        getAssets() {
            const assets = [];
            for (var i = 0; i < this.arrayExchangeRate.length; i++) {
                assets[i] = this.arrayInvestment[i] / this.arrayExchangeRate[i];
            }

            return assets;
        }
    }

    /**
     * apiData Object use to fetchig data from wallex.ir
     * */
    let apiData = {
        url: 'https://api.wallex.ir/',
        markets: 'v1/markets',
        currencies: 'v1/currencies/stats',
        orderbook: 'v1/depth',
        profile: 'v1/account/profile',
        order: 'v1/account/orders',
        history: 'v1/udf/history'
    }

    /**
     * Define Global Variabls
     * */
    let historyUSDTArray = [];
    let historyBTCArray = [];
    let historyETHArray = [];

    let getUSDThistoryFlag = false;
    let getBTChistoryFlag = false;
    let getETHhistoryFlag = false;

    let xValue = [];
    let resultSmartRebalance = [];
    //-------------------------------
    //--- Get Time frame simolation
    let from = $("#from").val();
    let to = $("#to").val();

    let fromTimestamp = getTimestamp(from).toString();
    let toTimestamp = getTimestamp(to).toString();
    //console.log("fromTimestamp:", fromTimestamp);
    $("#from").on("change", function () {

        from = $("#from").val();
        fromTimestamp = getTimestamp(from).toString();
        getUSDThistoryFlag = false;
        getBTChistoryFlag = false;
        getETHhistoryFlag = false;
        //console.log("fromTimestamp:", fromTimestamp);
    });

    $("#to").on("change", function () {
        to = $("#to").val();
        toTimestamp = getTimestamp(to).toString();
        getUSDThistoryFlag = false;
        getBTChistoryFlag = false;
        getETHhistoryFlag = false;
        //console.log("toTimestamp:", toTimestamp);
    });
    //-------------------------------------------

    //--- Get Weigth Portfolio and Initial Capital Section.
    let basketRatios = shGetObjectFromClassName("ratio");
    //console.log("basketRatios:", basketRatios);
    let valuesRatio = Object.values(basketRatios);
    //console.log("valuesRatio:", valuesRatio);
 
    let initInvestTotal = $("#inToInv").val();
    $("#inToInv").on("change", function () {
        initInvestTotal = $("#inToInv").val();

    });
  
    $(".ratio").on("change", function () {
        basketRatios = shGetObjectFromClassName("ratio");
        //console.log("basketRatios:", basketRatios);
        valuesRatio = Object.values(basketRatios);
        //console.log("valuesRatio:", valuesRatio);

    })
    //--------------------

    //--- Get History Section.
    $("#getHistory_1").on("click", function () {
        let erroridTimeStamp = errorTimeFrame(fromTimestamp, toTimestamp);
        if (erroridTimeStamp.errorID != 0) {
            Swal.fire({
                title: "Set Time Frame in Step1",
                text: erroridTimeStamp.errorMessage,
                icon: "error",
                timer: 5000
            });
        } else {
            fetch(`${apiData.url}${apiData.history}?symbol=USDTTMN&resolution=1D&from=${fromTimestamp}&to=${toTimestamp}`)

                .then(response => response.json())
                .then(data => {
                    //console.log('history:', data);
                    historyUSDTArray = exportClosePrice(data);
                    //console.log('historyUSDT:', historyUSDT);
                    getUSDThistoryFlag = true;
                    Swal.fire({
                        text: "Fetching data is successful!",
                        icon: "success",
                        timer: 1000
                    });
                })
                .catch(error => {
                    console.error('Error:', error);

                });
        }


    });

    $("#getHistory_2").on("click", function () {
        let erroridTimeStamp = errorTimeFrame(fromTimestamp, toTimestamp);
        if (erroridTimeStamp.errorID != 0) {
            Swal.fire({
                title: "Set Time Frame in Step1",
                text: erroridTimeStamp.errorMessage,
                icon: "error",
                timer: 5000
            });
        } else {
            fetch(`${apiData.url}${apiData.history}?symbol=BTCTMN&resolution=1D&from=${fromTimestamp}&to=${toTimestamp}`)

                .then(response => response.json())
                .then(data => {
                    //console.log('history:', data);
                    historyBTCArray = exportClosePrice(data);
                    //console.log('historyBTC:', historyBTC);
                    getBTChistoryFlag = true;
                    Swal.fire({
                        text: "Fetching data is successful!",
                        icon: "success",
                        timer: 1000
                    });
                })
                .catch(error => {
                    console.error('Error:', error);

                });
        }


    });

    $("#getHistory_3").on("click", function () {
        let erroridTimeStamp = errorTimeFrame(fromTimestamp, toTimestamp);
        if (erroridTimeStamp.errorID != 0) {
            Swal.fire({
                title: "Set Time Frame in Step1",
                text: erroridTimeStamp.errorMessage,
                icon: "error",
                timer: 5000
            });
        } else {
            fetch(`${apiData.url}${apiData.history}?symbol=ETHTMN&resolution=1D&from=${fromTimestamp}&to=${toTimestamp}`)

                .then(response => response.json())
                .then(data => {
                    //console.log('history:', data);
                    historyETHArray = exportClosePrice(data);
                    //console.log('historyETH:', historyETH);
                    getETHhistoryFlag = true;
                    Swal.fire({
                        text: "Fetching data is successful!",
                        icon: "success",
                        timer: 1000
                    });
                })
                .catch(error => {
                    console.error('Error:', error);

                });
        }


    });
    //---------------------------
   
    //--- Run Smart Rebalance Strategy Section
    $("#startRebalance").on("click", function () {
        let errorManage = errorFetchingData(getUSDThistoryFlag, getBTChistoryFlag, getETHhistoryFlag);
        if (errorManage.errorID != 0) {
            Swal.fire({
                title: "Get Historis From Step2!",
                text: errorManage.errorMessage,
                icon: "error",
                timer: 5000
            });
        } else {
            let results = SmartRebalance(initInvestTotal, valuesRatio, historyUSDTArray, historyBTCArray, historyETHArray);
            xValue = results.xValue;
            resultSmartRebalance = results.resultSmartRebalance;
            resetCanvas("CompareResultChart", "ChartResult");
            plotCompareChart(xValue, resultSmartRebalance);
            Swal.fire({
                text: "Simolation is successful",
                icon: "success",
                timer: 1000
            });
        }
        
    });
    //-------------------------------------------

    /**
     * Smart Rebalce function run in each iteration to balance portfolio.
     * @param {number} InitTotalInvest
     * @param {number[]} RatioArray
     * @param {number[]} USDThistory
     * @param {number[]} BTChistory
     * @param {number[]} ETHhistory
     */
    function SmartRebalance(InitTotalInvest, RatioArray, USDThistory, BTChistory, ETHhistory) {
        var resultTotalInvestment = [];
        var USDTassets = [];
        var BTCassets = [];
        var ETHassets = [];
        var xValue = [];
        var USDTInvest = [];
        var BTCInvest = [];
        var ETHInvest = [];
        //---
        let initInvestArray = shGetInitInvestArray(RatioArray, InitTotalInvest);


        //---first step
        var myBasket = new Basket(
            initInvestArray,
            [USDThistory[0], BTChistory[0], ETHhistory[0]],
            []);
        myBasket.arrayAssets = myBasket.getAssets();
        myBasket.TotalInvestment = myBasket.getTotalInvestment();
        myBasket.arrayBasketPercentage = myBasket.getBasketPercentage();
        //console.log("myBasket:", myBasket);

        resultTotalInvestment[0] = myBasket.TotalInvestment;
        USDTassets[0] = myBasket.arrayAssets[0];
        BTCassets[0] = myBasket.arrayAssets[1];
        ETHassets[0] = myBasket.arrayAssets[2];
        xValue[0] = 1;
        USDTInvest[0] = myBasket.arrayInvestment[0];
        BTCInvest[0] = myBasket.arrayInvestment[1];
        ETHInvest[0] = myBasket.arrayInvestment[2];

        for (var i = 1; i < USDThistory.length; i++) {
            //---secend step
            var basketBeforRebalance = new Basket([], [USDThistory[i], BTChistory[i], ETHhistory[i]], myBasket.arrayAssets);

            basketBeforRebalance.arrayInvestment = basketBeforRebalance.getInvestment();
            basketBeforRebalance.TotalInvestment = basketBeforRebalance.getTotalInvestment();
            basketBeforRebalance.arrayBasketPercentage = basketBeforRebalance.getBasketPercentage();
            //console.log("basketBeforRebalance:", basketBeforRebalance);

            //---third step
            var basketAfterRebalance = new Basket([], basketBeforRebalance.arrayExchangeRate, []);
            basketAfterRebalance.arrayBasketPercentage = myBasket.arrayBasketPercentage;
            basketAfterRebalance.TotalInvestment = basketBeforRebalance.TotalInvestment;
            basketAfterRebalance.arrayInvestment = basketAfterRebalance.getInvestmentUsingTotalInvestment();
            basketAfterRebalance.arrayAssets = basketAfterRebalance.getAssets();
            //console.log("basketAfterRebalance:", basketAfterRebalance);

            resultTotalInvestment[i] = basketAfterRebalance.TotalInvestment;
            myBasket.arrayAssets = basketAfterRebalance.arrayAssets;
            myBasket.arrayExchangeRate = basketAfterRebalance.arrayExchangeRate;
            myBasket.arrayInvestment = basketAfterRebalance.arrayInvestment;
            myBasket.TotalInvestment = basketAfterRebalance.TotalInvestment;
            myBasket.arrayBasketPercentage = basketAfterRebalance.arrayBasketPercentage;
            USDTassets[i] = myBasket.arrayAssets[0];
            BTCassets[i] = myBasket.arrayAssets[1];
            ETHassets[i] = myBasket.arrayAssets[2];
            xValue[i] = i + 1;
            USDTInvest[i] = myBasket.arrayInvestment[0];
            BTCInvest[i] = myBasket.arrayInvestment[1];
            ETHInvest[i] = myBasket.arrayInvestment[2];

        }

        //console.log("TotalInvestment:", TotalInvestment);
        //console.log("USDTassets: ", USDTassets);
        //console.log("BTCassets: ", BTCassets);
        //console.log("ETHassets: ", ETHassets);

        return { xValue: xValue, resultSmartRebalance: resultTotalInvestment };

    }

    /**
     * Plot result of simolation.
     * @param {number[]} xvalue
     * @param {number[]} resultSmartRebalance
     */
    function plotCompareChart(xvalue, resultSmartRebalance) {

        new Chart("CompareResultChart", {
            type: "line",
            data: {
                labels: xvalue,
                datasets: [
                    {
                        data: resultSmartRebalance,
                        borderColor: "red",
                        fill: false,
                        label: "SmartRebalance"
                    }
                ]
            },
            options: {
                legend: { display: true }
            }
        });
    }

});