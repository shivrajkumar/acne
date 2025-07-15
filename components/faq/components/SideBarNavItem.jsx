"use client";
import { Button } from "antd";
import React from "react";

const SideBarNavItem = ({ label, onClick }) => {
  return (
    <Button
      type="text"
      onClick={onClick}
      className="cursor-pointer py-2 px-4 text-left text-sm font-normal !text-black border-2 !border-black rounded-3xl md:border-none md:rounded-none md:px-0"
    >
      {label}
    </Button>
  );
};

export default SideBarNavItem;
