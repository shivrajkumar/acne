"use client";
import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";

const SideBarNavItem = ({ label, onClick, index, selectedIndex }) => {
  const isSelected = selectedIndex === index;

  return (
    <Button
      type="button"
      onClick={onClick}
      className="cursor-pointer py-2 px-4 font-lato text-left text-sm font-normal !text-black border-1 !border-black rounded-3xl md:border-none md:rounded-none md:px-0 flex items-center gap-2"
    >
      {isSelected && (
        <span className="hidden md:inline-flex">
          <ArrowRightOutlined className="text-xs" />
        </span>
      )}
      <span className={`${isSelected ? "font-bold" : "font-normal"}`}>{label}</span>
    </Button>
  );
};

export default SideBarNavItem;