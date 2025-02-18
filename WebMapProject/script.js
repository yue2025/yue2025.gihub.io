<!-- Initialize the map -->
mapboxgl.accessToken = 'pk.eyJ1IjoiaGUyMDI1IiwiYSI6ImNtNXdpY3M0ZTBjM2kyanM5YzhrNnVhOWMifQ.duF8NKn1fZadEX59dF4OYw';
const map = new mapboxgl.Map({
 container: 'map',
 center: [-121.4944, 38.5816],
 zoom:7,
 style: 'mapbox://styles/he2025/cm77ph6e000bb01r01zhzao9q',
 });

<!-- BLOCK_MOUSECLICK_1 -->
map.on('click', (event) => {
const features = map.queryRenderedFeatures(event.point, {
 layers: ['FirePoints'] 
});
if (!features.length) {
return;
}
const feature = features[0];
const popup = new mapboxgl.Popup({ offset: [0, 15],className:"my-popup"})
 .setLngLat(feature.geometry.coordinates)
 .setHTML(
`<h3>${feature.properties.FIRENAME
}</h3>
<p><b>UNIQFIREID : </b>${feature.properties.UNIQFIREID
}</p>
<p><b>DISCOVERYDATETIME : </b>${feature.properties.DISCOVERYDATETIME
}</p>
<p><b>SIZECLASS : </b>${feature.properties.SIZECLASS
}</p>
<p><b>COUNTY : 
</b>${feature.properties.COUNTY
}</p>
<p><b>TOTALACRES_UNIT : </b>${feature.properties.TOTALACRES_UNIT
}</p>
<p><b>STATCAUSE : </b>${feature.properties.STATCAUSE
}</p>`
 )
 .addTo(map);
});
<!-- BLOCK_SCALE -->
map.addControl(new mapboxgl.ScaleControl(), "bottom-right");
<!-- BLOCK_NAVIGATION -->
map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
<!-- BLOCK_GEOLOCATE -->
map.addControl(
new mapboxgl.GeolocateControl({
 positionOptions: {
 enableHighAccuracy: true
 },
 trackUserLocation: true,
 showUserHeading: true
 }),
 "bottom-right"
);
<!-- BLOCK_SEARCH -->
const geocoder = new MapboxGeocoder({
 accessToken: mapboxgl.accessToken, 
 mapboxgl: mapboxgl, 
 marker: false, 
 placeholder: "Search for the locations of wildfire spots in California", 
 proximity: {
 longitude: -121.4944,
 latitude: 38.5816
 } 
});
map.addControl(geocoder, "top-right");

<!-- BLOCK_SLIDERMONTH -->
document.getElementById('slider').addEventListener('input', (event) => {
const month = parseInt(event.target.value);
if (month === 0) {
filterMonth = ['!=', ['get', 'MONTH(NUM)'], 'placeholder'];
document.getElementById('active-month').innerText = 'All';
} else {
filterMonth = ['==', ['get', 'MONTH(NUM)'], month]
map.setFilter('FirePoints', ['all', filterMonth]);
document.getElementById('active-month').innerText = month;
};
map.setFilter('FirePoints', ['all', filterMonth]);
});

<!-- BLOCK_CLASSFICATION --> 
document.getElementById('filters').addEventListener('change', (event) => {
const type = event.target.value;
console.log(type);

if (type == 'all') {
filterType = ['!=', ['get', 'SIZECLASS'], 'placeholder'];
} else if (type == 'a') {
filterType = ['==', ['get', 'SIZECLASS'], 'A'];
} else if (type == 'b') {
filterType = ['==', ['get', 'SIZECLASS'], 'B'];
} else if (type == 'c') {
filterType = ['==', ['get', 'SIZECLASS'], 'C'];
} else if (type == 'd') {
filterType = ['==', ['get', 'SIZECLASS'], 'D'];
} else if (type == 'e') {
filterType = ['==', ['get', 'SIZECLASS'], 'E'];
} else if (type == 'f') {
filterType = ['==', ['get', 'SIZECLASS'], 'F'];
} else if (type == 'g') {
filterType = ['==', ['get', 'SIZECLASS'], 'G'];
} else if (type == 'h') {
filterType = ['==', ['get', 'SIZECLASS'], 'H'];
} else if (type == 'i') {
filterType = ['==', ['get', 'SIZECLASS'], 'I'];
} else {
console.log('error');
}
map.setFilter('FirePoints', ['all', filterMonth, filterType]);
});

<!-- BLOCK_COUNTY -->
const counties = [
    'Alpine County', 'Amador County', 'Butte County', 'Calaveras County', 'Del Norte County', 'Douglas County', 'El Dorado County', 
    'Fresno County', 'FloridaGlenn County', 'Humboldt County', 'Inyo County', 'Jackson County', 'Kern County', 'Lake County', 'Lassen County', 
    'Los Angeles County', 'Madera County', 'Mariposa County', 'Mendocino County', 'Modoc County', 'Mono County', 'Nevada County', 
    'Orange County', 'Placer County', 'Plumas County', 'Riverside County', 'San Bernardino County', 'San Diego County', 'San Luis Obispo County', 
    'Shasta County', 'Santa Barbara County', 'Sierra County', 'Siskiyou County', 'Tehama County', 'Trinity County', 'Tulare County', 
    'Tuolumne County', 'Ventura County', 'Yuba County'
];
<!-- li-panelElement-panel -->
const panelElement = document.getElementById('panel');
counties.forEach(state => {
const li = document.createElement('li');
   li.textContent = state;
panelElement.appendChild(li);
});

<!-- BLOCK_MOUSECLICK_2 -->
map.on('click', (event) => {
const features = map.queryRenderedFeatures(event.point, {
    layers: ['FirePoints'] 
    });
if (features.length > 0) {
const feature = features[0];
console.log('Feature properties:', feature.properties);
const county = feature.properties.COUNTY;
highlightcounty(county);
} 
});

function highlightcounty(county) {
const listItems = document.querySelectorAll('#panel li');
    listItems.forEach((item) => {
console.log('Checking item: ', item.textContent);
if (item.textContent === county) {
    item.classList.add('highlight');
    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
} else {
    item.classList.remove('highlight');
}
});
}

map.on('click', (event) => {
const features = map.queryRenderedFeatures(event.point, {
    layers: ['counties']
});
if (features.length > 0) {
const feature = features[0];
console.log('Feature properties:', feature.panel);
  highlightcounty(county);
} 
});