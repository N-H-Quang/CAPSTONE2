import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  date?: string;
  image: string;
  className?: string;
  id: number;
};

export default function MovieCard({
  title,
  date,
  image,
  className = "",
  id
}: Props) {
  return (
    <Link to={`/detail/${id}`}>
      <Card
        className={
          "w-full bg-transparent border-0 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 hover:bg-white/10 overflow-hidden hover:shadow-lg" +
          className
        }
      >
        <CardContent>
          <div className="w-full h-56 md:h-72 rounded-lg overflow-hidden">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <h5 className="text-white truncate">{title}</h5>
          {date && <p className="text-sm text-white/80">{date}</p>}
        </CardFooter>
      </Card>
    </Link>
  );
}
