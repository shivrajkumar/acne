import React from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function IconWrapper({ children, href, label }) {
  const inner = (
    <span className="w-10 h-10 inline-flex items-center justify-center rounded-full hover:bg-white/30 cursor-pointer">
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

export default function SocialLinks({ blogTitle, blogUrl }) {
  const encodedTitle = encodeURIComponent(blogTitle);
  const encodedUrl = encodeURIComponent(blogUrl);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  return (
    <div className="flex items-center">
      {/* WhatsApp */}
      <IconWrapper href={shareLinks.whatsapp} label="Share on WhatsApp">
        <FaWhatsapp />
      </IconWrapper>

      {/* Twitter / X */}
      <IconWrapper href={shareLinks.twitter} label="Share on X">
        <FaXTwitter />
      </IconWrapper>

      {/* Instagram */}
      <IconWrapper href={shareLinks.linkedIn} label="LinkedIn">
        <FaLinkedin />
      </IconWrapper>

      <IconWrapper href={shareLinks.facebook} label="LinkedIn">
        <FaFacebook />
      </IconWrapper>
    </div>
  );
}
