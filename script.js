const SCRIPT_URL = "URL_WEB_APP_DARI_DEPLOY_KAMU"; 

// --- LOGIKA FORM ---
document.getElementById('absensiForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerText = "MENGIRIM...";
    btn.disabled = true;

    const dataBaru = {
        nama: document.getElementById('nama').value,
        kelas: document.getElementById('kelas').value,
        ket: document.getElementById('keterangan').value,
        materi: document.getElementById('materi').value,
        bulan: String(new Date().getMonth() + 1).padStart(2, '0')
    };

    fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(dataBaru)
    })
    .then(res => {
        alert("Absensi Berhasil!");
        document.getElementById('absensiForm').reset();
        btn.innerText = "KIRIM ABSENSI";
        btn.disabled = false;
    })
    .catch(err => {
        alert("Gagal terhubung ke Sheets!");
        btn.innerText = "KIRIM ABSENSI";
        btn.disabled = false;
    });
});

// --- LOGIKA LOGIN & ADMIN ---
function showLogin() { 
    document.getElementById('formSection').style.display = 'none'; 
    document.getElementById('loginSection').style.display = 'block'; 
}

function backToHome() { 
    document.getElementById('loginSection').style.display = 'none'; 
    document.getElementById('formSection').style.display = 'block'; 
}

function cekLogin() {
    const u = document.getElementById('userAdmin').value;
    const p = document.getElementById('passAdmin').value;
    if(u === "adminAFORLING" && p === "012026") {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminSection').style.display = 'block';
        tampilkanData();
    } else { alert("Data Salah!"); }
}

function tampilkanData() {
    const filter = document.getElementById('filterBulan').value;
    const tbody = document.getElementById('tabelBody');
    tbody.innerHTML = "<tr><td colspan='3' style='text-align:center'>Loading...</td></tr>";

    fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => {
        tbody.innerHTML = "";
        const filtered = data.filter(row => row[4] == filter);
        if(filtered.length === 0) {
            tbody.innerHTML = "<tr><td colspan='3' style='text-align:center'>No Data</td></tr>";
        } else {
            filtered.forEach(row => {
                tbody.innerHTML += `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`;
            });
        }
    });
}

function logout() { location.reload(); }
