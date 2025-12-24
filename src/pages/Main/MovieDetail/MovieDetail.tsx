import movieApi from "@/apis/movie.api";
import MovieShowtime from "@/components/MovieShowtime";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const params = useParams<{ movieId: string }>();

  const { data: movieDetail, isLoading } = useQuery({
    queryKey: ["movieDetail", params.movieId],
    queryFn: () => {
      if (!params.movieId) return Promise.reject("No movie ID");
      return movieApi.getMovieDetail(params.movieId);
    },
    enabled: !!params.movieId,
  });

  if (isLoading) {
    return (
      <div>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute top-0 start-0 w-full h-full bg-neutral-primary/95 z-10 gap-2 flex items-center justify-center flex-col">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
        ;
      </div>
    );
  }

  return (
    <>
      <div className="bg-black min-h-[600px] bg-no-repeat bg-center bg-cover relative z-0 pt-20"
        style={{
          backgroundImage: `url(${movieDetail?.data.content.hinhAnh})`,
        }}
      >
        <div className="absolute inset-0 z-10 bg-black opacity-80"></div>
        <div className="container flex gap-x-11 flex-wrap mx-auto relative z-20">
          <div className="basis-xs bg-white rounded-lg h-[500px] overflow-hidden shadow-lg shrink-0 mx-auto">
            <img
              src={movieDetail?.data.content.hinhAnh}
              alt="Movie Poster"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 shrink-0 basis-[300px] text-white w-full">
            <h2 className="text-4xl mb-4">{movieDetail?.data.content.tenPhim}</h2>
            <p className="mb-6">
              {movieDetail?.data.content.moTa}
            </p>
            <div className="mb-4 flex gap-2">
              <Badge variant="destructive" className="uppercase">
                Action
              </Badge>
              <Badge variant="destructive" className="uppercase">
                Drama
              </Badge>
              <Badge variant="destructive" className="uppercase">
                Thriller
              </Badge>
            </div>
            <div className="text-white flex items-center gap-2">
              Rate this movie:
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <span className="ms-2 text-sm font-bold text-heading">{movieDetail?.data.content.danhGia}</span>
                <span className="w-1 h-1 mx-1.5 bg-neutral-quaternary rounded-full" />
                <a
                  href="#"
                  className="text-sm font-medium text-heading underline hover:no-underline"
                >
                  73 reviews
                </a>
              </div>
            </div>
            <MovieShowtime />
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetail;
