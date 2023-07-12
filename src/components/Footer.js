import React from "react";
import { Link } from "react-router-dom";

const techs = [
  {name: 'OpenAI', link: 'https://openai.com/'},
  {name: 'Vercel', link: 'https://vercel.com/'},
  {name: 'Supabase', link: 'https://supabase.io/'},
  {name: 'Tailwind CSS', link: 'https://tailwindcss.com/'},
  {name: 'Flask', link: 'https://flask.palletsprojects.com/en/2.0.x/'},
  {name: 'Google Cloud', link: 'https://cloud.google.com/'}
];

export const Footer = () => {
  return (
    <footer className="bg-[#F0FFE0] py-4 ">
      <div className="container mx-auto px-6 md:px-4 flex flex-col justify-center items-center">
        
        {/* Powered by information */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <p className="text-black font-semibold text-base text-center">Powered by</p>
          {techs.map((tech, index) => (
            <a
              key={index}
              href={tech.link}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FF6E00]"
            >
              {tech.name}
            </a>
          ))}
        </div>

        {/* Policy and Terms */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Link
            to="/privacy-policy"
            className="text-black font-semibold text-base hover:text-[#FF6E00] text-center"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="text-black font-semibold text-base hover:text-[#FF6E00] text-center"
          >
            Terms of Service
          </Link>
        </div>

        {/* Contact information */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <p className="text-black font-semibold text-base text-center">
            Contact us at: <a href="mailto:contact@732development.com" className="hover:text-[#FF6E00]">contact@732development.com</a>
          </p>
        </div>

        {/* Copyright information */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <p className="text-black font-semibold text-base text-center">
            © 2023 732 Development - All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
