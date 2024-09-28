import Image from "next/image";
import mixtape from "@/public/svg/mixtape_black.svg";

export const Mixtape = ({ title }: { title: string }) => {
  return (
    <div className="relative">
      <Image src={mixtape} alt="mixtape" height={195} width={307} priority />
      <p className="font-brick text-3xl text-center absolute top-6 m-auto left-0 right-0 w-fit">
        {title}
      </p>
    </div>
  );
};
