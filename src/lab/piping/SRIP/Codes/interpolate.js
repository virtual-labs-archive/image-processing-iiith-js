/**
 *
 * @param {ImageData} inputImage
 * @param {number} xCoord
 * @param {number} yCoord
 * @param {string} type
 */
function interpolate(inputImage, xCoord, yCoord, type) {
    let pixelValues = new Object();
    pixelValues.alpha = 255;
    let index = 0;
    switch (type) {
        case "nearest":
            index = getIndex(
                inputImage,
                Math.round(xCoord),
                Math.round(yCoord)
            );
            pixelvalues.red = inputImage.data[index + 0];
            pixelvalues.green = inputImage.data[index + 1];
            pixelvalues.blue = inputImage.data[index + 2];
            break;
        case "bilinear":
            let paddedImage = new ImageData(
                1 + inputImage.width + 1,
                1 + inputImage.height + 1
            );
            for (let i = 0; i < paddedImage.data.length; i += 4) {
                let tempx = getCoordinates(paddedImage, i).x;
                let tempy = getCoordinates(paddedImage, i).y;

                tempindex = getIndex(inputImage, tempx, tempy);

                if (
                    tempx !== 0 &&
                    tempx !== paddedImage.width - 1 &&
                    tempy !== 0 &&
                    tempy !== paddedImage.height - 1
                ) {
                    paddedImage.data[i + 0] = inputImage[index + 0];
                    paddedImage.data[i + 1] = inputImage[index + 1];
                    paddedImage.data[i + 2] = inputImage[index + 2];
                    paddedImage.data[i + 3] = 255;
                }
            }
            let tempx = xCoord + 1;
            let tempy = yCoord + 1;
            index = getIndex(
                paddedImage,
                Math.floor(tempx),
                Math.floor(tempy)
            );
            let topLeftRedVal = paddedImage.data[index + 0];
            let topRightRedVal = paddedImage.data[index + 4];
            let bottomLeftRedVal =
                paddedImage.data[index + paddedImage.width * 4];
            let bottomRightRedVal =
                paddedImage.data[index + paddedImage.width * 4 + 4];

            let topRedVal =
                (topRightRedVal - topLeftRedVal) * (tempx - Math.floor(tempx)) +
                topLeftRedVal;
            let bottomRedVal =
                (bottomRightRedVal - bottomLeftRedVal) *
                    (tempx - Math.floor(tempx)) +
                bottomLeftRedVal;

            let interpolatedRedVal =
                (topRedVal - bottomRedVal) * (tempy - Math.floor(tempy)) +
                bottomRedVal;

            pixelValues.red = interpolatedRedVal;
            pixelValues.blue = interpolatedRedVal;
            pixelValues.green = interpolatedRedVal;
            break;
        case "bicubic":
            break;

        default:
            break;
    }

    return pixelValues;
}
