/**
 *
 * @param {ImageData} inputImage
 * @param {number} slope
 * @param {number} offset
 */
function linearPointTransform(inputImage, slope, offset) {
    var outputImage = new ImageData(
        inputImage.data,
        inputImage.width,
        inputImage.height
    );

    for (let i = 0; i < inputImage.data.length; i += 4) {
        outputImage.data[i + 0] = inputImage.data[i + 0] * slope + offset;
        outputImage.data[i + 1] = inputImage.data[i + 1] * slope + offset;
        outputImage.data[i + 2] = inputImage.data[i + 2] * slope + offset;
        outputImage.data[i + 3] = 255;
    }

    return outputImage;
}

/**
 *
 * @param {ImageData} inputImage
 * @param {number} slope
 */
function nonLinearPointTransform(inputImage, slope) {
    var outputImage = new ImageData(
        inputImage.data,
        inputImage.width,
        inputImage.height
    );

    for (let i = 0; i < inputImage.data.length; i += 4) {
        outputImage.data[i + 0] = slope * Math.log1p(inputImage.data[i + 0]);
        outputImage.data[i + 1] = slope * Math.log1p(inputImage.data[i + 1]);
        outputImage.data[i + 2] = slope * Math.log1p(inputImage.data[i + 2]);
        outputImage.data[i + 3] = 255;
    }

    return outputImage;
}

/**
 *
 * @param {ImageData} inputImage
 * @param {number} slope
 * @param {number} start
 * @param {number} end
 */
function clippingPointTransform(inputImage, slope, start, end) {
    var outputImage = new ImageData(
        inputImage.data,
        inputImage.width,
        inputImage.height
    );

    for (let i = 0; i < inputImage.data.length; i += 4) {
        if (inputImage.data[i + 0] < start) {
            outputImage.data[i + 0] = 0;
            outputImage.data[i + 1] = 0;
            outputImage.data[i + 2] = 0;
            outputImage.data[i + 3] = 255;
        } else if (inputImage.data[i + 0] > end) {
            outputImage.data[i + 0] = 255;
            outputImage.data[i + 1] = 255;
            outputImage.data[i + 2] = 255;
            outputImage.data[i + 3] = 255;
        } else {
            outputImage.data[i + 0] = inputImage.data[i + 0] * slope;
            outputImage.data[i + 1] = inputImage.data[i + 1] * slope;
            outputImage.data[i + 2] = inputImage.data[i + 2] * slope;
            outputImage.data[i + 3] = 255;
        }
    }

    return outputImage;
}

/**
 *
 * @param {ImageData} inputImage
 * @param {number} slope
 * @param {number} start
 * @param {number} end
 */
function windowPointTransform(inputImage, slope, start, end) {
    var outputImage = new ImageData(
        inputImage.data,
        inputImage.width,
        inputImage.height
    );

    for (let i = 0; i < inputImage.data.length; i += 4) {
        if (inputImage.data[i + 0] < start || inputImage.data[i + 0] > end) {
            outputImage.data[i + 0] = 0;
            outputImage.data[i + 1] = 0;
            outputImage.data[i + 2] = 0;
            outputImage.data[i + 3] = 255;
        } else {
            outputImage.data[i + 0] = inputImage.data[i + 0] * slope;
            outputImage.data[i + 1] = inputImage.data[i + 1] * slope;
            outputImage.data[i + 2] = inputImage.data[i + 2] * slope;
            outputImage.data[i + 3] = 255;
        }
    }
    return outputImage;
}
