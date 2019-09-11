/*jslint browser: true*/
/*global $, jQuery, alert*/

var mosaicImg = new Image();
mosaicImg.src = "res/Mosaic.png"; // Set source path
// mosaicImg.addEventListener('load', function() {
// }, false);

// mosaicImg.onload = function () {
//     let inputImCanvasCtx = inputImCanvas.getContext("2d");
//     inputImCanvasCtx.drawImage(mosaicImg, 0, 0);
//     inputImCanvasCtx.drawImage(mosaicImg, 0, 0, inputImCanvas.width, inputImCanvas.height);
// };

function selectImage() {
    "use strict";
    var inputImCanvas = document.getElementById("inputImCanvas"),
        inputImCanvasCtx = inputImCanvas.getContext("2d");
    $("#MosaicImgModal").modal("show");
    // $("#MosaicImgModal").on('shown.bs.modal',function (e) {});
    $("#mosaicSelectImage").imgAreaSelect({
        handles: true,
        autoHide: true,
        minHeight: 100,
        // maxHeight: 300,
        aspectRatio: "1:1",
        resizeable: false,
        onSelectEnd: function(img, selection) {
            // As the mosaic is scaled when shown in the modal, using scaleFactor to scale it back
            let scaleFactor = 900 / (0.86 * $(window).height());
            inputImCanvasCtx.drawImage(
                img,
                Math.round(selection.x1 * scaleFactor),
                Math.round(selection.y1 * scaleFactor),
                Math.round(selection.width * scaleFactor),
                Math.round(selection.height * scaleFactor),
                0,
                0,
                inputImCanvas.width,
                inputImCanvas.height
            );
            $("#selectImgButton").addClass("disabled");
            $("#selectImgButton").attr("disabled", true);
            $("#resetButton").removeClass("disabled");
            $("#resetButton").attr("disabled", false);
            $("#MosaicImgModal").modal("hide");
        },
    });
}

function reset() {
    "use strict";
    var inputImCanvas = document.getElementById("inputImCanvas"),
        inputImCanvasCtx = inputImCanvas.getContext("2d");
    inputImCanvasCtx.clearRect(0, 0, inputImCanvas.width, inputImCanvas.height);
    $("#selectImgButton").removeClass("disabled");
    $("#selectImgButton").attr("disabled", false);
    $("#resetButton").addClass("disabled");
    $("#resetButton").attr("disabled", true);
}
