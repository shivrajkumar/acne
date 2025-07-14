import React from 'react';
import { Typography } from 'antd';
import Image from 'next/image';

const { Text } = Typography;

const FaqContactInfo = ({ icon: Icon, title, content, subContent, cin }) => {
  return (
    <div className="flex items-start mb-6 w-full">
      <div className="w-8 h-8 rounded flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
        <Image src={Icon} height={25} width={25} alt={title} />
      </div>
      
      <div className="flex-1">
        <Text 
          strong 
          className="text-sm text-gray-900 block mb-1"
        >
          {title}
        </Text>
        
        <Text 
          className="text-sm text-gray-600 leading-relaxed block"
        >
          {content}
        </Text>
        
        {subContent && (
          <Text 
            className="text-[14px] text-gray-600 block mt-0.5"
          >
            {subContent}
          </Text>
        )}

        {cin && (
            <Text className=''>{cin}</Text>
        )}
      </div>
    </div>
  );
};

export default FaqContactInfo;