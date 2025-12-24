import { Seat, SeatStatus } from "@/@type/movie.type";

export const generateSeats = (): Seat[] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 16;
  const seats: Seat[] = [];

  const bookedSeats = ['H4', 'H5', 'H6', 'J15', 'J16'];
  
  const vipRows = ['F', 'G'];

  rows.forEach((row) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      const seatId = `${row}${i}`;
      let status: SeatStatus = 'available'

      if (bookedSeats. includes(seatId)) {
        status = 'booked';
      } else if (vipRows.includes(row)) {
        status = 'vip';
      }

      seats.push({
        id: seatId,
        row,
        number: i,
        status,
      });
    }
  });

  return seats;
};