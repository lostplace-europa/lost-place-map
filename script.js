// Karte initialisieren
const map = L.map('map').setView([51.1657, 10.4515], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Beispiel-Marker
L.marker([52.52, 13.405]).addTo(map)
  .bindPopup('Lost Place Berlin');

// Tabs schalten
function showTab(id) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector(`nav button[onclick="showTab('${id}')"]`).classList.add('active');
}
// Admin Login-Daten
const ADMIN_USER = "admin";
const ADMIN_PASS = "lostsecret123";

// Login prüfen
function checkAdminLogin() {
  const user = document.getElementById("admin-username").value;
  const pass = document.getElementById("admin-password").value;
  const status = document.getElementById("login-status");

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    document.getElementById("admin-login").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
    status.textContent = "";
  } else {
    status.textContent = "Login fehlgeschlagen.";
  }
}

// Ort auf Karte hinzufügen (Admin)
function addAdminMarker() {
  const name = document.getElementById("admin-ort-name").value;
  const beschr = document.getElementById("admin-ort-beschreibung").value;
  const coords = document.getElementById("admin-ort-koordinaten").value.split(",");

  if (coords.length === 2) {
    const lat = parseFloat(coords[0].trim());
    const lon = parseFloat(coords[1].trim());

    L.marker([lat, lon]).addTo(map)
      .bindPopup(`<b>${name}</b><br>${beschr}`);

    alert("Ort erfolgreich hinzugefügt!");
  } else {
    alert("Koordinaten sind ungültig.");
  }
}
