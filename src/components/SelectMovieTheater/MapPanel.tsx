import React from 'react';
import { TheaterDetailResponse, TheaterResponse } from '@/@type/response.type';

interface Props {
  cumRapList: TheaterDetailResponse[];
  selectedCumRap: TheaterDetailResponse | null;
  setSelectedCumRap: (c: TheaterDetailResponse | null) => void;
  heThongRapList: TheaterResponse[];
  selectedHeThongRap: TheaterResponse | null;
}

const MapPanel: React.FC<Props> = ({ cumRapList, selectedCumRap }) => {
  const getMapUrl = () => {
    if (selectedCumRap && selectedCumRap.diaChi) {
      const address = encodeURIComponent(selectedCumRap.diaChi + ', Vietnam');
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&q=${address}&zoom=16`;
    } else if (cumRapList.length > 0) {
      return `https://www.google.com/maps/embed/v1/search?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&q=rạp+chiếu+phim+Vietnam&zoom=12`;
    } else {
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&q=Vietnam&zoom=6`;
    }
  };

  return (
    <div className="flex-1 relative">
      <iframe
        src={getMapUrl()}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0"
        title="Google Maps"
      />
    </div>
  );
};

export default MapPanel;
