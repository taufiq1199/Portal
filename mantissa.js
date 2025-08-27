
    const clamp5 = n => Number.isFinite(n) ? Math.round(n * 1e5) / 1e5 : NaN;
    const pad5 = n => (n.toFixed(5));

    function parseNum(raw) {
      if (!raw) return { value: NaN, usesComma: false };
      const usesComma = raw.includes(",");
      const val = parseFloat(raw.replace(/,/g, "."));
      return { value: val, usesComma };
    }
    function formatNum(n, useComma) {
      const s = pad5(clamp5(n));
      return useComma ? s.replace(".", ",") : s;
    }
    function inRange(x, mode) {
      return mode === "log" ? (x >= 0 && x < 10) : (x >= 0 && x <= 1);
    }
    
    function compute(a, b, op, mode) {
      let m = a;
      let shift = 0;
      
      if (mode === "log") {
        if (op === "+") {
          // Penjumlahan logaritma
          m = a + b;
          if (m >= 10) {
            m -= 10;
            shift = 1;
          }
        } else {
          // Pengurangan logaritma (a - b)
          if (a >= b) {
            m = a - b;
          } else {
            // Jika a < b, kita perlu meminjam dari karakteristik
            m = (a + 10) - b;
            shift = -1;
          }
        }
      } else { // Mode sinus
        if (op === "+") {
          // Penjumlahan sinus
          m = a + b;
          if (m > 1) {
            m -= 1;
          }
        } else {
          // Pengurangan sinus (a - b)
          if (a >= b) {
            m = a - b;
          } else {
            // Jika a < b, kita perlu meminjam dari kuadran sebelumnya
            m = (a + 1) - b;
          }
        }
      }
      
      return { mantissa: clamp5(m), shift };
    }

    const $ = s => document.querySelector(s);
    const aI = $("#a"), bI = $("#b"), opS = $("#op"), out = $("#out"), btn = $("#btn"), modeS = $("#mode");
    const shiftInfo = $("#shift-info");

    function update() {
      const A = parseNum(aI.value), B = parseNum(bI.value);
      const op = opS.value, mode = modeS.value;
      const useComma = A.usesComma || B.usesComma;

      if (!Number.isFinite(A.value) || !Number.isFinite(B.value)) {
        out.textContent = "-";
        shiftInfo.textContent = "";
        return;
      }
      
      if (!inRange(A.value, mode) || !inRange(B.value, mode)) {
        out.textContent = "Error: Di luar rentang";
        shiftInfo.textContent = "";
        return;
      }

      const { mantissa, shift } = compute(A.value, B.value, op, mode);
      out.textContent = formatNum(mantissa, useComma);
      
      // Tampilkan informasi shift jika ada
      if (shift !== 0) {
        if (mode === "log") {
          shiftInfo.textContent = `Karakteristik berubah: ${shift > 0 ? "+" : ""}${shift}`;
        } else {
          shiftInfo.textContent = `Perubahan kuadran: ${shift > 0 ? "+" : ""}${shift}`;
        }
      } else {
        shiftInfo.textContent = "";
      }
    }

    btn.addEventListener("click", update);
    aI.addEventListener("input", update);
    bI.addEventListener("input", update);
    opS.addEventListener("change", update);
    modeS.addEventListener("change", update);

document.addEventListener("DOMContentLoaded", () => {
  function formatInput(el) {
    el.addEventListener("input", function() {
      let val = el.value;

      // Ambil hanya angka
      val = val.replace(/\D/g, "");

      // Batasi maksimal 7 digit angka
      if (val.length > 7) {
        val = val.substring(0, 7);
      }

      // Kalau lebih dari 1 digit → tambahkan koma setelah digit pertama
      if (val.length > 1) {
        val = val[0] + "," + val.substring(1);
      }

      el.value = val;
    });
  }

  // Terapkan ke input a dan b
  formatInput(document.getElementById("a"));
  formatInput(document.getElementById("b"));
});

