/**
 *
 * @param {ImageData} inputImage
 * @param {number} filterSize
 */
function strAvgFilter(inputImage, filterSize) {
    let outputImage = new ImageData(inputImage.width, inputImage.height);

    // Needs to be used in the loop
    let paddingWidth = (filterSize - 1) / 2;

    // Weights for the filter
    let weights = new Object;
    weights = {
        w00 : 1, w01 : 1, w02 : 1, w03 : 1, w04 : 1, w05 : 1, w06 : 1,
        w10 : 1, w11 : 1, w12 : 1, w13 : 1, w14 : 1, w15 : 1, w16 : 1,
        w20 : 1, w21 : 1, w22 : 1, w23 : 1, w24 : 1, w25 : 1, w26 : 1,
        w30 : 1, w31 : 1, w32 : 1, w33 : 1, w34 : 1, w35 : 1, w36 : 1,
        w40 : 1, w41 : 1, w42 : 1, w43 : 1, w44 : 1, w45 : 1, w46 : 1,
    };

    let paddedImage = new ImageData(inputImage.width + (paddingWidth * 2), inputImage.height + (paddingWidth * 2));

    let origIndex = 0;
    let tempCoord = new Object();

    // Starting loop from 1st pixel and ending at last pixel of output image to save useless cycles of loop
    // Also not checking for y inside as loop is limited in the y axis
    for(let i = getIndex(paddedImage, paddingWidth, paddingWidth); i < getIndex(paddedImage, inputImage.width, inputImage.height); i += 4) {
        tempCoord = getCoordinates(paddedImage, i);
        if(tempCoord.x >= paddingWidth && tempCoord.x < (paddedImage.width - paddingWidth)) {
            origIndex = getIndex(outputImage, tempCoord.x, tempCoord.y);
            let sum = 0;
            let neighbourPixels = {};
            switch (filterSize) {
                case 3:
                    neighbourPixels = get3neighbourPixels(paddedImage, i);
                    sum = neighbourPixels.p00 * weights.w00 + neighbourPixels.p01 * weights.w01 + neighbourPixels.p02 * weights.w02 +
                              neighbourPixels.p10 * weights.w10 + neighbourPixels.p11 * weights.w11 + neighbourPixels.p12 * weights.w12 +
                              neighbourPixels.p20 * weights.w20 + neighbourPixels.p21 * weights.w21 + neighbourPixels.p22 * weights.w22;
                    sum /= 9;
                    break;
                case 5:
                    neighbourPixels = get5neighbourPixels(paddedImage, i);
                    sum = neighbourPixels.p00 * weights.w00 + neighbourPixels.p01 * weights.w01 + neighbourPixels.p02 * weights.w02 + neighbourPixels.p03 * weights.w03 + neighbourPixels.p04 * weights.w04
                        + neighbourPixels.p10 * weights.w10 + neighbourPixels.p11 * weights.w11 + neighbourPixels.p12 * weights.w12 + neighbourPixels.p13 * weights.w13 + neighbourPixels.p14 * weights.w14
                        + neighbourPixels.p20 * weights.w20 + neighbourPixels.p21 * weights.w21 + neighbourPixels.p22 * weights.w22 + neighbourPixels.p23 * weights.w23 + neighbourPixels.p24 * weights.w24 
                        + neighbourPixels.p30 * weights.w30 + neighbourPixels.p31 * weights.w31 + neighbourPixels.p32 * weights.w32 + neighbourPixels.p33 * weights.w33 + neighbourPixels.p34 * weights.w34 
                        + neighbourPixels.p40 * weights.w40 + neighbourPixels.p41 * weights.w41 + neighbourPixels.p42 * weights.w42 + neighbourPixels.p43 * weights.w43 + neighbourPixels.p44 * weights.w44;
                    sum /= 25;
                    break;
                case 7:
                    neighbourPixels = get7neighbourPixels(paddedImage, i);
                    sum = neighbourPixels.p00 * weights.w00 + neighbourPixels.p01 * weights.w01 + neighbourPixels.p02 * weights.w02 + neighbourPixels.p03 * weights.w03 + neighbourPixels.p04 * weights.w04 + neighbourPixels.p05 * weights.w05 + neighbourPixels.p06 * weights.w06
                        + neighbourPixels.p10 * weights.w10 + neighbourPixels.p11 * weights.w11 + neighbourPixels.p12 * weights.w12 + neighbourPixels.p13 * weights.w13 + neighbourPixels.p14 * weights.w14 + neighbourPixels.p15 * weights.w15 + neighbourPixels.p16 * weights.w16
                        + neighbourPixels.p20 * weights.w20 + neighbourPixels.p21 * weights.w21 + neighbourPixels.p22 * weights.w22 + neighbourPixels.p23 * weights.w23 + neighbourPixels.p24 * weights.w24 + neighbourPixels.p25 * weights.w25 + neighbourPixels.p26 * weights.w26 
                        + neighbourPixels.p30 * weights.w30 + neighbourPixels.p31 * weights.w31 + neighbourPixels.p32 * weights.w32 + neighbourPixels.p33 * weights.w33 + neighbourPixels.p34 * weights.w34 + neighbourPixels.p35 * weights.w35 + neighbourPixels.p36 * weights.w36 
                        + neighbourPixels.p40 * weights.w40 + neighbourPixels.p41 * weights.w41 + neighbourPixels.p42 * weights.w42 + neighbourPixels.p43 * weights.w43 + neighbourPixels.p44 * weights.w44 + neighbourPixels.p45 * weights.w45 + neighbourPixels.p46 * weights.w46
                        + neighbourPixels.p50 * weights.w50 + neighbourPixels.p51 * weights.w51 + neighbourPixels.p52 * weights.w52 + neighbourPixels.p53 * weights.w53 + neighbourPixels.p54 * weights.w54 + neighbourPixels.p55 * weights.w55 + neighbourPixels.p56 * weights.w56
                        + neighbourPixels.p60 * weights.w60 + neighbourPixels.p61 * weights.w61 + neighbourPixels.p62 * weights.w62 + neighbourPixels.p63 * weights.w63 + neighbourPixels.p64 * weights.w64 + neighbourPixels.p65 * weights.w65 + neighbourPixels.p66 * weights.w66;
                    sum /= 49;
                    break;
                default:
                    break;
            }
            outputImage[origIndex + 0] = sum;
            outputImage[origIndex + 1] = sum;
            outputImage[origIndex + 2] = sum;
            outputImage[origIndex + 3] = 255;
        }
    }
}

