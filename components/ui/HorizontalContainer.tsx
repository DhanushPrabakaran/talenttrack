import Image from "next/image";
import Photo from "@/public/images/footerimage.jpg";
import { Parallax } from "./Parallax";

const HorizontalContainer = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between px-6 py-8 lg:px-12">
      {/* Image positioned in the top-right corner */}
      <Parallax className="absolute top-5  right-5 w-80  ">
        <Image
          // placeholder="blur"
          className="object-cover shadow-lg"
          src={Photo}
          alt="Description of the photo"
        />
      </Parallax>
      {/* Title and Description in the bottom-left corner */}
      <div className="relative z-10 mt-auto max-w-sm text-left lg:text-lg  lg:max-w-md">
        <h1 className=" text-[10vw] text-primary">Title</h1>
        <p className=" ">
          This is a description text that will be displayed in the bottom left
          corner of the screen. It provides more information about the image or
          content shown.
        </p>
      </div>
    </div>
  );
};

export default HorizontalContainer;
