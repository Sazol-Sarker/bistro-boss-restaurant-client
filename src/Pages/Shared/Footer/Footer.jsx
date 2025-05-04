import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="my-10 bg-[#1F2937] text-neutral-content">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Contact Section */}
        <div className="bg-[#1F2937] flex flex-col items-center py-10">
          <h6 className="text-md md:text-lg uppercase">Contact Us</h6>
          <p>123 ABS Street, Uni 21, Bangladesh</p>
          <p>+88 123456789</p>
          <p>Mon - Fri: 08:00 - 22:00</p>
          <p>Sat - Sun: 10:00 - 23:00</p>
        </div>

      
        {/* Social Media Section */}
        <div className="bg-[#111827]  flex flex-col items-center text-white text-center py-10">
          <h6 className="footer-title uppercase text-md md:text-lg">Follow Us</h6>
          <p className="text-gray-400">Join us on social media</p>

          {/* Social Icons */}
          <div className="flex gap-6 mt-4">
            <a href="#" className="text-white text-2xl hover:text-gray-400 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white text-2xl hover:text-gray-400 transition">
              <FaTwitter />
            </a>
            <a href="#" className="text-white text-2xl hover:text-gray-400 transition">
              <FaYoutube />
            </a>
          </div>
        </div>
        
      </div>

      {/* Bottom Copyright Section */}
      <div className="bg-black flex justify-center items-center p-4 text-white">
        <aside className="flex items-center gap-2">
         
          <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
