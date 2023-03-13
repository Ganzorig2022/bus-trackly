import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { useCollection } from '../hooks/useCollection';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';

const MapRender = () => {
  const markerRef = useRef(null);

  const { driverData, snapshotData, getAllDrivers } = useCollection('Drivers');
  const [allDrivers, setAllDrivers] = useState<DriverType[]>([]);

  useEffect(() => {
    (async () => {
      setAllDrivers(snapshotData);
    })();
  }, [snapshotData]);

  console.log(allDrivers);

  return (
    <MapContainer
      center={{ lat: 47.91660524732946, lng: 106.96457125140142 }}
      zoom={13}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=BlX75aexttP0PZgDJuki'
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {allDrivers?.map((driver, i) => {
        return (
          <Marker
            key={i}
            position={[driver.location?.latitude, driver.location?.longitude]}
            ref={markerRef}
          >
            <Tooltip>{driver.firstName}</Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapRender;