/**
 *
 * @param {ImageData} inputImage
 * @param {number} filterSize
 */
function triangleFilter(inputImage, filterSize) {
    let outputImage = new ImageData(inputImage.width, inputImage.height);

    // Needs to be used in the loop
    let paddingWidth = (filterSize - 1) / 2;

    // Weights for the filter
    let weights = new Object;

    let paddedImage = new ImageData(inputImage.width + (paddingWidth * 2), inputImage.height + (paddingWidth * 2));

    let origIndex = 0;
    let tempCoord = new Object();

    // Starting loop from 1st pixel and ending at last pixel of output image to save useless cycles of loop
    // Also not checking for y inside as loop is limited in the y axis
    for(let i = getIndex(paddedImage, paddingWidth, paddingWidth); i < getIndex(paddedImage, inputImage.width, inputImage.height); i += 4) {
        tempCoord = getCoordinates(paddedImage, i);
        if(tempCoord.x >= paddingWidth && tempCoord.x < (paddedImage.width - paddingWidth)) {
            origIndex = getIndex(outputImage, tempCoord.x, tempCoord.y);
            let sum = 0;
            let neighbourPixels = {};
            switch (filterSize) {
                case 3:
                    weights = {
                        w00 : 1, w01 : 1, w02 : 1,
                        w10 : 1, w11 : 1, w12 : 1,
                        w20 : 1, w21 : 1, w22 : 1
                    };
                    neighbourPixels = get3neighbourPixels(paddedImage, i);
                    sum = neighbourPixels.p00 * weights.w00 + neighbourPixels.p01 * weights.w01 + neighbourPixels.p02 * weights.w02 +
                              neighbourPixels.p10 * weights.w10 + neighbourPixels.p11 * weights.w11 + neighbourPixels.p12 * weights.w12 +
                              neighbourPixels.p20 * weights.w20 + neighbourPixels.p21 * weights.w21 + neighbourPixels.p22 * weights.w22;
                    sum /= 9;
                    break;
                case 5:
                    weights = {
                        w00 : 1, w01 : 2, w02 : 3, w03 : 2, w04 : 1,
                        w10 : 2, w11 : 4, w12 : 6, w13 : 4, w14 : 2,
                        w20 : 3, w21 : 6, w22 : 9, w23 : 6, w24 : 3,
                        w30 : 2, w31 : 4, w32 : 6, w33 : 4, w34 : 2,
                        w40 : 1, w41 : 2, w42 : 3, w43 : 2, w44 : 1
                    };
                    neighbourPixels = get5neighbourPixels(paddedImage, i);
                    sum = neighbourPixels.p00 * weights.w00 + neighbourPixels.p01 * weights.w01 + neighbourPixels.p02 * weights.w02 + neighbourPixels.p03 * weights.w03 + neighbourPixels.p04 * weights.w04
                        + neighbourPixels.p10 * weights.w10 + neighbourPixels.p11 * weights.w11 + neighbourPixels.p12 * weights.w12 + neighbourPixels.p13 * weights.w13 + neighbourPixels.p14 * weights.w14
                        + neighbourPixels.p20 * weights.w20 + neighbourPixels.p21 * weights.w21 + neighbourPixels.p22 * weights.w22 + neighbourPixels.p23 * weights.w23 + neighbourPixels.p24 * weights.w24 
                        + neighbourPixels.p30 * weights.w30 + neighbourPixels.p31 * weights.w31 + neighbourPixels.p32 * weights.w32 + neighbourPixels.p33 * weights.w33 + neighbourPixels.p34 * weights.w34 
                        + neighbourPixels.p40 * weights.w40 + neighbourPixels.p41 * weights.w41 + neighbourPixels.p42 * weights.w42 + neighbourPixels.p43 * weights.w43 + neighbourPixels.p44 * weights.w44;
                    sum /= 81;
                    break;
                case 7:
                    weights = {
                        w00 : 1, w01 : 1, w02 : 1, w03 : 1, w04 : 1, w05 : 1, w06 : 1,
                        w10 : 1, w11 : 1, w12 : 1, w13 : 1, w14 : 1, w15 : 1, w16 : 1,
                        w20 : 1, w21 : 1, w22 : 1, w23 : 1, w24 : 1, w25 : 1, w26 : 1,
                        w30 : 1, w31 : 1, w32 : 1, w33 : 1, w34 : 1, w35 : 1, w36 : 1,
                        w40 : 1, w41 : 1, w42 : 1, w43 : 1, w44 : 1, w45 : 1, w46 : 1,
                        w50 : 1, w51 : 1, w52 : 1, w53 : 1, w54 : 1, w55 : 1, w56 : 1,
                        w60 : 1, w61 : 1, w62 : 1, w63 : 1, w64 : 1, w65 : 1, w66 : 1
                    };
                    neighbourPixels = get7neighbourPixels(paddedImage, i);
                    sum = neighbourPixels.p00 * weights.w00 + neighbourPixels.p01 * weights.w01 + neighbourPixels.p02 * weights.w02 + neighbourPixels.p03 * weights.w03 + neighbourPixels.p04 * weights.w04 + neighbourPixels.p05 * weights.w05 + neighbourPixels.p06 * weights.w06
                        + neighbourPixels.p10 * weights.w10 + neighbourPixels.p11 * weights.w11 + neighbourPixels.p12 * weights.w12 + neighbourPixels.p13 * weights.w13 + neighbourPixels.p14 * weights.w14 + neighbourPixels.p15 * weights.w15 + neighbourPixels.p16 * weights.w16
                        + neighbourPixels.p20 * weights.w20 + neighbourPixels.p21 * weights.w21 + neighbourPixels.p22 * weights.w22 + neighbourPixels.p23 * weights.w23 + neighbourPixels.p24 * weights.w24 + neighbourPixels.p25 * weights.w25 + neighbourPixels.p26 * weights.w26 
                        + neighbourPixels.p30 * weights.w30 + neighbourPixels.p31 * weights.w31 + neighbourPixels.p32 * weights.w32 + neighbourPixels.p33 * weights.w33 + neighbourPixels.p34 * weights.w34 + neighbourPixels.p35 * weights.w35 + neighbourPixels.p36 * weights.w36 
                        + neighbourPixels.p40 * weights.w40 + neighbourPixels.p41 * weights.w41 + neighbourPixels.p42 * weights.w42 + neighbourPixels.p43 * weights.w43 + neighbourPixels.p44 * weights.w44 + neighbourPixels.p45 * weights.w45 + neighbourPixels.p46 * weights.w46
                        + neighbourPixels.p50 * weights.w50 + neighbourPixels.p51 * weights.w51 + neighbourPixels.p52 * weights.w52 + neighbourPixels.p53 * weights.w53 + neighbourPixels.p54 * weights.w54 + neighbourPixels.p55 * weights.w55 + neighbourPixels.p56 * weights.w56
                        + neighbourPixels.p60 * weights.w60 + neighbourPixels.p61 * weights.w61 + neighbourPixels.p62 * weights.w62 + neighbourPixels.p63 * weights.w63 + neighbourPixels.p64 * weights.w64 + neighbourPixels.p65 * weights.w65 + neighbourPixels.p66 * weights.w66;
                    sum /= 49;
                    break;
                default:
                    break;
            }
            outputImage[origIndex + 0] = sum;
            outputImage[origIndex + 1] = sum;
            outputImage[origIndex + 2] = sum;
            outputImage[origIndex + 3] = 255;
        }
    }
}


