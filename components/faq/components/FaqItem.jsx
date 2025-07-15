import React from 'react';
import { Button, Typography } from 'antd';
import Image from 'next/image';
import PlusIcon from '@/assets/svg/Plus.svg';
import MinusIcon from '@/assets/svg/Minus.svg';

const { Text } = Typography;

const FaqItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0 cursor-pointer">
      <div
        type="text"
        onClick={onToggle}
        className="w-full h-auto py-4 px-0 flex justify-between items-center text-left border-none shadow-none hover:bg-transparent"
      >
        <Text strong className="text-sm font-sophiaPro text-gray-900">
          {question}
        </Text>
        <div className="w-6 h-6 rounded-full flex items-center justify-center">
          <Image
            src={isOpen ? MinusIcon : PlusIcon}
            alt={isOpen ? 'Collapse' : 'Expand'}
            width={20}
            height={20}
            className="text-white"
          />
        </div>
      </div>
      
      {isOpen && (
        <div className="pb-4 pr-8 animate-fadeIn">
          <Text className="text-sm font-sophiaPro text-gray-600 leading-relaxed">
            {answer}
          </Text>
        </div>
      )}
    </div>
  );
};

export default FaqItem;