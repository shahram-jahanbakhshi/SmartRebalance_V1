/**
 * Reset the Canvas tag to plot new chart.
 * @param {string} idCanvas
 * @param {string} idContaner
 */
function resetCanvas(idCanvas,idContaner) {
    $('#CompareResultChart').remove(); // this is my <canvas> element
  
    $(`#${idContaner}`).append(`<canvas id="${idCanvas}" style="width:100%;max-width:1200px" role="img" aria-label="resultChart"></canvas>`);
};