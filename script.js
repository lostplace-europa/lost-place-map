// 🌍 Leaflet-Karte initialisieren
const map = L.map('map').setView([51.1657, 10.4515], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const markerMap = new Map(); // ID → Marker-Objekt

// 📥 Marker aus Firebase laden
firebase.database().ref("orte").on("value", snapshot => {
  const data = snapshot.val();
  const adminPanel = document.getElementById("admin-panel");

  // Alle Marker von Karte entfernen
  markerMap.forEach(marker => map.removeLayer(marker));
  markerMap.clear();

  // Alte Admin-Liste bereinigen
  const alteEinträge = document.querySelectorAll(".admin-eintrag");
  alteEinträge.forEach(e => e.remove());

  if (data) {
    let counter = 1;
    Object.entries(data).forEach(([id, ort]) => {
      const { lat, lon, name, beschreibung } = ort;
      if (lat && lon) {
        const marker = L.marker([lat, lon]).addTo(map)
          .bindPopup(`<b>${name}</b><br>${beschreibung}`);
        markerMap.set(id, marker);

        // Admin-Eintrag
        const div = document.createElement("div");
        div.className = "admin-eintrag";
        div.innerHTML = `
          <strong>#${counter++}</strong> ${name} (${lat}, ${lon})
          <button onclick="deleteOrt('${id}')">🗑️ Löschen</button>
        `;
        adminPanel.appendChild(div);
      }
    });
  }
});

// 🔁 Reiter umschalten
window.showTab = function(id) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');

  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`nav button[onclick='showTab("${id}")']`);
  if (btn) btn.classList.add('active');
};

// 🔐 Admin Login
window.checkAdminLogin = function () {
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
};

// ➕ Ort hinzufügen
window.addAdminMarker = function () {
  const name = document.getElementById("admin-ort-name").value;
  const beschr = document.getElementById("admin-ort-beschreibung").value;
  const coords = document.getElementById("admin-ort-koordinaten").value.split(",");

  if (coords.length === 2) {
    const lat = parseFloat(coords[0].trim());
    const lon = parseFloat(coords[1].trim());

    if (!isNaN(lat) && !isNaN(lon)) {
      const ort = { name, beschreibung: beschr, lat, lon };
      firebase.database().ref("orte").push(ort);
      alert("📍 Ort erfolgreich hinzugefügt!");
      document.getElementById("admin-ort-name").value = "";
      document.getElementById("admin-ort-beschreibung").value = "";
      document.getElementById("admin-ort-koordinaten").value = "";
    } else {
      alert("❗ Ungültige Koordinaten.");
    }
  } else {
    alert("❗ Bitte Koordinaten im Format 'Breite, Länge' angeben.");
  }
};

// 🗑️ Ort löschen
window.deleteOrt = function (id) {
  if (confirm("❗ Diesen Ort wirklich löschen?")) {
    firebase.database().ref("orte/" + id).remove();
    alert("✅ Ort gelöscht.");
  }
};
