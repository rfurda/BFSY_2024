import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col text-center sm:flex-row w-full justify-center items-center bg-primary-foreground text-primary shadow-inner">
      <div className="px-8 pt-2 sm:pb-2 max-sm:w-full">Copyright &copy;{new Date().getFullYear()}</div>
      <div className="px-8 sm:py-2 max-sm:w-full">x@gmail.com</div>
      <div className="px-8 sm:pt-2 pb-2 max-sm:w-full">(+555) 555-555-5555</div>
    </footer>
  );
};

export default Footer;
