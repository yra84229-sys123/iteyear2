function show(id) {
  document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Caesar
function caesarEncrypt() {
  let r = "", t = cText.value, k = +cKey.value;
  for (let ch of t) {
    if (ch >= 'a' && ch <= 'z')
      r += String.fromCharCode((ch.charCodeAt(0)-97+k)%26+97);
    else if (ch >= 'A' && ch <= 'Z')
      r += String.fromCharCode((ch.charCodeAt(0)-65+k)%26+65);
    else r += ch;
  }
  cResult.innerText = r;
}
function caesarDecrypt() {
  cKey.value = 26 - cKey.value;
  caesarEncrypt();
}

// Shift
function shiftEncrypt() {
  sResult.innerText = sText.value
    .split("")
    .map(ch => String.fromCharCode(ch.charCodeAt(0)+(+sKey.value||0)))
    .join("");
}

// Affine
function affineEncrypt() {
  let r = "";
  for (let ch of aText.value.toUpperCase()) {
    if (ch >= 'A' && ch <= 'Z') {
      let x = ch.charCodeAt(0) - 65;
      r += String.fromCharCode((aKey.value * x + +bKey.value) % 26 + 65);
    } else r += ch;
  }
  aResult.innerText = r;
}

// Transposition
function transposeEncrypt() {
  tResult.innerText = tText.value.split("").reverse().join("");
}
