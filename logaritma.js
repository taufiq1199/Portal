
    function toLogBrigg(x) {
      if (x <= 0) return "Tidak terdefinisi";
      const logVal = Math.log10(x);
      return logVal < 0 ? (10 + logVal).toFixed(5) : logVal.toFixed(5);
    }

    function logCotgBrigg(tanVal) {
      if (tanVal <= 0) return "Tidak terdefinisi";
      const logTan = Math.log10(tanVal);
      return (10 - logTan).toFixed(5);
    }

    function getSudutDesimal() {
      const d = parseFloat(document.getElementById("derajat").value) || 0;
      const m = parseFloat(document.getElementById("menit").value) || 0;
      const s = parseFloat(document.getElementById("detik").value) || 0;
      return d + (m / 60) + (s / 3600);
    }

    function hitungLog() {
      const sudut = getSudutDesimal();
      const rad = sudut * Math.PI / 180;
      const sin = Math.sin(rad);
      const cos = Math.cos(rad);
      const tan = Math.tan(rad);

      document.getElementById("sudutLog").innerText = sudut.toFixed(6) + "°";
      document.getElementById("logSin").innerText = toLogBrigg(sin);
      document.getElementById("logCos").innerText = toLogBrigg(cos);
      document.getElementById("logTg").innerText = toLogBrigg(Math.abs(tan));
      document.getElementById("logCotg").innerText = logCotgBrigg(Math.abs(tan));

      document.getElementById("resultLog").style.display = "block";
      document.getElementById("resultNilai").style.display = "none";
    }

    function hitungNilai() {
      const sudut = getSudutDesimal();
      const rad = sudut * Math.PI / 180;
      const sin = Math.sin(rad);
      const cos = Math.cos(rad);
      const tan = Math.tan(rad);
      const cotg = tan !== 0 ? 1 / tan : "Tidak terdefinisi";

      document.getElementById("sudutNilai").innerText = sudut.toFixed(6) + "°";
      document.getElementById("valSin").innerText = sin.toFixed(5);
      document.getElementById("valCos").innerText = cos.toFixed(5);
      document.getElementById("valTg").innerText = tan.toFixed(5);
      document.getElementById("valCotg").innerText = typeof cotg === "string" ? cotg : cotg.toFixed(5);

      document.getElementById("resultNilai").style.display = "block";
      document.getElementById("resultLog").style.display = "none";
    }

function konversiKeSudut() {
  const jenis = document.getElementById("jenisFungsi").value;
  // ubah koma jadi titik sebelum parse
  let nilai = parseFloat(document.getElementById("nilaiInput").value.replace(",", "."));
  if (isNaN(nilai)) {
    alert("Masukkan nilai yang valid!");
    return;
  }

  // Jika input berupa logaritma Brigg
  if (jenis.startsWith("log")) {
    const mantisa = nilai - 10;
    nilai = Math.pow(10, mantisa);
  }

  let rad = 0;
  if (jenis === "sin" || jenis === "logsin") rad = Math.asin(nilai);
  else if (jenis === "cos" || jenis === "logcos") rad = Math.acos(nilai);
  else if (jenis === "tg" || jenis === "logtg") rad = Math.atan(nilai);
  else if (jenis === "cotg" || jenis === "logcotg") rad = Math.atan(1 / nilai);

  // Ubah ke derajat
  let sudut = rad * 180 / Math.PI;

  let d = Math.floor(sudut);
  let mFloat = (sudut - d) * 60;
  let m = Math.floor(mFloat);
  let s = (mFloat - m) * 60;

  // Pembulatan detik
  s = Math.round(s * 100) / 100;
  if (s >= 59.99) { s = 0; m += 1; }
  if (m >= 60) { m = 0; d += 1; }

  document.getElementById("hasilDerajat").innerText = `${d}°`;
  document.getElementById("hasilMenit").innerText = `${m}′`;
  document.getElementById("hasilDetik").innerText = `${s}″`;
  document.getElementById("resultSudut").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  function formatInput(el) {
    el.addEventListener("input", function() {
      let val = el.value;

      // Hanya izinkan angka dan koma
      val = val.replace(/[^0-9,]/g, "");

      // Kalau ada lebih dari satu koma, hapus sisanya
      const parts = val.split(",");
      if (parts.length > 2) {
        val = parts[0] + "," + parts.slice(1).join("").replace(/,/g, "");
      }

      // Batasi maksimal 7 digit setelah koma
      if (parts[1] && parts[1].length > 5) {
        parts[1] = parts[1].substring(0, 5);
        val = parts.join(",");
      }

      // --- PERBAIKAN DI SINI ---
      const raw = val.replace(/,/g, ""); // angka tanpa koma
      if (raw.length > 1) {
        val = raw[0] + "," + raw.slice(1, 6); // koma setelah digit pertama, max 7 digit
      } else {
        val = raw; // kalau cuma 1 digit, tanpa koma
      }
      // --------------------------

      el.value = val;
    });
  }

  formatInput(document.getElementById("nilaiInput"));
});
