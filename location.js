// Predefined high-risk zones (latitude, longitude, radius in km)
const highRiskZones = [
    { lat: 12.9716, lng: 77.5946, radius: 2 }, // Example: Bangalore center
    { lat: 28.6139, lng: 77.2090, radius: 1.5 } // Example: Delhi center
];

// Predefined safe zones (police stations, hospitals)
const safeZones = [
    { lat: 12.9724, lng: 77.5807, name: "Police Station" },
    { lat: 12.9784, lng: 77.5920, name: "Women's Help Center" }
];

document.getElementById('checkLocationBtn').addEventListener('click', checkLocationSafety);

function checkLocationSafety() {
    const statusElement = document.getElementById('locationStatus');
    const mapElement = document.getElementById('mapPreview');
    
    statusElement.innerHTML = `
        <div class="w-8 h-8 rounded-full risk-medium mr-3"></div>
        <span>Checking your location...</span>
    `;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const riskLevel = calculateRiskLevel(userLat, userLng);
                
                updateRiskDisplay(userLat, userLng, riskLevel);
                showMapPreview(userLat, userLng, mapElement);
            },
            (error) => {
                handleLocationError(error, statusElement);
            }
        );
    } else {
        statusElement.innerHTML = `
            <div class="w-8 h-8 rounded-full risk-high mr-3"></div>
            <span>Geolocation is not supported by your browser</span>
        `;
    }
}

function calculateRiskLevel(lat, lng) {
    // Check if in high-risk zone
    for (const zone of highRiskZones) {
        const distance = getDistanceFromLatLonInKm(lat, lng, zone.lat, zone.lng);
        if (distance <= zone.radius) {
            return 'high';
        }
    }

    // Check time of day (higher risk at night)
    const hours = new Date().getHours();
    if (hours < 6 || hours > 20) { // 8pm to 6am
        return 'medium';
    }

    return 'low';
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1); 
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

function updateRiskDisplay(lat, lng, riskLevel) {
    const statusElement = document.getElementById('locationStatus');
    let riskText = '';
    let suggestions = '';
    
    if (riskLevel === 'high') {
        riskText = 'High Risk Area - Be Cautious';
        suggestions = 'Avoid walking alone. Consider calling a trusted contact.';
    } else if (riskLevel === 'medium') {
        riskText = 'Moderate Risk - Stay Alert';
        suggestions = 'Be aware of your surroundings. Have your phone ready.';
    } else {
        riskText = 'Low Risk - Safe Area';
        suggestions = 'Still maintain general safety awareness.';
    }

    statusElement.innerHTML = `
        <div class="w-8 h-8 rounded-full risk-${riskLevel} mr-3"></div>
        <div>
            <p class="font-medium">${riskText}</p>
            <p class="text-sm text-gray-600">${suggestions}</p>
        </div>
    `;
}

function showMapPreview(lat, lng, mapElement) {
    // In a real app, we'd use a map API, but for this demo we'll use a static image
    // with markers simulated via CSS
    mapElement.innerHTML = `
        <div class="relative h-full w-full bg-gray-300">
            <div class="absolute w-4 h-4 bg-red-600 rounded-full" style="top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
            <p class="absolute bottom-2 left-2 text-sm bg-white px-2 py-1 rounded">Your location</p>
        </div>
    `;
}

function handleLocationError(error, statusElement) {
    let message = '';
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = "Location access denied. Enable location services for safety features.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Location information unavailable.";
            break;
        case error.TIMEOUT:
            message = "Location request timed out.";
            break;
        case error.UNKNOWN_ERROR:
            message = "An unknown error occurred.";
            break;
    }

    statusElement.innerHTML = `
        <div class="w-8 h-8 rounded-full risk-high mr-3"></div>
        <span>${message}</span>
    `;
}
