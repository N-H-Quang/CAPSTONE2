import { Seat } from "@/@type/movie.type";
import OrderSeatButton from "../OrderSeatButton";

interface SeatGridProps {
  seats: Seat[];
  onSeatClick: (seatId: string) => void;
}

function OrderSeatGrid({ seats, onSeatClick }: SeatGridProps) {
  const uniqueRows = Array.from(new Set(seats.map(seat => seat.row))).sort();
  
  const maxSeatsPerRow = Math.max(
    ...uniqueRows.map(row => 
      seats.filter(seat => seat.row === row).length
    )
  );

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg overflow-x-auto">
      <div className="space-y-2 min-w-fit">
        {uniqueRows.map((row) => {
          const rowSeats = seats
            .filter((seat) => seat.row === row)
            .sort((a, b) => a.number - b.number);
          
          return (
            <div key={row} className="flex items-center gap-2">
              <div className="w-6 text-white font-semibold text-sm shrink-0">{row}</div>
              <div className="flex gap-1">
                {rowSeats.map((seat) => (
                  <OrderSeatButton
                    key={seat.id}
                    seat={seat}
                    onSeatClick={onSeatClick}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderSeatGrid