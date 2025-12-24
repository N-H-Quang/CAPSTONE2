interface HeaderProps {
  date: string;
  screen: string;
  countdown: string;
}

function OrderMovieHeader({ date, screen, countdown }: HeaderProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <div className="text-sm">
        {date} - {screen}
      </div>
      <div className="text-orange-500 text-2xl font-bold">{countdown}</div>
    </div>
  );
}

export default OrderMovieHeader;
