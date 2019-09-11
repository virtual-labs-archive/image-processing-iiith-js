/**
 *  Returns a image translated by xOffset in x direction and yOffset in y direction
 *
 * @param {ImageData} inputImage
 * @param {number} xOffset
 * @param {number} yOffset
 */

function translate(inputImage, xOffset, yOffset) {
    let outputImage = new ImageData(
        inputImage.width,
        inputImage.height
    );

    for (let i = 0; i < outputImage.data.length; i += 4) {
        // Coordinates from top left corner
        let coord = getCoordinates(outputImage, i);
        if (coord.x - xOffset >= 0 && coord.y - yOffset >= 0) {
            let index = getIndex(inputImage, coord.x - xOffset, coord.y - yOffset);
            outputImage.data[i + 0] = inputImage.data[index + 0];
            outputImage.data[i + 1] = inputImage.data[index + 1];
            outputImage.data[i + 2] = inputImage.data[index + 2];
            outputImage.data[i + 3] = 255;
        } else {
            outputImage.data[i + 0] = 0;
            outputImage.data[i + 1] = 0;
            outputImage.data[i + 2] = 0;
            outputImage.data[i + 3] = 255;
        }
    }

    return outputImage;
}

/**
 * Returns an image rotated by angle degrees in anticlockwise direction
 *
 * @param {ImageData} inputImage
 * @param {number} angle
 * @param {string} interpolType
 */
function rotate(inputImage, angle, interpolType) {
    let outputImage = new ImageData(inputImage.width, inputImage.height);

    for (let i = 0; i < outputImage.data.length; i += 4) {
        // Coordinates from top left corners
        let coord = getCoordinates(outputImage, i);
        let x = coord.x;
        let y = coord.y;

        let originalCoord = new Object();

        originalCoord.x = Math.cos(angle) * x + Math.sin(angle) * y;
        originalCoord.y = Math.sin(angle) * x + Math.cos(angle) * y;

        let pixelvalues = new Object();
        pixelvalues.alpha = 255;

        if (originalCoord.x % 1 === 0 && originalCoord.y % 1 === 0) {
            let index = getIndex(inputImage, x, y);
            pixelvalues.red = inputImage.data[index + 0];
            pixelvalues.green = inputImage.data[index + 1];
            pixelvalues.blue = inputImage.data[index + 2];
        } else {
            pixelvalues = interpolate(
                inputImage,
                originalCoord.x,
                originalCoord.y,
                interpolType
            );
        }

        outputImage.data[i + 0] = pixelvalues.red;
        outputImage.data[i + 1] = pixelvalues.green;
        outputImage.data[i + 2] = pixelvalues.blue;
        outputImage.data[i + 3] = pixelvalues.alpha;
    }

    return outputImage;
}

/**
 * Returns the image scaled by a factor of 2 ^ scaleFactor
 * @param {ImageData} inputImage
 * @param {boolean} toUpScale
 * @param {number} scaleFactor
 * @param {string} interpolType
 */
function scale(inputImage, toUpScale, scaleFactor, interpolType) {
    let outputImage = new ImageData(
        Math.round(
            inputImage.width *
                Math.pow(2, toUpScale ? scaleFactor : -1 * scaleFactor)
        ),
        Math.round(
            inputImage.height *
                Math.pow(2, toUpScale ? scaleFactor : -1 * scaleFactor)
        )
    );

    let origCoord = new Object();
    let currCoord = new Object();

    let tempIndex = 0;

    if (toUpScale) {
        for (let i = 0; i <= outputImage.data.length; i += 4) {
            currCoord = getCoordinates(outputImage, i);
            origCoord = {
                x: currCoord.x / Math.pow(2, scaleFactor),
                y: currCoord.y / Math.pow(2, scaleFactor),
            };
            if (origCoord.x % 1 === 0 && origCoord.y % 1 === 0) {
                let tempIndex = getIndex(inputImage, origCoord.x, origCoord.y);
                outputImage[i + 0] = inputImage[tempIndex + 0];
                outputImage[i + 1] = inputImage[tempIndex + 1];
                outputImage[i + 2] = inputImage[tempIndex + 2];
                outputImage[i + 3] = 255;
            } else {
                let pixelvalues = interpolate(
                    inputImage,
                    currCoord.x,
                    currCoord.y,
                    interpolType
                );
                outputImage[i + 0] = pixelvalues.red;
                outputImage[i + 1] = pixelvalues.green;
                outputImage[i + 2] = pixelvalues.blue;
                outputImage[i + 3] = 255;
            }
        }
    } else {
        for (let i = 0; i <= outputImage.data.length; i += 4) {
            currCoord = getCoordinates(outputImage, i);
            origCoord = {
                x: currCoord.x * Math.pow(2, scaleFactor),
                y: currCoord.y * Math.pow(2, scaleFactor),
            };
            if (
                origCoord.x % 1 === 0 &&
                origCoord.y % 1 === 0 &&
                origCoord.x < inputImage.width &&
                origCoord.y < inputImage.height
            ) {
                tempIndex = getIndex(inputImage, origCoord.x, origCoord.y);
                outputImage[i + 0] = inputImage[tempIndex + 0];
                outputImage[i + 1] = inputImage[tempIndex + 1];
                outputImage[i + 2] = inputImage[tempIndex + 2];
                outputImage[i + 3] = 255;
            }
        }
    }

    return outputImage;
}
