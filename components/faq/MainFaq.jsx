'use client';
import React, {useRef, useState} from 'react';
import { Layout, Card, Row, Col, Divider } from 'antd';
import FaqSection from './components/FaqSection';
import SideBarNavItem from './components/SideBarNavItem';
import FaqContactInfo from './components/FaqContactInfo';
import { faqData, sidebarItems, contactInfo } from './data/faqData';
import AddressIcon from '@assets/svg/address_icon.svg'
import MailIcon from '@assets/svg/mail.svg'
import WorkingHoursIcon from '@assets/svg/Off.svg'

const { Content } = Layout;

const MainFaq = () => {
  const sectionRefs = useRef([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleScrollTo = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    setSelectedIndex(index)
  };

  console.log('selectedIndex', selectedIndex)

  return (
    <Layout className="min-h-screen bg-white">
      <Content className="py-8 px-3 md:px-8 md:container mx-auto w-full">
        <Row gutter={[32, 32]}>
          {/* Sidebar */}
          <Col xs={24} lg={7}>
            {/* Navigation Card */}
            <Card className="mb-6 rounded-lg bg-[#F9F7F2]">
              <div className="mb-8 font-sophiaPro font-bold text-gray-900 text-[18px] md:text-[40px]">
                FAQ
              </div>
              
              <div className="flex md:hidden gap-4 overflow-x-auto hide-scrollbar">
                {sidebarItems.map((item, index) => (
                  <SideBarNavItem
                    key={item}
                    label={item}
                    onClick={() => handleScrollTo(index)}
                    index={index}
                    selectedIndex={selectedIndex}
                  />
                ))}
              </div>

              <div className="hidden md:flex flex-col gap-1 items-start">
                {sidebarItems.map((item, index) => (
                  <SideBarNavItem
                    key={item}
                    label={item}
                    onClick={() => handleScrollTo(index)}
                    index={index}
                    selectedIndex={selectedIndex}

                  />
                ))}
              </div>
            </Card>

            {/* Contact Information Card */}
            <div className="mt-12">
              <FaqContactInfo
                icon={MailIcon}
                title="Write to Us"
                content={contactInfo.email}
              />
                <Divider className="my-6" />

              
              <FaqContactInfo
                icon={AddressIcon}
                title="Mailing Address"
                content={contactInfo.company}
                subContent={contactInfo.address}
                cin={contactInfo.cin}
              />
                <Divider className="my-6" />

              
              <FaqContactInfo
                icon={WorkingHoursIcon}
                title="Working Hours:"
                content={contactInfo.workingHours}
                subContent={contactInfo.workingDays}
              />
            </div>
          </Col>

          {/* Main Content */}
          <Col xs={24} lg={16}>
            <div className="rounded-lg bg-[#F9F7F2] p-6">
              {/* Display all FAQ sections */}
              {sidebarItems.map((section, index) => (
                <FaqSection 
                  key={section}
                  title={section}
                  items={faqData[section] || []}
                  ref={(el) => (sectionRefs.current[index] = el)}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default MainFaq;