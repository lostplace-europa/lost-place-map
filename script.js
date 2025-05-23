// 🌍 Leaflet-Karte initialisieren
const map = L.map('map').setView([51.1657, 10.4515], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const markerMap = new Map(); // Firebase-ID → Marker

// 📥 Marker aus Firebase laden
firebase.database().ref("orte").on("value", snapshot => {
  const data = snapshot.val();
  const adminPanel = document.getElementById("admin-panel");

  // vorherige Marker löschen
  markerMap.forEach(marker => map.removeLayer(marker));
  markerMap.clear();

  // Adminliste leeren
  const alteListen = document.querySelectorAll(".admin-eintrag");
  alteListen.forEach(el => el.remove());

  if (data) {
    let counter = 1;
    Object.entries(data).forEach(([id, entry]) => {
      if (entry.lat && entry.lon) {
        const marker = L.marker([entry.lat, entry.lon]).addTo(map)
          .bindPopup(`<b>${entry.name}</b><br>${entry.beschreibung}`);
        markerMap.set(id, marker);

        // Admin-Einträge anzeigen
        const div = document.createElement("div");
        div.className = "admin-eintrag";
        div.innerHTML = `
          <strong>#${counter++}</strong> ${entry.name} (${entry.lat}, ${entry.lon})
          <button onclick="deleteOrt('${id}')">Löschen</button>
        `;
        adminPanel.appendChild(div);
      }
    });
  }
});

// 🔁 Reiter umschalten (Tabs)
window.showTab = function(id) {
  document.querySelectorAll('section').forEach(section => {
    section.classList.remove('active');
  });
  const activeSection = document.getElementById(id);
  if (activeSection) activeSection.classList.add('active');
  document.querySelectorAll('nav button').forEach(button => {
    button.classList.remove('active');
  });
  const clickedButton = document.querySelector(`nav button[onclick='showTab("${id}")']`);
  if (clickedButton) clickedButton.classList.add('active');
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

// ➕ Admin-Ort hinzufügen
window.addAdminMarker = function () {
  const name = document.getElementById("admin-ort-name").value;
  const beschr = document.getElementById("admin-ort-beschreibung").value;
  const coords = document.getElementById("admin-ort-koordinaten").value.split(",");

  if (coords.length === 2) {
    const lat = parseFloat(coords[0].trim());
    const lon = parseFloat(coords[1].trim());

    if (!isNaN(lat) && !isNaN(lon)) {
      const newOrt = {
        name: name,
        beschreibung: beschr,
        lat: lat,
        lon: lon
      };
      firebase.database().ref("orte").push(newOrt);
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

// 🗑️ Ort löschen (Admin)
window.deleteOrt = function (id) {
  if (confirm("❗ Bist du sicher, dass du diesen Ort löschen willst?")) {
    firebase.database().ref("orte/" + id).remove();
    alert("Ort wurde gelöscht.");
  }
};
