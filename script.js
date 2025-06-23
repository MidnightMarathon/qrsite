const input = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate-btn");
const qrContainer = document.getElementById("qr-code");
const downloadLink = document.getElementById("download-link");

generateBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  qrContainer.innerHTML = "";
  downloadLink.style.display = "none";

  const qr = new QRCode(qrContainer, {
    text,
    width: 256,
    height: 256,
    correctLevel: QRCode.CorrectLevel.H
  });

  setTimeout(() => {
    const img = qrContainer.querySelector("img");
    if (img) {
      downloadLink.href = img.src;
      downloadLink.style.display = "inline-block";
    }
  }, 100);
});
