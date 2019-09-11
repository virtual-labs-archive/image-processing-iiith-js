/**
 *
 * @param {ImageData} inputImage
 */
function histogram(inputImage) {
    var histogramArray = new Array(256);

    for (let i = 0; i < inputImage.data.length; i += 4) {
        histogramArray[inputImage.data[i]] += 1;
    }

    return histogramArray;
}
