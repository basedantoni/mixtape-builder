import { LoginButton } from "@/components/spotify/login-button";
import dynamic from "next/dynamic";
import Image from "next/image";
import mixtape from "@/public/svg/mixtape_black.svg";

const AnimatedText = dynamic(() => import("@/components/animated-text"), {
  ssr: false,
});

const Home = () => {
  const texts = ["partner", "loved one", "friend"];

  return (
    <div className="flex flex-col items-center gap-16 pt-12 px-4">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <Image src={mixtape} alt="mixtape" height={32} width={32} priority />
        Mixtape Builder
      </h1>
      <div className="flex flex-col gap-6 items-center">
        <h2 className="text-3xl font-semibold text-center">
          Old fashioned mixtapes for your <AnimatedText texts={texts} />
        </h2>
        <Image src={mixtape} alt="mixtape" height={195} width={307} priority />
        <LoginButton />
      </div>
    </div>
  );
};

export default Home;
