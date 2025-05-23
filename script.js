const map = L.map('map').setView([51.1657, 10.4515], 5); // Europa-Zentrum

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Beispiel-Marker
L.marker([52.52, 13.405]).addTo(map)
  .bindPopup('Lost Place Berlin<br><b>Ehemaliges Krankenhaus</b>');
L.marker([48.137, 11.575]).addTo(map)
  .bindPopup('Lost Place München<br><b>Alte Fabrik</b>');
