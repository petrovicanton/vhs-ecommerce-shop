import { FC } from "react";
import heroClassNames from "./heroClassNames";
import Link from "next/link";

const HeroSection: FC<{ showLink?: boolean }> = (props) => {
  const { showLink } = props;

  return (
    <section className={heroClassNames.hero}>
      <div className={heroClassNames.videoContainer}>
        <video autoPlay loop muted playsInline className={heroClassNames.video}>
          <source src="../../../video/videoHeader.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={heroClassNames.content}>
        <div className={heroClassNames.centerContent}>
          <h1 className={heroClassNames.heading}>Retro Movie Mall</h1>
          <h1 className={heroClassNames.ctaText}>
            Relive the VHS Era – <span className="text-red-600">Shop Now!</span>
          </h1>
          {showLink && (
            <div className="mt-8 sm:mt-10 rounded">
              <Link
                href="/movies"
                className="mt-8 sm:mt-10 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-[40px] shadow-sm text-white bg-VHSred text-lightBlue-500 hover:bg-blue-900 sm:px-8"
              >
                Find Movies
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
