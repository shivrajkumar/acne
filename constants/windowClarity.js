import Script from "next/script";

const windowClarity = () => {
  return <Script strategy="lazyOnload" src="/clarity.js" />;
};

export default windowClarity;
