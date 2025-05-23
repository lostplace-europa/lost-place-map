// 🌍 Leaflet-Karte initialisieren
const map = L.map('map').setView([51.1657, 10.4515], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 📍 Beispielmarker
L.marker([52.52, 13.405]).addTo(map)
  .bindPopup('Lost Place Berlin');

// 🔁 Reiter umschalten (Tabs)
function showTab(id) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector(`nav button[onclick="showTab('${id}')"]`).classList.add('active');
}

// 🔐 Admin Login
function checkAdminLogin() {
  const user = document.getElementById("admin-username").value;
  const pass = document.getElementById("admin-password").value;
  const status = document.getElementById("login-status");

  if (user === "admin" && pass === "lostsecret123") {
    document.getElementById("admin-login").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
    status.textContent = "";
  } else {
    status.style.color = "red";
    status.textContent = "❌ Login fehlgeschlagen. Benutzername oder Passwort falsch.";
  }
}

// ➕ Admin-Ort hinzufügen
function addAdminMarker() {
  const name = document.getElementById("admin-ort-name").value;
  const beschr = document.getElementById("admin-ort-beschreibung").value;
  const coords = docu
