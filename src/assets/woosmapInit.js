let map, marker, infoWindow, mapD;

function initMap() {

    const londonInfoWindowHTML = "<div class='info-content'>" +
        "<h2>London</h2>" +
        "<div class='london-img'></div>" +
        "<p>London is the capital and largest city of England and the United Kingdom. <a href='https://en.wikipedia.org/wiki/London'>Wikipedia →</a></p>" +
        "</div>";

    map = new woosmap.map.Map(document.getElementById('divOrigin'), {
        center: {
            lat: 51.57,
            lng: -0.13
        },
        zoom: 10
    });
    marker = new woosmap.map.Marker({
        position: {
            lat: 51.515,
            lng: -0.13
        },
        icon: {
            url: 'https://images.woosmap.com/dot-marker.png'
        }
    });
    marker.setMap(map);
    infoWindow = new woosmap.map.InfoWindow({})
    infoWindow.setContent(londonInfoWindowHTML);
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    })

    mapD = new woosmap.map.Map(document.getElementById('divDestination'), {
        center: { lat: 51.50940214, lng: -0.133012 },
        zoom: 13
    });

}