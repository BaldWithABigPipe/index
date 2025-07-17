// Map initialization with error handling and loading states
document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('map');
    
    if (!mapContainer) {
        console.error('Map container not found');
        return;
    }

    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet is not loaded');
        mapContainer.innerHTML = `
            <div class="map-loading">
                <p class="map-loading__text">Map library not loaded</p>
            </div>
        `;
        return;
    }

    try {
        // Initialize map with correct coordinates for Chavannes de Bogis
        const map = L.map('map', {
            center: [46.3200, 6.1700],
            zoom: 15,
            zoomControl: true,
            scrollWheelZoom: false,
            dragging: true,
            touchZoom: true,
            doubleClickZoom: true,
            boxZoom: false,
            keyboard: false,
            tap: true
        });
        
        // Add OpenStreetMap tiles with better configuration
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
            minZoom: 10,
            subdomains: 'abc'
        }).addTo(map);
        
        // Create custom marker icon with improved design
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
                <div class="marker-icon">
                    <div class="marker-pulse"></div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                </div>
            `,
            iconSize: [48, 48],
            iconAnchor: [24, 48], // Center horizontally, bottom vertically
            popupAnchor: [0, -48]
        });
        
        // Add marker for ROYALTRANSFER location with fixed coordinates
        const markerCoords = [46.3200, 6.1700];
        const marker = L.marker(markerCoords, {
            icon: customIcon,
            title: 'ROYALTRANSFER'
        }).addTo(map);
        
        // Debug: Log marker position
        console.log('Marker position:', markerCoords);
        console.log('Marker element:', marker.getElement());
        
        // Create enhanced popup content
        const popupContent = `
            <div class="map-popup">
                <h3>ROYALTRANSFER</h3>
                <p><strong>Les Champs Blancs</strong><br>
                1279 Chavannes de Bogis<br>
                Switzerland</p>
                <p style="margin-top: 8px; font-size: 12px; opacity: 0.8;">
                    Premium luxury transportation services
                </p>
                <div style="margin-top: 12px; text-align: center;">
                    <small style="color: var(--color-accent); font-weight: 600;">
                        Click for more info
                    </small>
                </div>
            </div>
        `;
        
        // Bind popup to marker with enhanced options
        marker.bindPopup(popupContent, {
            maxWidth: 280,
            className: 'custom-popup',
            closeButton: true,
            autoClose: false,
            closeOnClick: false
        });
        
        // Remove loading indicator
        const loadingElement = mapContainer.querySelector('.map-loading');
        if (loadingElement) {
            loadingElement.remove();
        }
        
        // Center map on marker with proper zoom and ensure marker is visible
        setTimeout(() => {
            map.setView(markerCoords, 16);
            
            // Ensure marker is properly positioned
            const markerElement = marker.getElement();
            if (markerElement) {
                console.log('Marker element found:', markerElement);
                console.log('Marker element position:', markerElement.style.transform);
            }
            
            // Make marker accessible for testing
            window.testMarker = marker;
            window.testMap = map;
            console.log('Test marker and map available in console as window.testMarker and window.testMap');
        }, 200);
        
        // Add click handler to open popup with animation
        marker.on('click', function() {
            this.openPopup();
            // Add click animation using CSS classes instead of transform
            const markerElement = this.getElement();
            if (markerElement) {
                const iconElement = markerElement.querySelector('.marker-icon');
                if (iconElement) {
                    iconElement.classList.add('marker-click');
                    setTimeout(() => {
                        iconElement.classList.remove('marker-click');
                    }, 200);
                }
            }
        });
        
        // Add hover effects using CSS classes
        marker.on('mouseover', function() {
            const markerElement = this.getElement();
            if (markerElement) {
                const iconElement = markerElement.querySelector('.marker-icon');
                if (iconElement) {
                    iconElement.classList.add('marker-hover');
                }
            }
        });
        
        marker.on('mouseout', function() {
            const markerElement = this.getElement();
            if (markerElement) {
                const iconElement = markerElement.querySelector('.marker-icon');
                if (iconElement) {
                    iconElement.classList.remove('marker-hover');
                }
            }
        });
        
        // Handle map load events
        map.whenReady(() => {
            console.log('Map loaded successfully');
            
            // Ensure marker stays at correct position after map loads
            setTimeout(() => {
                marker.setLatLng(markerCoords);
                console.log('Marker position confirmed:', marker.getLatLng());
            }, 500);
        });
        
        // Prevent marker from moving during zoom/pan operations
        map.on('zoomend', function() {
            marker.setLatLng(markerCoords);
        });
        
        map.on('moveend', function() {
            marker.setLatLng(markerCoords);
        });
        
    } catch (error) {
        console.error('Error initializing map:', error);
        mapContainer.innerHTML = `
            <div class="map-loading">
                <p class="map-loading__text">Error loading map</p>
            </div>
        `;
    }
}); 