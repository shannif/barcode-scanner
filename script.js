document.getElementById("scannerType").addEventListener("change", function() {
    let scannerType = this.value;
    if (scannerType === "camera") {
        document.getElementById("cameraScanner").style.display = "block";
        document.getElementById("barcodeInput").style.display = "none";
        startCameraScanner();
    } else {
        document.getElementById("cameraScanner").style.display = "none";
        document.getElementById("barcodeInput").style.display = "block";
        stopCameraScanner();
    }
});

function startCameraScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#video")
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader"]
        }
    }, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        Quagga.start();
    });

    Quagga.onDetected(function(result) {
        let code = result.codeResult.code;
        alert("Scanned: " + code);
        Quagga.stop();
    });
}

function stopCameraScanner() {
    Quagga.stop();
}
