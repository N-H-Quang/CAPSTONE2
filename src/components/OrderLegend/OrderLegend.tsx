function OrderLegend() {
    return (
    <div className="flex flex-wrap gap-4 justify-center mt-6 text-sm text-white">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-400 rounded-md"></div>
        <span>Ghế thường</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-orange-500 rounded-md"></div>
        <span>Ghế VIP</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-green-500 rounded-md"></div>
        <span>Ghế đang chọn</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center text-white">
          ✕
        </div>
        <span>Ghế đã đặt</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-600 rounded-md flex items-center justify-center text-white">
          👥
        </div>
        <span>Ghế đang có người chọn</span>
      </div>
    </div>
  );
}

export default OrderLegend