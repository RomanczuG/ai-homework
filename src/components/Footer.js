import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[#F0FFE0] py-4 ">
      <div className="container mx-auto px-6 md:px-4 flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* Lets add information about Powered by OpenAI, Vercel, Supabase, Tailwind CSS, Flask, Google Cloud */}
          <p className="text-black font-semibold text-base text-center">
            Powered by{" "}
            <a
              href="https://openai.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FF6E00]"
            >
              OpenAI
            </a>
            ,{" "}
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FF6E00]"
            >
              Vercel
            </a>
            ,{" "}
            <a
              href="https://supabase.io/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FF6E00]"
            >
              Supabase
            </a>
            ,{" "}
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FF6E00]"
            >
              Tailwind CSS
            </a>
            ,{" "}
            <a
              href="https://flask.palletsprojects.com/en/2.0.x/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FF6E00]"
            >
              Flask
            </a>
            ,{" "}
            <a
              href="https://cloud.google.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FF6E00]"
            >
              Google Cloud
            </a>
          </p>
        </div>
        {/* Let now put stuff below */}
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

        {/* Copyright to 732 Development */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <p className="text-black font-semibold text-base text-center">
            © 2023 732 Development - All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
