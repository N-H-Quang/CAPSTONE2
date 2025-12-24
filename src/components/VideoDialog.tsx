import { Youtube } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  src: string;
  triggerClassName?: string;
  ariaLabel?: string;
};

export default function VideoDialog({ src, triggerClassName, ariaLabel }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button aria-label={ariaLabel ?? "Open video"} className={triggerClassName}>
          <Youtube className="w-full h-full" />
        </button>
      </DialogTrigger>
      <DialogContent className="!max-w-[900px] !min-h-[300px] md:!min-h-[450px]">
        <DialogHeader />
        <div className="w-full">
          <iframe
            id="youtube"
            width="100%"
            height="100%"
            style={{ minHeight: 300 }}
            frameBorder={0}
            allow="autoplay"
            allowFullScreen
            src={src}
            title={ariaLabel ?? "Video dialog"}
          />
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
