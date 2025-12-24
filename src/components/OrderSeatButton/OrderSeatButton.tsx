import { Seat } from "@/@type/movie.type";

interface SeatButtonProps {
  seat: Seat;
  onSeatClick: (seatId: string) => void;
}

function OrderSeatButton({ seat, onSeatClick }: SeatButtonProps) {
  const getSeatStyles = () => {
    const baseStyles = "w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-sm sm:rounded-md transition-all duration-200 text-[10px] sm:text-xs font-semibold flex items-center justify-center";
    
    switch (seat.status) {
      case 'available':
        return `${baseStyles} bg-gray-400 hover:bg-gray-300 active:bg-gray-300 cursor-pointer`;
      case 'vip':
        return `${baseStyles} bg-orange-500 hover:bg-orange-400 active:bg-orange-400 cursor-pointer`;
      case 'selected':
        return `${baseStyles} bg-green-500 text-white cursor-pointer ring-2 ring-green-300`;
      case 'unavailable':
        return `${baseStyles} bg-gray-600 cursor-not-allowed opacity-50`;
      case 'booked': 
        return `${baseStyles} bg-red-500 cursor-not-allowed flex items-center justify-center`;
      default:
        return baseStyles;
    }
  };

  const handleClick = () => {
    if (seat.status === 'available' || seat.status === 'vip' || seat.status === 'selected') {
      onSeatClick(seat.id);
    }
  };

  return (
    <button
      className={getSeatStyles()}
      onClick={handleClick}
      disabled={seat.status === 'unavailable' || seat.status === 'booked'}
    >
      {seat.status === 'booked' && (
        <span className="text-white text-xs">✕</span>
      )}
      {seat.status === 'selected' && (
        <span className="text-white text-[8px] sm:text-[10px]">{seat.number}</span>
      )}
    </button>
  );
}

export default OrderSeatButton