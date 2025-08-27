  
    function convert() {
      let deg = parseFloat(document.getElementById('deg').value) || 0;
      let min = parseFloat(document.getElementById('min').value) || 0;

      // konversi derajat + menit ke derajat desimal
      let decimalDegree = deg + (min / 60);

      // ubah ke jam
      let totalHours = decimalDegree / 15;

      // pecah ke jam, menit, detik
      let hours = Math.floor(totalHours);
      let totalMinutes = (totalHours - hours) * 60;
      let minutes = Math.floor(totalMinutes);
      let seconds = Math.round((totalMinutes - minutes) * 60);

      // biar tidak ada 60 detik jadi menit
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }

      // Format output dengan padding nol jika perlu
      const formatTime = (val) => val < 10 ? `0${val}` : val;
      
      document.getElementById('output').innerHTML = 
        `${formatTime(hours)}<span style="color: var(--muted);"> jam</span> ` +
        `${formatTime(minutes)}<span style="color: var(--muted);"> menit</span> ` +
        `${formatTime(seconds)}<span style="color: var(--muted);"> detik</span>`;
    }

    // Event listener untuk tombol konversi
    document.getElementById('convertBtn').addEventListener('click', convert);
    
    // Jalankan konversi saat halaman dimuat
    document.addEventListener('DOMContentLoaded', convert);
    
    // Jalankan konversi saat input diubah
    document.getElementById('deg').addEventListener('input', convert);
    document.getElementById('min').addEventListener('input', convert);