/**
 *
 * @param {ImageData} inputImage
 * @param {number} filterSize
 */
function triangleFilter(inputImage, filterSize) {
    let outputImage = new ImageData(inputImage.width, inputImage.height);

    // Needs to be used in the loop
    let paddingWidth = (filterSize - 1) / 2;

    // Weights for the filter
    let weights = new Object;

    let paddedImage = new ImageData(inputImage.width + (paddingWidth * 2), inputImage.height + (paddingWidth * 2));

    let origIndex = 0;
    let tempCoord = new Object();

    // Starting loop from 1st pixel and ending at last pixel of output image to save useless cycles of loop
    // Also not checking for y inside as loop is limited in the y axis
    for(let i = getIndex(paddedImage, paddingWidth, paddingWidth); i < getIndex(paddedImage, inputImage.width, inputImage.height); i += 4) {
        tempCoord = getCoordinates(paddedImage, i);
        if(tempCoord.x >= paddingWidth && tempCoord.x < (paddedImage.width - paddingWidth)) {
            origIndex = getIndex(outputImage, tempCoord.x, tempCoord.y);
            let sum = 0;
            let neighbourPixels = {};
            switch (filterSize) {
                case 3:
                    weights = {
                        w00 : 1, w01 : 2, w02 : 1,
                        w10 : 2, w11 : 4, w12 : 2,
                        w20 : 1, w21 : 2, w22 : 1
                    };
                    neighbourPixels = get3neighbourPixels(paddedImage, i);
                    sum = neighbourPixels.p00 * weights.w00 + neighbourPixels.p01 * weights.w01 + neighbourPixels.p02 * weights.w02 +
                              neighbourPixels.p10 * weights.w10 + neighbourPixels.p11 * weights.w11 + neighbourPixels.p12 * weights.w12 +
                              neighbourPixels.p20 * weights.w20 + neighbourPixels.p21 * weights.w21 + neighbourPixels.p22 * weights.w22;
                    sum /= 16;
                    break;
                case 5:
                    weights = {
                        w00 : 1, w01 :  4, w02 :  7, w03 :  4, w04 : 1,
                        w10 : 4, w11 : 16, w12 : 26, w13 : 16, w14 : 4,
                        w20 : 7, w21 : 26, w22 : 41, w23 : 26, w24 : 7,
                        w30 : 4, w31 : 16, w32 : 26, w33 : 16, w34 : 4,
                        w40 : 1, w41 :  4, w42 :  7, w43 :  4, w44 : 1
                    };
                    neighbourPixels = get5neighbourPixels(paddedImage, i);
                    sum = neighbourPixels.p00 * weights.w00 + neighbourPixels.p01 * weights.w01 + neighbourPixels.p02 * weights.w02 + neighbourPixels.p03 * weights.w03 + neighbourPixels.p04 * weights.w04
                        + neighbourPixels.p10 * weights.w10 + neighbourPixels.p11 * weights.w11 + neighbourPixels.p12 * weights.w12 + neighbourPixels.p13 * weights.w13 + neighbourPixels.p14 * weights.w14
                        + neighbourPixels.p20 * weights.w20 + neighbourPixels.p21 * weights.w21 + neighbourPixels.p22 * weights.w22 + neighbourPixels.p23 * weights.w23 + neighbourPixels.p24 * weights.w24 
                        + neighbourPixels.p30 * weights.w30 + neighbourPixels.p31 * weights.w31 + neighbourPixels.p32 * weights.w32 + neighbourPixels.p33 * weights.w33 + neighbourPixels.p34 * weights.w34 
                        + neighbourPixels.p40 * weights.w40 + neighbourPixels.p41 * weights.w41 + neighbourPixels.p42 * weights.w42 + neighbourPixels.p43 * weights.w43 + neighbourPixels.p44 * weights.w44;
                    sum /= 273;
                    break;
                case 7:
                    weights = {
                        w00 : 0, w01 :  0, w02 :  1, w03 :   2, w04 :  1, w05 :  0, w06 : 0,
                        w10 : 0, w11 :  3, w12 : 13, w13 :  22, w14 : 13, w15 :  3, w16 : 0,
                        w20 : 1, w21 : 13, w22 : 59, w23 :  97, w24 : 59, w25 : 13, w26 : 1,
                        w30 : 2, w31 : 22, w32 : 97, w33 : 159, w34 : 97, w35 : 22, w36 : 2,
                        w40 : 1, w41 : 13, w42 : 59, w43 :  97, w44 : 59, w45 : 13, w46 : 1,
                        w50 : 0, w51 :  3, w52 : 13, w53 :  22, w54 : 13, w55 :  3, w56 : 0,
                        w60 : 0, w61 :  0, w62 :  1, w63 :   2, w64 :  1, w65 :  0, w66 : 0
                    };
                    neighbourPixels = get7neighbourPixels(paddedImage, i);
                    sum = neighbourPixels.p00 * weights.w00 + neighbourPixels.p01 * weights.w01 + neighbourPixels.p02 * weights.w02 + neighbourPixels.p03 * weights.w03 + neighbourPixels.p04 * weights.w04 + neighbourPixels.p05 * weights.w05 + neighbourPixels.p06 * weights.w06
                        + neighbourPixels.p10 * weights.w10 + neighbourPixels.p11 * weights.w11 + neighbourPixels.p12 * weights.w12 + neighbourPixels.p13 * weights.w13 + neighbourPixels.p14 * weights.w14 + neighbourPixels.p15 * weights.w15 + neighbourPixels.p16 * weights.w16
                        + neighbourPixels.p20 * weights.w20 + neighbourPixels.p21 * weights.w21 + neighbourPixels.p22 * weights.w22 + neighbourPixels.p23 * weights.w23 + neighbourPixels.p24 * weights.w24 + neighbourPixels.p25 * weights.w25 + neighbourPixels.p26 * weights.w26 
                        + neighbourPixels.p30 * weights.w30 + neighbourPixels.p31 * weights.w31 + neighbourPixels.p32 * weights.w32 + neighbourPixels.p33 * weights.w33 + neighbourPixels.p34 * weights.w34 + neighbourPixels.p35 * weights.w35 + neighbourPixels.p36 * weights.w36 
                        + neighbourPixels.p40 * weights.w40 + neighbourPixels.p41 * weights.w41 + neighbourPixels.p42 * weights.w42 + neighbourPixels.p43 * weights.w43 + neighbourPixels.p44 * weights.w44 + neighbourPixels.p45 * weights.w45 + neighbourPixels.p46 * weights.w46
                        + neighbourPixels.p50 * weights.w50 + neighbourPixels.p51 * weights.w51 + neighbourPixels.p52 * weights.w52 + neighbourPixels.p53 * weights.w53 + neighbourPixels.p54 * weights.w54 + neighbourPixels.p55 * weights.w55 + neighbourPixels.p56 * weights.w56
                        + neighbourPixels.p60 * weights.w60 + neighbourPixels.p61 * weights.w61 + neighbourPixels.p62 * weights.w62 + neighbourPixels.p63 * weights.w63 + neighbourPixels.p64 * weights.w64 + neighbourPixels.p65 * weights.w65 + neighbourPixels.p66 * weights.w66;
                    sum /= 1003;
                    break;
                default:
                    break;
            }
            outputImage[origIndex + 0] = sum;
            outputImage[origIndex + 1] = sum;
            outputImage[origIndex + 2] = sum;
            outputImage[origIndex + 3] = 255;
        }
    }
}


