import { LucideIcon } from "lucide-react";

export type SeatStatus =
  | "available"
  | "vip"
  | "selected"
  | "unavailable"
  | "booked";

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
}

export interface MovieBooking {
  movieTitle: string;
  showtime: string;
  date: string;
  cinema: string;
  screen: string;
  selectedSeats: string[];
  pricePerSeat: number;
  discount: number;
}

export interface MenuField {
  url: string;
  title: string;
  icon: LucideIcon;
  onlyIcon?: boolean;
  childs?: MenuField[];
}