import Image from "next/image";

export const Mixtape = ({ title }: { title: string }) => {
  return (
    <div className="relative">
      <Image
        src="/svg/mixtape_black.svg"
        alt="mixtape"
        height={195}
        width={307}
        priority
      />
      <p className="text-xl text-center font-black absolute top-6 m-auto left-0 right-0 w-fit">
        {title}
      </p>
    </div>
  );
};