/**
 *
 * @param {ImageData} inputImage
 * @param {number} centerIndex
 */
function get3neighbourPixels(inputImage, centerIndex) {
    let neighbourPixels = new Objects();
    neighbourPixels.p00 = inputImage[centerIndex - (4 * inputImage.width) - 4]; neighbourPixels.p01 = inputImage[centerIndex - (4 * inputImage.width)]; neighbourPixels.p02 = inputImage[centerIndex - (4 * inputImage.width) + 4];
    neighbourPixels.p10 = inputImage[centerIndex                          - 4]; neighbourPixels.p11 = inputImage[centerIndex                         ]; neighbourPixels.p12 = inputImage[centerIndex                          + 4];
    neighbourPixels.p20 = inputImage[centerIndex + (4 * inputImage.width) - 4]; neighbourPixels.p21 = inputImage[centerIndex + (4 * inputImage.width)]; neighbourPixels.p22 = inputImage[centerIndex + (4 * inputImage.width) + 4];

    return neighbourPixels;
}


/**
 *
 * @param {ImageData} inputImage
 * @param {number} centerIndex
 */
function get5NeighbourPixels(inputImage, centerIndex) {
    let neighbourPixels = new Objects();
    neighbourPixels.p00 = inputImage[centerIndex - (4 * inputImage.width * 2) - (4 * 2)]; neighbourPixels.p01 = inputImage[centerIndex - (4 * inputImage.width * 2) - (4 * 1)]; neighbourPixels.p02 = inputImage[centerIndex - (4 * inputImage.width * 2)]; neighbourPixels.p03 = inputImage[centerIndex - (4 * inputImage.width * 2) + (4 * 1)]; neighbourPixels.p04 = inputImage[centerIndex - (4 * inputImage.width * 2) + (4 * 2)];
    neighbourPixels.p10 = inputImage[centerIndex - (4 * inputImage.width * 1) - (4 * 2)]; neighbourPixels.p11 = inputImage[centerIndex - (4 * inputImage.width * 1) - (4 * 1)]; neighbourPixels.p12 = inputImage[centerIndex - (4 * inputImage.width * 1)]; neighbourPixels.p13 = inputImage[centerIndex - (4 * inputImage.width * 2) + (4 * 1)]; neighbourPixels.p14 = inputImage[centerIndex - (4 * inputImage.width * 1) + (4 * 2)];
    neighbourPixels.p20 = inputImage[centerIndex                              - (4 * 2)]; neighbourPixels.p21 = inputImage[centerIndex                              - (4 * 1)]; neighbourPixels.p22 = inputImage[centerIndex                             ]; neighbourPixels.p23 = inputImage[centerIndex                              + (4 * 1)]; neighbourPixels.p24 = inputImage[centerIndex                              + (4 * 2)];
    neighbourPixels.p30 = inputImage[centerIndex + (4 * inputImage.width * 2) - (4 * 2)]; neighbourPixels.p31 = inputImage[centerIndex + (4 * inputImage.width * 1) - (4 * 1)]; neighbourPixels.p32 = inputImage[centerIndex + (4 * inputImage.width * 1)]; neighbourPixels.p33 = inputImage[centerIndex + (4 * inputImage.width * 2) + (4 * 1)]; neighbourPixels.p34 = inputImage[centerIndex + (4 * inputImage.width * 1) + (4 * 2)];
    neighbourPixels.p40 = inputImage[centerIndex + (4 * inputImage.width * 2) - (4 * 2)]; neighbourPixels.p41 = inputImage[centerIndex + (4 * inputImage.width * 2) - (4 * 1)]; neighbourPixels.p42 = inputImage[centerIndex + (4 * inputImage.width * 2)]; neighbourPixels.p43 = inputImage[centerIndex + (4 * inputImage.width * 2) + (4 * 1)]; neighbourPixels.p44 = inputImage[centerIndex + (4 * inputImage.width * 2) + (4 * 2)];

    return neighbourPixels;
}


