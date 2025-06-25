window.addEventListener("load", () => {
  const qrCode = new QRCodeStyling({
    width: 1080,
    height: 1080,
    type: "png",
    data: "",
    dotsOptions: {
      color: "#000000",
      type: "square"
    },
    backgroundOptions: {
      color: "#ffffff"
    },
    qrOptions: {
      errorCorrectionLevel: "H"
    }
  });

  const input = document.getElementById("qr-input");
  const generateBtn = document.getElementById("generate-btn");
  const qrContainer = document.getElementById("qr-code");
  const downloadLink = document.getElementById("download-link");
  const formatSelect = document.getElementById("format-select");
  const downloadControls = document.getElementById("download-controls");
  const qrWrapper = document.getElementById("qr-wrapper");
  const errorMsg = document.getElementById("error-msg");

  qrCode.append(qrContainer);

  function isValidUrl(string) {
    try {
      const url = new URL(string);
      if (url.protocol !== "http:" && url.protocol !== "https:") return false;
      i
