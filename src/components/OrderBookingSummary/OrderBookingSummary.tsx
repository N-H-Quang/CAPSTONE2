interface BookingSummaryProps {
  movieTitle: string;
  showtime: string;
  date: string;
  cinema: string;
  screen: string;
  selectedSeats: string[];
  priceInfo: string;
  discount: number;
  total: number;
  onBooking: () => void;
}
function OrderBookingSummary({
  movieTitle,
  showtime,
  date,
  cinema,
  screen,
  selectedSeats,
  priceInfo,
  discount,
  total,
  onBooking,
}: BookingSummaryProps) {
   return (
    <div className="bg-gray-800 rounded-lg p-6 text-white space-y-4">
      <h2 className="text-2xl font-bold text-center border-b border-gray-600 pb-4">
        {movieTitle}
      </h2>

      <div className="space-y-3 border-b border-dotted border-gray-600 pb-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Ngày chiếu giờ chiếu</span>
          <span className="text-orange-500">{date} - {showtime}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Cụm rạp</span>
          <span>{cinema}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Rạp</span>
          <span>{screen}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Ghế chọn</span>
          <span className="text-orange-500">{priceInfo}</span>
        </div>
      </div>

      <div className="space-y-3 border-b border-dotted border-gray-600 pb-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Ưu đãi</span>
          <span>{discount} %</span>
        </div>
      </div>

      <div className="flex justify-between text-xl font-bold">
        <span>Tổng tiền</span>
        <span>{total.toLocaleString()}</span>
      </div>

      <button
        onClick={onBooking}
        disabled={selectedSeats.length === 0}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-colors duration-200 uppercase"
      >
        Booking Ticket
      </button>
    </div>
  );
}

export default OrderBookingSummary