/**
 *
 * @param {ImageData} inputImage
 * @param {number} centerIndex
 */
function get7NeighbourPixels(inputImage, centerIndex) {
    neighbourPixels.p00 = inputImage[centerIndex - (4 * inputImage.width * 3) - (4 * 3)]; neighbourPixels.p01 = inputImage[centerIndex - (4 * inputImage.width * 3) - (4 * 2)]; neighbourPixels.p02 = inputImage[centerIndex - (4 * inputImage.width * 3) - (4 * 1)]; neighbourPixels.p03 = inputImage[centerIndex - (4 * inputImage.width * 3)]; neighbourPixels.p04 = inputImage[centerIndex - (4 * inputImage.width * 3) + (4 * 1)]; neighbourPixels.p05 = inputImage[centerIndex - (4 * inputImage.width * 3) + (4 * 2)];  neighbourPixels.p06 = inputImage[centerIndex - (4 * inputImage.width * 3) + (4 * 3)];
    neighbourPixels.p10 = inputImage[centerIndex - (4 * inputImage.width * 2) - (4 * 3)]; neighbourPixels.p11 = inputImage[centerIndex - (4 * inputImage.width * 2) - (4 * 2)]; neighbourPixels.p12 = inputImage[centerIndex - (4 * inputImage.width * 2) - (4 * 1)]; neighbourPixels.p13 = inputImage[centerIndex - (4 * inputImage.width * 2)]; neighbourPixels.p14 = inputImage[centerIndex - (4 * inputImage.width * 2) + (4 * 1)]; neighbourPixels.p15 = inputImage[centerIndex - (4 * inputImage.width * 2) + (4 * 2)];  neighbourPixels.p16 = inputImage[centerIndex - (4 * inputImage.width * 2) + (4 * 3)];
    neighbourPixels.p20 = inputImage[centerIndex - (4 * inputImage.width * 1) - (4 * 3)]; neighbourPixels.p21 = inputImage[centerIndex - (4 * inputImage.width * 1) - (4 * 2)]; neighbourPixels.p22 = inputImage[centerIndex - (4 * inputImage.width * 1) - (4 * 1)]; neighbourPixels.p23 = inputImage[centerIndex - (4 * inputImage.width * 1)]; neighbourPixels.p24 = inputImage[centerIndex - (4 * inputImage.width * 1) + (4 * 1)]; neighbourPixels.p25 = inputImage[centerIndex - (4 * inputImage.width * 1) + (4 * 2)];  neighbourPixels.p26 = inputImage[centerIndex - (4 * inputImage.width * 1) + (4 * 3)];
    neighbourPixels.p30 = inputImage[centerIndex                              - (4 * 3)]; neighbourPixels.p31 = inputImage[centerIndex                              - (4 * 2)]; neighbourPixels.p32 = inputImage[centerIndex                              - (4 * 1)]; neighbourPixels.p33 = inputImage[centerIndex                             ]; neighbourPixels.p34 = inputImage[centerIndex                              + (4 * 1)]; neighbourPixels.p35 = inputImage[centerIndex                              + (4 * 2)];  neighbourPixels.p36 = inputImage[centerIndex                              + (4 * 3)];
    neighbourPixels.p40 = inputImage[centerIndex + (4 * inputImage.width * 1) - (4 * 3)]; neighbourPixels.p41 = inputImage[centerIndex + (4 * inputImage.width * 1) - (4 * 2)]; neighbourPixels.p42 = inputImage[centerIndex + (4 * inputImage.width * 1) - (4 * 1)]; neighbourPixels.p43 = inputImage[centerIndex + (4 * inputImage.width * 1)]; neighbourPixels.p44 = inputImage[centerIndex + (4 * inputImage.width * 1) + (4 * 1)]; neighbourPixels.p45 = inputImage[centerIndex + (4 * inputImage.width * 1) + (4 * 2)];  neighbourPixels.p46 = inputImage[centerIndex + (4 * inputImage.width * 1) + (4 * 3)];
    neighbourPixels.p50 = inputImage[centerIndex + (4 * inputImage.width * 2) - (4 * 3)]; neighbourPixels.p51 = inputImage[centerIndex + (4 * inputImage.width * 2) - (4 * 2)]; neighbourPixels.p52 = inputImage[centerIndex + (4 * inputImage.width * 2) - (4 * 1)]; neighbourPixels.p53 = inputImage[centerIndex + (4 * inputImage.width * 2)]; neighbourPixels.p54 = inputImage[centerIndex + (4 * inputImage.width * 2) + (4 * 1)]; neighbourPixels.p55 = inputImage[centerIndex + (4 * inputImage.width * 2) + (4 * 2)];  neighbourPixels.p56 = inputImage[centerIndex + (4 * inputImage.width * 2) + (4 * 3)];
    neighbourPixels.p60 = inputImage[centerIndex + (4 * inputImage.width * 3) - (4 * 3)]; neighbourPixels.p61 = inputImage[centerIndex + (4 * inputImage.width * 3) - (4 * 2)]; neighbourPixels.p62 = inputImage[centerIndex + (4 * inputImage.width * 3) - (4 * 1)]; neighbourPixels.p63 = inputImage[centerIndex + (4 * inputImage.width * 3)]; neighbourPixels.p64 = inputImage[centerIndex + (4 * inputImage.width * 3) + (4 * 1)]; neighbourPixels.p65 = inputImage[centerIndex + (4 * inputImage.width * 3) + (4 * 2)];  neighbourPixels.p66 = inputImage[centerIndex + (4 * inputImage.width * 3) + (4 * 3)];

    return neighbourPixels;
}