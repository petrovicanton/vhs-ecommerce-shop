import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#070707] py-10 text-white">
      <div className="container mx-auto py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="">
            <h2 className="font-bold text-lg mb-4">Retro Movie Mall</h2>
            <p className="text-sm">
              Explore a captivating world of cinema, where our extensive
              collection of VHS cassettes offers thrilling adventures, classic
              films, and a nostalgic journey through the golden era of home
              entertainment. Rediscover the magic of analog movies as you browse
              through our selection, sure to evoke fond memories and create new
              ones.
            </p>
          </div>
          <div className="text-center">
            <h2 className="font-bold text-lg mb-4">About Us</h2>
            <ul className="flex justify-center text-sm">
              <li>
                <Link href="#" className="hover:text-gray-400 mr-5">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="font-bold text-lg mb-4">Contact Us</h2>
            <p className="text-sm">
              If you have any questions or inquiries, please feel free to reach
              out to us.
            </p>
            <div className="flex flex-row mt-4">
              <FaFacebook className="w-10 h-10 text-blue-700 mr-5" />
              <FaInstagram className="w-10 h-10 text-pink-500 mr-5" />
              <FaTwitter className="w-10 h-10 text-blue-300" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
