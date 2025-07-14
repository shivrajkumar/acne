'use client'
import React from 'react';
import { Button, Typography } from 'antd';

const { Text } = Typography;

const SideBarNavItem = ({ label, onClick }) => {
  return (
    <Button
      type="text"
      onClick={onClick}
      className="w-full h-auto py-2 px-2 md:px-0 text-left border-none shadow-none bg-transparent justify-start hover:bg-transparent"
    >
      <Text className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200 sm:border-2 sm:border-black sm:rounded-xl sm:px-4">
        {label}
      </Text>
    </Button>
  );
};

export default SideBarNavItem;