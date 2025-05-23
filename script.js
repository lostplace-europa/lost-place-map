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
