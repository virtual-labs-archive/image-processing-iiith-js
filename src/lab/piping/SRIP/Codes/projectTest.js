/**
 *  Function to test affine functions
 * @param {string} type 
 */
function testAffineFuncs(type) {
    let inputImCanvas = document.getElementById("inputImCanvas"),
        inputImCanvasCtx = inputImCanvas.getContext("2d");

    inputImCanvasCtx.globalAlpha = 1.0;
    let selectedImage = inputImCanvasCtx.getImageData(0, 0, inputImCanvasCtx.canvas.width, inputImCanvasCtx.canvas.width);
    let processedImage = new ImageData(selectedImage.width, selectedImage.height);
    
    switch (type) {
        case "translate":
            processedImage = translate(selectedImage, 30, 60);
            break;
        case "rotate":
            processedImage = rotate(selectedImage, 40, "nearest");
            break;
        case "scale":
            processedImage = scale(selectedImage, false, 2, "nearest");
        default:
            break;
    }
    inputImCanvasCtx.putImageData(processedImage, 0,0);

}

/**
 *  Function to test point transform functions
 * @param {string} type
 */
function testPointFuncs(type) {
    let inputImCanvas = document.getElementById("inputImCanvas"),
        inputImCanvasCtx = inputImCanvas.getContext("2d");

    let selectedImage = inputImCanvasCtx.getImageData(0, 0, inputImCanvasCtx.canvas.width, inputImCanvasCtx.canvas.width);

    let processedImage = new ImageData(selectedImage.width, selectedImage.height);

    switch (type) {
        case "linear":
            processedImage = linearPointTransform(selectedImage, 2, 20);
            break;
        case "nonLinear":
            processedImage = nonLinearPointTransform(selectedImage, 4);
            break;
        case "clipping":
            processedImage = clippingPointTransform(selectedImage, 2, 60, 190);
            break;
        case "window":
            processedImage = windowPointTransform(selectedImage, 3, 60, 190);
        default:
            break;
    }
    inputImCanvasCtx.putImageData(processedImage, 0,0);

}
