'use client';
import React from 'react';
import { Layout, Card, Row, Col, Typography } from 'antd';
import FaqSection from './components/FaqSection';
import SideBarNavItem from './components/SideBarNavItem';
import FaqContactInfo from './components/FaqContactInfo';
import { faqData, sidebarItems, contactInfo } from './data/faqData';
import AddressIcon from '@assets/svg/address_icon.svg'
import MailIcon from '@assets/svg/mail.svg'
import WorkingHoursIcon from '@assets/svg/Off.svg'

const { Content } = Layout;
const { Title } = Typography;

const MainFaq = () => {
  return (
    <Layout className="min-h-screen bg-white">
      <Content className="py-8 px-3 md:px-8 md:container mx-auto w-full">
        <Row gutter={[32, 32]}>
          {/* Sidebar */}
          <Col xs={24} lg={7}>
            {/* Navigation Card */}
            <Card className="mb-6 rounded-lg bg-[#F9F7F2]">
              <div className="mb-8 font-bold text-gray-900 text-[18px] md:text-[40px]">
                FAQ
              </div>
              
              <div className="flex md:hidden gap-1 overflow-x-auto scrollbar-hide">
                {sidebarItems.map((item) => (
                  <SideBarNavItem
                    key={item}
                    label={item}
                    isActive={false}
                    onClick={() => {}}
                  />
                ))}
              </div>

              <div className="hidden md:flex flex-col gap-1">
                {sidebarItems.map((item) => (
                  <SideBarNavItem
                    key={item}
                    label={item}
                    isActive={false}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </Card>

            {/* Contact Information Card */}
            <Card 
              className="rounded-lg"
              bodyStyle={{ padding: '24px' }}
            >
              <FaqContactInfo
                icon={MailIcon}
                title="Write to Us"
                content={contactInfo.email}
              />
              
              <FaqContactInfo
                icon={AddressIcon}
                title="Mailing Address"
                content={contactInfo.company}
                subContent={contactInfo.address}
                cin={contactInfo.cin}
              />
              
              <FaqContactInfo
                icon={WorkingHoursIcon}
                title="Working Hours:"
                content={contactInfo.workingHours}
                subContent={contactInfo.workingDays}
              />
            </Card>
          </Col>

          {/* Main Content */}
          <Col xs={24} lg={16}>
            <div className="rounded-lg bg-[#F9F7F2] p-6">
              {/* Display all FAQ sections */}
              {sidebarItems.map((section) => (
                <FaqSection 
                  key={section}
                  title={section}
                  items={faqData[section] || []}
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