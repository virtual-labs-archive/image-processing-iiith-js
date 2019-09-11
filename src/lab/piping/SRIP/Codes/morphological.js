/**
 *
 * @param {ImageData} inputImage
 * @param {string} strElementType
 * @param {number} strElementSize
 */
function morphologicalDilation(inputImage, strElementType, strElementSize) {
    let outputImage = new ImageData(inputImage.width, inputImage.height);

    // Weights for the filter
    let weights = new Object;

    let boundarySize = (strElementSize - 1) / 2;

    let origIndex = 0;
    let tempCoord = new Object();

    switch (strElementSize) {
        case 3:
            switch (strElementType) {
                case "disc":
                    weights = {
                        w00 : 0, w01 : 1, w02 : 0,
                        w10 : 1, w11 : 1, w12 : 1,
                        w20 : 0, w21 : 1, w22 : 0
                    };
                    break;
                case "square":
                    weights = {
                        w00 : 1, w01 : 1, w02 : 1,
                        w10 : 1, w11 : 1, w12 : 1,
                        w20 : 1, w21 : 1, w22 : 1
                    };
                    break;
                case "line":
                    if(horizontalLine === true) {
                        weights = {
                            w00 : 0, w01 : 0, w02 : 0,
                            w10 : 1, w11 : 1, w12 : 1,
                            w20 : 0, w21 : 0, w22 : 0
                        };
                    }
                    else{
                        weights = {
                            w00 : 0, w01 : 1, w02 : 0,
                            w10 : 0, w11 : 1, w12 : 0,
                            w20 : 0, w21 : 1, w22 : 0
                        };
                    }
                    break;
            }
            break;
        case 5:
            switch (strElementType) {
                case "disc":
                    weights = {
                        w00 : 0, w01 : 0, w02 : 1, w03 : 0, w04 : 0,
                        w10 : 0, w11 : 1, w12 : 1, w13 : 1, w14 : 0,
                        w20 : 1, w21 : 1, w22 : 1, w23 : 1, w24 : 1,
                        w30 : 0, w31 : 1, w32 : 1, w33 : 1, w34 : 0,
                        w40 : 0, w41 : 0, w42 : 1, w43 : 0, w44 : 0
                    };
                    break;
                case "square":
                    weights = {
                        w00 : 1, w01 : 1, w02 : 1, w03 : 1, w04 : 1,
                        w10 : 1, w11 : 1, w12 : 1, w13 : 1, w14 : 1,
                        w20 : 1, w21 : 1, w22 : 1, w23 : 1, w24 : 1,
                        w30 : 1, w31 : 1, w32 : 1, w33 : 1, w34 : 1,
                        w40 : 1, w41 : 1, w42 : 1, w43 : 1, w44 : 1
                    };
                    break;
                case "line":
                    if(horizontalLine === true) {
                        weights = {
                            w00 : 0, w01 : 0, w02 : 0, w03 : 0, w04 : 0,
                            w10 : 0, w11 : 0, w12 : 0, w13 : 0, w14 : 0,
                            w20 : 1, w21 : 1, w22 : 1, w23 : 1, w24 : 1,
                            w30 : 0, w31 : 0, w32 : 0, w33 : 0, w34 : 0,
                            w40 : 0, w41 : 0, w42 : 0, w43 : 0, w44 : 0
                        };
                    }
                    else{
                        weights = {
                            w00 : 0, w01 : 0, w02 : 1, w03 : 0, w04 : 0,
                            w10 : 0, w11 : 0, w12 : 1, w13 : 0, w14 : 0,
                            w20 : 0, w21 : 0, w22 : 1, w23 : 0, w24 : 0,
                            w30 : 0, w31 : 0, w32 : 1, w33 : 0, w34 : 0,
                            w40 : 0, w41 : 0, w42 : 1, w43 : 0, w44 : 0
                        };
                    }
                    break;
            }
            break;
        case 7:
            switch (strElementType) {
                case "disc":
                    weights = {
                        w00 : 0, w01 : 0, w02 : 0, w03 : 1, w04 : 0, w05 : 0, w06 : 0,
                        w10 : 0, w11 : 1, w12 : 1, w13 : 1, w14 : 1, w15 : 1, w16 : 0,
                        w20 : 0, w21 : 1, w22 : 1, w23 : 1, w24 : 1, w25 : 1, w26 : 0,
                        w30 : 1, w31 : 1, w32 : 1, w33 : 1, w34 : 1, w35 : 1, w36 : 1,
                        w40 : 0, w41 : 1, w42 : 1, w43 : 1, w44 : 1, w45 : 1, w46 : 0,
                        w50 : 0, w51 : 1, w52 : 1, w53 : 1, w54 : 1, w55 : 1, w56 : 0,
                        w60 : 0, w61 : 0, w62 : 0, w63 : 1, w64 : 0, w65 : 0, w66 : 0,
                    };
                    break;
                case "square":
                    weights = {
                        w00 : 1, w01 : 1, w02 : 1, w03 : 1, w04 : 1, w05 : 1, w06 : 1,
                        w10 : 1, w11 : 1, w12 : 1, w13 : 1, w14 : 1, w15 : 1, w16 : 1,
                        w20 : 1, w21 : 1, w22 : 1, w23 : 1, w24 : 1, w25 : 1, w26 : 1,
                        w30 : 1, w31 : 1, w32 : 1, w33 : 1, w34 : 1, w35 : 1, w36 : 1,
                        w40 : 1, w41 : 1, w42 : 1, w43 : 1, w44 : 1, w45 : 1, w46 : 1,
                        w50 : 1, w51 : 1, w52 : 1, w53 : 1, w54 : 1, w55 : 1, w56 : 1,
                        w60 : 1, w61 : 1, w62 : 1, w63 : 1, w64 : 1, w65 : 1, w66 : 1,
                    };
                    break;
                case "line":
                    if(horizontalLine === true) {
                        weights = {
                            w00 : 0, w01 : 0, w02 : 0, w03 : 0, w04 : 0, w05 : 0, w06 : 0,
                            w10 : 0, w11 : 0, w12 : 0, w13 : 0, w14 : 0, w15 : 0, w16 : 0,
                            w20 : 0, w21 : 0, w22 : 0, w23 : 0, w24 : 0, w25 : 0, w26 : 0,
                            w30 : 1, w31 : 1, w32 : 1, w33 : 1, w34 : 1, w35 : 1, w36 : 1,
                            w40 : 0, w41 : 0, w42 : 0, w43 : 0, w44 : 0, w45 : 0, w46 : 0,
                            w50 : 0, w51 : 0, w52 : 0, w53 : 0, w54 : 0, w55 : 0, w56 : 0,
                            w60 : 0, w61 : 0, w62 : 0, w63 : 0, w64 : 0, w65 : 0, w66 : 0,
                        };
                    }
                    else{
                        weights = {
                            w00 : 0, w01 : 0, w02 : 0, w03 : 1, w04 : 0, w05 : 0, w06 : 0,
                            w10 : 0, w11 : 0, w12 : 0, w13 : 1, w14 : 0, w15 : 0, w16 : 0,
                            w20 : 0, w21 : 0, w22 : 0, w23 : 1, w24 : 0, w25 : 0, w26 : 0,
                            w30 : 0, w31 : 0, w32 : 0, w33 : 1, w34 : 0, w35 : 0, w36 : 0,
                            w40 : 0, w41 : 0, w42 : 0, w43 : 1, w44 : 0, w45 : 0, w46 : 0,
                            w50 : 0, w51 : 0, w52 : 0, w53 : 1, w54 : 0, w55 : 0, w56 : 0,
                            w60 : 0, w61 : 0, w62 : 0, w63 : 1, w64 : 0, w65 : 0, w66 : 0,
                        };
                    }
                    break;
            }
            break;

    }

    // Copying the top boundary pixels as-is
    for(let i = 0; i < getIndex(outputImage, boundarySize, boundarySize); i += 4){
        outputImage[i + 0] = inputImage[i + 0];
        outputImage[i + 1] = inputImage[i + 1];
        outputImage[i + 2] = inputImage[i + 2];
        outputImage[i + 3] = inputImage[i + 3];
    }
    let loopLimit = getIndex(outputImage, outputImage.width - boundarySize, outputImage.width - boundarySize);
    for(let i = 0; i < loopLimit; i += 4) {
        tempCoord = getCoordinates(outputImage, i);
        if(tempCoord.x >= boundarySize && tempCoord.x < loopLimit) {
            let maxVal = 0;
            let neighbourPixels = {};
            switch (filterSize) {
                case 3:
                    neighbourPixels = get3neighbourPixels(paddedImage, i);

                    neighbourPixels.p00 *= weights.w00; neighbourPixels.p01 *= weights.w01; neighbourPixels.p02 *= weights.w02;
                    neighbourPixels.p10 *= weights.w10; neighbourPixels.p11 *= weights.w11; neighbourPixels.p12 *= weights.w12;
                    neighbourPixels.p20 *= weights.w20; neighbourPixels.p21 *= weights.w21; neighbourPixels.p22 *= weights.w22;

                    maxVal = Math.max(...neighbourPixels.values);

                    break;
                case 5:
                    neighbourPixels = get5neighbourPixels(paddedImage, i);
                    neighbourPixels.p00 *= weights.w00; neighbourPixels.p01 *= weights.w01; neighbourPixels.p02 *= weights.w02; neighbourPixels.p03 *= weights.w03; neighbourPixels.p04 *= weights.w04;
                    neighbourPixels.p10 *= weights.w10; neighbourPixels.p11 *= weights.w11; neighbourPixels.p12 *= weights.w12; neighbourPixels.p13 *= weights.w13; neighbourPixels.p14 *= weights.w14;
                    neighbourPixels.p20 *= weights.w20; neighbourPixels.p21 *= weights.w21; neighbourPixels.p22 *= weights.w22; neighbourPixels.p23 *= weights.w23; neighbourPixels.p24 *= weights.w24;
                    neighbourPixels.p30 *= weights.w30; neighbourPixels.p31 *= weights.w31; neighbourPixels.p32 *= weights.w32; neighbourPixels.p33 *= weights.w33; neighbourPixels.p34 *= weights.w34;
                    neighbourPixels.p40 *= weights.w40; neighbourPixels.p41 *= weights.w41; neighbourPixels.p42 *= weights.w42; neighbourPixels.p43 *= weights.w43; neighbourPixels.p44 *= weights.w44;

                    maxVal = Math.max(...neighbourPixels.values);
                    break;
                case 7:
                    neighbourPixels = get7neighbourPixels(paddedImage, i);

                    neighbourPixels.p00 *= weights.w00; neighbourPixels.p01 *= weights.w01; neighbourPixels.p02 *= weights.w02; neighbourPixels.p03 *= weights.w03; neighbourPixels.p04 *= weights.w04; neighbourPixels.p05 *= weights.w05;  neighbourPixels.p06 *= weights.w06;
                    neighbourPixels.p10 *= weights.w10; neighbourPixels.p11 *= weights.w11; neighbourPixels.p12 *= weights.w12; neighbourPixels.p13 *= weights.w13; neighbourPixels.p14 *= weights.w14; neighbourPixels.p15 *= weights.w15;  neighbourPixels.p16 *= weights.w16;
                    neighbourPixels.p20 *= weights.w20; neighbourPixels.p21 *= weights.w21; neighbourPixels.p22 *= weights.w22; neighbourPixels.p23 *= weights.w23; neighbourPixels.p24 *= weights.w24; neighbourPixels.p25 *= weights.w25;  neighbourPixels.p26 *= weights.w26;
                    neighbourPixels.p30 *= weights.w30; neighbourPixels.p31 *= weights.w31; neighbourPixels.p32 *= weights.w32; neighbourPixels.p33 *= weights.w33; neighbourPixels.p34 *= weights.w34; neighbourPixels.p35 *= weights.w35;  neighbourPixels.p36 *= weights.w36;
                    neighbourPixels.p40 *= weights.w40; neighbourPixels.p41 *= weights.w41; neighbourPixels.p42 *= weights.w42; neighbourPixels.p43 *= weights.w43; neighbourPixels.p44 *= weights.w44; neighbourPixels.p45 *= weights.w45;  neighbourPixels.p46 *= weights.w46;
                    neighbourPixels.p50 *= weights.w50; neighbourPixels.p51 *= weights.w51; neighbourPixels.p52 *= weights.w52; neighbourPixels.p53 *= weights.w53; neighbourPixels.p54 *= weights.w54; neighbourPixels.p55 *= weights.w55;  neighbourPixels.p56 *= weights.w56;
                    neighbourPixels.p60 *= weights.w60; neighbourPixels.p61 *= weights.w61; neighbourPixels.p62 *= weights.w62; neighbourPixels.p63 *= weights.w63; neighbourPixels.p64 *= weights.w64; neighbourPixels.p65 *= weights.w65;  neighbourPixels.p66 *= weights.w66;

                    maxVal = Math.max(...neighbourPixels.values);
                    break;
                default:
                    break;
            }
            outputImage[origIndex + 0] = maxVal;
            outputImage[origIndex + 1] = maxVal;
            outputImage[origIndex + 2] = maxVal;
            outputImage[origIndex + 3] = 255;
        }
    }

    for (let i = loopLimit; i < outputImage.data.length; i += 4){
        outputImage[i + 0] = inputImage[i + 0];
        outputImage[i + 1] = inputImage[i + 1];
        outputImage[i + 2] = inputImage[i + 2];
        outputImage[i + 3] = inputImage[i + 3];
    }

    return outputImage;
}


