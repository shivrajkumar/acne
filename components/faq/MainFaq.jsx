'use client';
import React, {useRef, useState} from 'react';
import FaqSection from './components/FaqSection';
import { CDN_BASE_URL, SHOPIFY_CDN_BASE_URL } from '@/constants/constants';
import { Layout, Card, Row, Col, Divider } from 'antd';
import SideBarNavItem from './components/SideBarNavItem';
import FaqContactInfo from './components/FaqContactInfo';
import { faqData, sidebarItems, contactInfo } from './data/faqData';
import BreadcrumbNavigator from '../generic/BreadcrumbNavigator';

const MainFaq = () => {
  const sectionRefs = useRef([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

const handleScrollTo = (index) => {
  const section = sectionRefs.current[index];
  if (section) {
    const offsetTop = section.getBoundingClientRect().top + window.scrollY - 40;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
    setSelectedIndex(index);
  }
};

  return (
    <Layout className="bg-white">
      <div className="py-8 px-4 md:px-8 md:container mx-auto w-full">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <BreadcrumbNavigator />
        </div>

        <Row gutter={[32, 32]}>
          {/* Sidebar */}
          <Col xs={24} lg={7}>
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

            {/* Desktop Contact Info */}
            <div className="mt-12 hidden md:block">
              <FaqContactInfo
                icon={`${SHOPIFY_CDN_BASE_URL}mail.webp`}
                title="Write to Us"
                content={contactInfo.email}
              />
              <Divider className="my-6" />
              <FaqContactInfo
                icon={`${SHOPIFY_CDN_BASE_URL}address.webp`}
                title="Mailing Address"
                content={contactInfo.company}
                subContent={contactInfo.address}
                cin={contactInfo.cin}
              />
              <Divider className="my-6" />
              <FaqContactInfo
                icon={`${SHOPIFY_CDN_BASE_URL}timings.webp`}
                title="Working Hours:"
                content={contactInfo.workingHours}
                subContent={contactInfo.workingDays}
              />
            </div>
          </Col>

          {/* Main Content */}
          <Col xs={24} lg={16}>
            <div className="rounded-lg bg-[#F9F7F2] p-6">
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

          {/* Mobile Contact Info */}
          <div className="mt-12 block md:hidden px-4">
            <FaqContactInfo
              icon={`${SHOPIFY_CDN_BASE_URL}mail.webp`}
              title="Write to Us"
              content={contactInfo.email}
            />
            <Divider className="my-6" />
            <FaqContactInfo
              icon={`${SHOPIFY_CDN_BASE_URL}address.webp`}
              title="Mailing Address"
              content={contactInfo.company}
              subContent={contactInfo.address}
              cin={contactInfo.cin}
            />
            <Divider className="my-6" />
            <FaqContactInfo
              icon={`${SHOPIFY_CDN_BASE_URL}timings.webp`}
              title="Working Hours:"
              content={contactInfo.workingHours}
              subContent={contactInfo.workingDays}
            />
          </div>
        </Row>
      </div>
    </Layout>
  );
};

export default MainFaq;