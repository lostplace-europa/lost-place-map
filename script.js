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
  // Alle Reiter ausblenden
  document.querySelectorAll('section').forEach(section => {
    section.classList.remove('active');
  });

  // Aktiven Reiter anzeigen
  const activeSection = document.getElementById(id);
  if (activeSection) activeSection.classList.add('active');

  // Navigations-Buttons aktualisieren
  document.querySelectorAll('nav button').forEach(button => {
    button.classList.remove('active');
  });

  const clickedButton = document.querySelector(`nav button[onclick="showTab('${id}')"]`);
  if (clickedButton) clickedButton.classList.add('active');
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
  const coords = document.getElementById("admin-ort-koordinaten").value.split(",");

  if (coords.length === 2) {
    const lat = parseFloat(coords[0].trim());
    const lon = parseFloat(coords[1].trim());

    if (!isNaN(lat) && !isNaN(lon)) {
      L.marker([lat, lon]).addTo(map)
        .bindPopup(`<b>${name}</b><br>${beschr}`);
      alert("📍 Ort erfolgreich hinzugefügt!");
    } else {
      alert("❗ Ungültige Koordinaten.");
    }
  } else {
    alert("❗ Bitte Koordinaten im Format 'Breite, Länge' angeben.");
  }
}