/**
 *
 * @param {ImageDate} inputImage
 * @param {string} strElementType
 * @param {number} strElementSize
 */
function morphologicalErosion(inputImage, strElementType, strElementSize) {
    let outputImage = new ImageData(inputImage.width, inputImage.height);

    // Weights for the filter
    let weights = new Object;

    let boundarySize = (strElementSize - 1) / 2;

    let origIndex = 0;
    let tempCoord = new Object();

    switch (strElementSize) {
        case 3:
            switch (strElementType) {
                case "disc":
                    weights = {
                        w00 : 0, w01 : 1, w02 : 0,
                        w10 : 1, w11 : 1, w12 : 1,
                        w20 : 0, w21 : 1, w22 : 0
                    };
                    break;
                case "square":
                    weights = {
                        w00 : 1, w01 : 1, w02 : 1,
                        w10 : 1, w11 : 1, w12 : 1,
                        w20 : 1, w21 : 1, w22 : 1
                    };
                    break;
                case "line":
                    if(horizontalLine === true) {
                        weights = {
                            w00 : 0, w01 : 0, w02 : 0,
                            w10 : 1, w11 : 1, w12 : 1,
                            w20 : 0, w21 : 0, w22 : 0
                        };
                    }
                    else{
                        weights = {
                            w00 : 0, w01 : 1, w02 : 0,
                            w10 : 0, w11 : 1, w12 : 0,
                            w20 : 0, w21 : 1, w22 : 0
                        };
                    }
                    break;
            }
            break;
        case 5:
            switch (strElementType) {
                case "disc":
                    weights = {
                        w00 : 0, w01 : 0, w02 : 1, w03 : 0, w04 : 0,
                        w10 : 0, w11 : 1, w12 : 1, w13 : 1, w14 : 0,
                        w20 : 1, w21 : 1, w22 : 1, w23 : 1, w24 : 1,
                        w30 : 0, w31 : 1, w32 : 1, w33 : 1, w34 : 0,
                        w40 : 0, w41 : 0, w42 : 1, w43 : 0, w44 : 0
                    };
                    break;
                case "square":
                    weights = {
                        w00 : 1, w01 : 1, w02 : 1, w03 : 1, w04 : 1,
                        w10 : 1, w11 : 1, w12 : 1, w13 : 1, w14 : 1,
                        w20 : 1, w21 : 1, w22 : 1, w23 : 1, w24 : 1,
                        w30 : 1, w31 : 1, w32 : 1, w33 : 1, w34 : 1,
                        w40 : 1, w41 : 1, w42 : 1, w43 : 1, w44 : 1
                    };
                    break;
                case "line":
                    if(horizontalLine === true) {
                        weights = {
                            w00 : 0, w01 : 0, w02 : 0, w03 : 0, w04 : 0,
                            w10 : 0, w11 : 0, w12 : 0, w13 : 0, w14 : 0,
                            w20 : 1, w21 : 1, w22 : 1, w23 : 1, w24 : 1,
                            w30 : 0, w31 : 0, w32 : 0, w33 : 0, w34 : 0,
                            w40 : 0, w41 : 0, w42 : 0, w43 : 0, w44 : 0
                        };
                    }
                    else{
                        weights = {
                            w00 : 0, w01 : 0, w02 : 1, w03 : 0, w04 : 0,
                            w10 : 0, w11 : 0, w12 : 1, w13 : 0, w14 : 0,
                            w20 : 0, w21 : 0, w22 : 1, w23 : 0, w24 : 0,
                            w30 : 0, w31 : 0, w32 : 1, w33 : 0, w34 : 0,
                            w40 : 0, w41 : 0, w42 : 1, w43 : 0, w44 : 0
                        };
                    }
                    break;
            }
            break;
        case 7:
            switch (strElementType) {
                case "disc":
                    weights = {
                        w00 : 0, w01 : 0, w02 : 0, w03 : 1, w04 : 0, w05 : 0, w06 : 0,
                        w10 : 0, w11 : 1, w12 : 1, w13 : 1, w14 : 1, w15 : 1, w16 : 0,
                        w20 : 0, w21 : 1, w22 : 1, w23 : 1, w24 : 1, w25 : 1, w26 : 0,
                        w30 : 1, w31 : 1, w32 : 1, w33 : 1, w34 : 1, w35 : 1, w36 : 1,
                        w40 : 0, w41 : 1, w42 : 1, w43 : 1, w44 : 1, w45 : 1, w46 : 0,
                        w50 : 0, w51 : 1, w52 : 1, w53 : 1, w54 : 1, w55 : 1, w56 : 0,
                        w60 : 0, w61 : 0, w62 : 0, w63 : 1, w64 : 0, w65 : 0, w66 : 0,
                    };
                    break;
                case "square":
                    weights = {
                        w00 : 1, w01 : 1, w02 : 1, w03 : 1, w04 : 1, w05 : 1, w06 : 1,
                        w10 : 1, w11 : 1, w12 : 1, w13 : 1, w14 : 1, w15 : 1, w16 : 1,
                        w20 : 1, w21 : 1, w22 : 1, w23 : 1, w24 : 1, w25 : 1, w26 : 1,
                        w30 : 1, w31 : 1, w32 : 1, w33 : 1, w34 : 1, w35 : 1, w36 : 1,
                        w40 : 1, w41 : 1, w42 : 1, w43 : 1, w44 : 1, w45 : 1, w46 : 1,
                        w50 : 1, w51 : 1, w52 : 1, w53 : 1, w54 : 1, w55 : 1, w56 : 1,
                        w60 : 1, w61 : 1, w62 : 1, w63 : 1, w64 : 1, w65 : 1, w66 : 1,
                    };
                    break;
                case "line":
                    if(horizontalLine === true) {
                        weights = {
                            w00 : 0, w01 : 0, w02 : 0, w03 : 0, w04 : 0, w05 : 0, w06 : 0,
                            w10 : 0, w11 : 0, w12 : 0, w13 : 0, w14 : 0, w15 : 0, w16 : 0,
                            w20 : 0, w21 : 0, w22 : 0, w23 : 0, w24 : 0, w25 : 0, w26 : 0,
                            w30 : 1, w31 : 1, w32 : 1, w33 : 1, w34 : 1, w35 : 1, w36 : 1,
                            w40 : 0, w41 : 0, w42 : 0, w43 : 0, w44 : 0, w45 : 0, w46 : 0,
                            w50 : 0, w51 : 0, w52 : 0, w53 : 0, w54 : 0, w55 : 0, w56 : 0,
                            w60 : 0, w61 : 0, w62 : 0, w63 : 0, w64 : 0, w65 : 0, w66 : 0,
                        };
                    }
                    else{
                        weights = {
                            w00 : 0, w01 : 0, w02 : 0, w03 : 1, w04 : 0, w05 : 0, w06 : 0,
                            w10 : 0, w11 : 0, w12 : 0, w13 : 1, w14 : 0, w15 : 0, w16 : 0,
                            w20 : 0, w21 : 0, w22 : 0, w23 : 1, w24 : 0, w25 : 0, w26 : 0,
                            w30 : 0, w31 : 0, w32 : 0, w33 : 1, w34 : 0, w35 : 0, w36 : 0,
                            w40 : 0, w41 : 0, w42 : 0, w43 : 1, w44 : 0, w45 : 0, w46 : 0,
                            w50 : 0, w51 : 0, w52 : 0, w53 : 1, w54 : 0, w55 : 0, w56 : 0,
                            w60 : 0, w61 : 0, w62 : 0, w63 : 1, w64 : 0, w65 : 0, w66 : 0,
                        };
                    }
                    break;
            }
            break;

    }

    // Copying the top boundary pixels as-is
    for(let i = 0; i < getIndex(outputImage, boundarySize, boundarySize); i += 4){
        outputImage[i + 0] = inputImage[i + 0];
        outputImage[i + 1] = inputImage[i + 1];
        outputImage[i + 2] = inputImage[i + 2];
        outputImage[i + 3] = inputImage[i + 3];
    }
    let loopLimit = getIndex(outputImage, outputImage.width - boundarySize, outputImage.width - boundarySize);
    for(let i = 0; i < loopLimit; i += 4) {
        tempCoord = getCoordinates(outputImage, i);
        if(tempCoord.x >= boundarySize && tempCoord.x < loopLimit) {
            let maxVal = 0;
            let neighbourPixels = {};
            switch (filterSize) {
                case 3:
                    neighbourPixels = get3neighbourPixels(paddedImage, i);

                    neighbourPixels.p00 *= weights.w00; neighbourPixels.p01 *= weights.w01; neighbourPixels.p02 *= weights.w02;
                    neighbourPixels.p10 *= weights.w10; neighbourPixels.p11 *= weights.w11; neighbourPixels.p12 *= weights.w12;
                    neighbourPixels.p20 *= weights.w20; neighbourPixels.p21 *= weights.w21; neighbourPixels.p22 *= weights.w22;

                    maxVal = Math.min(...neighbourPixels.values);

                    break;
                case 5:
                    neighbourPixels = get5neighbourPixels(paddedImage, i);
                    neighbourPixels.p00 *= weights.w00; neighbourPixels.p01 *= weights.w01; neighbourPixels.p02 *= weights.w02; neighbourPixels.p03 *= weights.w03; neighbourPixels.p04 *= weights.w04;
                    neighbourPixels.p10 *= weights.w10; neighbourPixels.p11 *= weights.w11; neighbourPixels.p12 *= weights.w12; neighbourPixels.p13 *= weights.w13; neighbourPixels.p14 *= weights.w14;
                    neighbourPixels.p20 *= weights.w20; neighbourPixels.p21 *= weights.w21; neighbourPixels.p22 *= weights.w22; neighbourPixels.p23 *= weights.w23; neighbourPixels.p24 *= weights.w24;
                    neighbourPixels.p30 *= weights.w30; neighbourPixels.p31 *= weights.w31; neighbourPixels.p32 *= weights.w32; neighbourPixels.p33 *= weights.w33; neighbourPixels.p34 *= weights.w34;
                    neighbourPixels.p40 *= weights.w40; neighbourPixels.p41 *= weights.w41; neighbourPixels.p42 *= weights.w42; neighbourPixels.p43 *= weights.w43; neighbourPixels.p44 *= weights.w44;

                    maxVal = Math.max(...neighbourPixels.values);
                    break;
                case 7:
                    neighbourPixels = get7neighbourPixels(paddedImage, i);

                    neighbourPixels.p00 *= weights.w00; neighbourPixels.p01 *= weights.w01; neighbourPixels.p02 *= weights.w02; neighbourPixels.p03 *= weights.w03; neighbourPixels.p04 *= weights.w04; neighbourPixels.p05 *= weights.w05;  neighbourPixels.p06 *= weights.w06;
                    neighbourPixels.p10 *= weights.w10; neighbourPixels.p11 *= weights.w11; neighbourPixels.p12 *= weights.w12; neighbourPixels.p13 *= weights.w13; neighbourPixels.p14 *= weights.w14; neighbourPixels.p15 *= weights.w15;  neighbourPixels.p16 *= weights.w16;
                    neighbourPixels.p20 *= weights.w20; neighbourPixels.p21 *= weights.w21; neighbourPixels.p22 *= weights.w22; neighbourPixels.p23 *= weights.w23; neighbourPixels.p24 *= weights.w24; neighbourPixels.p25 *= weights.w25;  neighbourPixels.p26 *= weights.w26;
                    neighbourPixels.p30 *= weights.w30; neighbourPixels.p31 *= weights.w31; neighbourPixels.p32 *= weights.w32; neighbourPixels.p33 *= weights.w33; neighbourPixels.p34 *= weights.w34; neighbourPixels.p35 *= weights.w35;  neighbourPixels.p36 *= weights.w36;
                    neighbourPixels.p40 *= weights.w40; neighbourPixels.p41 *= weights.w41; neighbourPixels.p42 *= weights.w42; neighbourPixels.p43 *= weights.w43; neighbourPixels.p44 *= weights.w44; neighbourPixels.p45 *= weights.w45;  neighbourPixels.p46 *= weights.w46;
                    neighbourPixels.p50 *= weights.w50; neighbourPixels.p51 *= weights.w51; neighbourPixels.p52 *= weights.w52; neighbourPixels.p53 *= weights.w53; neighbourPixels.p54 *= weights.w54; neighbourPixels.p55 *= weights.w55;  neighbourPixels.p56 *= weights.w56;
                    neighbourPixels.p60 *= weights.w60; neighbourPixels.p61 *= weights.w61; neighbourPixels.p62 *= weights.w62; neighbourPixels.p63 *= weights.w63; neighbourPixels.p64 *= weights.w64; neighbourPixels.p65 *= weights.w65;  neighbourPixels.p66 *= weights.w66;

                    maxVal = Math.max(...neighbourPixels.values);
                    break;
                default:
                    break;
            }
            outputImage[origIndex + 0] = maxVal;
            outputImage[origIndex + 1] = maxVal;
            outputImage[origIndex + 2] = maxVal;
            outputImage[origIndex + 3] = 255;
        }
    }

    for (let i = loopLimit; i < outputImage.data.length; i += 4){
        outputImage[i + 0] = inputImage[i + 0];
        outputImage[i + 1] = inputImage[i + 1];
        outputImage[i + 2] = inputImage[i + 2];
        outputImage[i + 3] = inputImage[i + 3];
    }

    return outputImage;
}

/**
 *
 * @param {ImageData} inputImage
 * @param {string} strElementType
 * @param {number} strElementSize
 */
function morphologicalOpen(inputImage, strElementType,strElementSize) {
    let outputImage = new ImageData(inputImage.width, inputImage.height);
    outputImage = morphologicalDilation(morphologicalErosion(inputImage, strElementType, strElementSize), strElementType, strElementSize);
    return outputImage;
}

/**
 *
 * @param {ImageData} inputImage
 * @param {string} strElementType
 * @param {number} strElementSize
 */
function morphologicalClose(inputImage, strElementType,strElementSize) {
    let outputImage = new ImageData(inputImage.width, inputImage.height);
    outputImage = morphologicalErosion(morphologicalDilation(inputImage, strElementType, strElementSize), strElementType, strElementSize);
    return outputImage;
}