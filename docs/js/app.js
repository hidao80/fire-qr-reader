import i18n from "./i18n.js";

/** Alias for querySelectorAll */
const qs = (e)=>{const n=document.querySelectorAll(e);return 1==n.length?n[0]:n};

/**
 * Draw a frame around the QR code in the captured image.
 * @param {HTMLCanvasElement} canvas 
 * @param {int} begin 
 * @param {int} end 
 * @param {string} color 
 */
function drawLine(canvas, begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
}

/**
 * If the confirmation dialog is OK, a link click is generated.
 * @param {string} uri 
 */
function linkClick(uri) {
    const downLoadLink = document.createElement("a");
    downLoadLink.href = uri;
    downLoadLink.click();
}

/**
 * Processing begins after all elements on the screen have been drawn.
 */
window.addEventListener("load", function () {
    // Translate all elements with the data-translate attribute
    i18n.translateAll();

    // Get the HTML elements
    const video = document.createElement("video");
    const canvasElement = qs("#canvas");
    const canvas = canvasElement.getContext("2d");
    const loadingMessage = qs("#loadingMessage");
    const outputContainer = qs("#output");
    const outputData = qs("#outputData");

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function (stream) {
        video.srcObject = stream;
        video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        video.play();
        requestAnimationFrame(tick);
    });

    /**
     * Each time the image is captured by the camera, it is scanned for QR codes and if found, the content is displayed.
     */
    function tick() {
        // 
        loadingMessage.innerText = i18n.translate("LoadingVideo");
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            loadingMessage.hidden = true;
            canvasElement.hidden = false;
            outputContainer.hidden = false;

            canvasElement.height = video.videoHeight;
            canvasElement.width = video.videoWidth;
            canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
            const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);

            // Scan the image for QR codes.
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });

            // If a QR code is found, draw a frame around it and display the content.
            if (code) {
                drawLine(canvas, code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
                drawLine(canvas, code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
                drawLine(canvas, code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
                drawLine(canvas, code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
                outputData.innerText = code.data;

                const colon = code.data.indexOf(":") + 1;
                if (/^https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+$/.test(code.data)) {
                    // If the content is a URL, display a link to it.
                    confirm(i18n.translate("OpenThisLink?") + "\n\n" + code.data) && linkClick(code.data);
                } else if (/^tel:\d{6,11}$/.test(code.data)) {
                    // If the content is a phone number, dial a number to it.
                    confirm(i18n.translate("CallThisNumber?") + "\n\n" + code.data.slice(colon)) && linkClick(code.data);
                } else if (/^mailto:[\w\.-]+?@[\w\.-]+$/.test(code.data)) {
                    // If the content is a deep link, launch the application.
                    confirm(i18n.translate("SendMail?") + "\n\n" + code.data.slice(colon)) && linkClick(code.data);
                } else if (/^javascript:.+$/.test(code.data)) {
                    // If the content is a javascript, run the script.
                    confirm(i18n.translate("RunThisBookmarklet?") + "\n\n" + code.data.slice(0, colon - 1)) && linkClick(code.data);
                } else if (/^\w+:[\w\.-@/#%]+$/.test(code.data)) {
                    // If the content is a deep link, launch the application.
                    confirm(i18n.translate("OpenThisApps?") + "\n\n" + code.data.slice(0, colon - 1)) && linkClick(code.data);
                }
            }
        }

        // Repeat the process.
        requestAnimationFrame(tick);

        // Register the service worker.
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("./sw.js");
        }    
    }
});
