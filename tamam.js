
    function calculate() {
      const deg1 = parseInt(document.getElementById('degrees1').value) || 0;
      const min1 = parseInt(document.getElementById('minutes1').value) || 0;
      const deg2 = parseInt(document.getElementById('degrees2').value) || 0;
      const min2 = parseInt(document.getElementById('minutes2').value) || 0;

      // Konversi ke menit
      let total1 = deg1 * 60 + min1;
      let total2 = deg2 * 60 + min2;

      let diff = total1 - total2;
      while (diff < 0) diff += 21600; // 360*60

      let resDeg = Math.floor(diff / 60) % 360;
      let resMin = diff % 60;

      // tampilkan hasil
      document.getElementById('hasilDarojah').textContent = resDeg;
      document.getElementById('hasilMenit').textContent = resMin;

      // animasi
      document.getElementById('result').classList.add("animate-result");
      setTimeout(() => document.getElementById('result').classList.remove("animate-result"), 500);
    }

    function resetCalc() {
      document.getElementById('degrees1').value = 90;
      document.getElementById('minutes1').value = 0;
      document.getElementById('degrees2').value = 0;
      document.getElementById('minutes2').value = 0;
      document.getElementById('hasilDarojah').textContent = 0;
      document.getElementById('hasilMenit').textContent = 0;
    }

    window.onload = () => {
      document.getElementById('degrees1').value = 90;
      document.getElementById('minutes1').value = 0;
    };