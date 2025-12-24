import SelectMovieTheater from "../SelectMovieTheater";

function ShowTime() {
  return (
    <div className="bg-black bg-[url(https://plus.unsplash.com/premium_photo-1726848094123-b69f8c83b824?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW92aWUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww)] bg-no-repeat bg-top bg-cover relative min-h-[300px] p-4">
      <div className="container mx-auto relative z-10 text-black bg-white rounded-lg shadow-lg">
        <h2 className="text-black text-xl font-semibold mt-4 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-black/20 after:mt-2 mb-4">
          Show Time
        </h2>
        <SelectMovieTheater />
      </div>
    </div>
  );
}

export default ShowTime;
