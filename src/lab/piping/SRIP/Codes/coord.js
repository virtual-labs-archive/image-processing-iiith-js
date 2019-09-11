/**
 *  Returns the x and y coordinate of the pixel at the given index
 *
 * @param {ImageData} imageData
 * @param {number} index
 *
 * @returns {Object}
 */
function getCoordinates(imageData, index) {
    let x = (index % (imageData.width * 4)) / 4;
    let y = index / (imageData.width * 4);
    x = x | 0;
    y = y | 0;
    return {
        x,
        y
    };
}

/**
 *
 * @param {ImageData} imageData
 * @param {number} xCoord
 * @param {number} yCoord
 */
function getIndex(imageData, xCoord, yCoord) {
    return (xCoord + yCoord * imageData.width) * 4;
}
