// Navigasi Tab
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).style.display = 'block';
    event.currentTarget.classList.add('active');
    
    if(tabId === 'data-section') renderData();
}

// Logika Form
const attendanceForm = document.getElementById('attendanceForm');
attendanceForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const dataAbsen = {
        waktu: new Date().toLocaleString('id-ID'),
        nama: document.getElementById('nama').value,
        kelas: document.getElementById('kelas').value,
        status: document.getElementById('status').value
    };

    // Simpan ke LocalStorage
    let listAbsen = JSON.parse(localStorage.getItem('pikr_absen')) || [];
    listAbsen.push(dataAbsen);
    localStorage.setItem('pikr_absen', JSON.stringify(listAbsen));

    alert('Absen berhasil terkirim!');
    attendanceForm.reset();
});

// Menampilkan Data
function renderData() {
    const tableBody = document.getElementById('attendanceBody');
    const listAbsen = JSON.parse(localStorage.getItem('pikr_absen')) || [];
    
    tableBody.innerHTML = '';
    listAbsen.forEach(item => {
        const row = `<tr>
            <td>${item.waktu}</td>
            <td>${item.nama}</td>
            <td>${item.kelas}</td>
            <td>${item.status}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Hapus Data
function clearData() {
    if(confirm('Yakin ingin menghapus semua data?')) {
        localStorage.removeItem('pikr_absen');
        renderData();
    }
}
