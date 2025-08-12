import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


function IconWrapper({ children, href, label }) {
  const inner = (
    <span className="w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-white/30 cursor-pointer">
      {children}
    </span>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {inner}
    </a>
  ) : (
    <span aria-label={label}>{inner}</span>
  );
}

export default function SocialLinks({ instagram, whatsapp, twitter }) {
  return (
    <div className="flex items-center gap-3">
      <IconWrapper href={instagram} label="Instagram">
       <FaInstagram />
      </IconWrapper>

      <IconWrapper href={whatsapp} label="WhatsApp">
        <FaWhatsapp />
      </IconWrapper>

      <IconWrapper href={twitter} label="X (Twitter)">
        <FaXTwitter />
      </IconWrapper>
    </div>
  );
}
