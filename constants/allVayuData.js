import Doc1 from "@assets/images/Doc1.png";
import Doc2 from "@assets/images/Doc2.png";
import Doc3 from "@assets/images/Doc3.png";
import DocJulie from "@assets/images/DocJulie.png";
import SignatureOne from "@assets/images/Signature1.png";
import SignatureTwo from "@assets/images/Signature2.png";
import { CDN_BASE_URL } from "./constants";
// import drShailendra from "@assets/images/DrShailendera 1.png";
// import drHarish from "@assets/images/Dr Haarish 1.png";
// import drShefali from "@assets/images/Dr Shefali 1.png";
// import drSiddhi from "@assets/images/Dr Siddhi (1) 1.png";
// import drShriya from "@assets/images/Dr Shriya Shah (1) 1.png";
// import drKalyani from "@assets/images/Dr Kalyani 1.png";

export const doctorTestimonials = [
  {
    id: 1,
    name: "Dr. Julie Russak, M.D.",
    qualification: "FAAD Board-Certified Dermatologist",
    src: Doc1,
    description: `"Skincare should be personal, not generic. We've studied different skin types and built solutions that adapt to individual needs for better results."`,
  },
  {
    id: 2,
    name: "Dr. Julie Russak, M.D.",
    qualification: "FAAD Board-Certified Dermatologist",
    src: Doc2,
    description:
      "Our goal was to remove the guesswork from skincare. We wanted to target real skin concerns and deliver visible, lasting improvements.",
  },
  {
    id: 3,
    name: "Dr. Julie Russak, M.D.",
    qualification: "FAAD Board-Certified Dermatologist",
    src: Doc3,
    description:
      "Acne care needs science, not trends. At Vayu, we've tested and validated solutions that truly improve skin health.",
  },
];

export const doctorExpert = [
  {
    id: 1,
    name: "Dr Shailendra Chaubey",
    qualification: "Ayurvedic Practitioner",
    doctorImage: `${CDN_BASE_URL}website_images/vayu/experts_page/dr-shailendera.webp`,
    experince: "15 Years",
    patients: "50000+ Patients",
    description: `A qualified Ayurvedic Practitioner and Pancha Karma Consultant with 15+ years of experience, Dr Shailendra specialises in treating chronic skin conditions and promoting holistic skin health through Ayurveda.`,
  },
  {
    id: 2,
    name: "Dr Harish Balaji",
    qualification:
      "M.D Dermatologist and Hair Transplant surgeon from INDIA and also with ECFMG certification from USA",
    doctorImage: `${CDN_BASE_URL}website_images/vayu/experts_page/dr-haarish.webp`,
    experince: "13 Years",
    patients: "5000+ Patients",
    description: `A board-certified M.D. dermatologist and expert hair transplant surgeon, Dr Harish Balaji is known for his holistic, patient-first approach to acne care and overall skin health.`,
  },
  {
    id: 3,
    name: "Dr Shefali Saini",
    qualification: "MBBS, MD, MRCP SCE (UK) Hair Transplant Surgeon.",
    doctorImage: `${CDN_BASE_URL}website_images/vayu/experts_page/dr-shefali.webp`,
    experince: "11 Years",
    patients: "4000+ Patients",
    description: `Dr Shefali Saini is an expert in clinical dermatology, facial aesthetics, and advanced skin treatments. She specialises in the use of Biologics and personalised care for chronic skin conditions, including acne.`,
  },
  {
    id: 4,
    name: "Dr Siddhi Sonawane",
    qualification:
      "MBBS, MD (Dermatology, Venereology and Leprosy), Fellow (American Academy of Dermatology)",
    doctorImage: `${CDN_BASE_URL}website_images/vayu/experts_page/dr-Siddhi.webp`,
    experince: "9 Years",
    patients: "2000+ Patients",
    description: `Dr Siddhi Sonawane specialises in facial aesthetics, cosmetology, dermatosurgery, and core dermatology. She actively contributes to community dermatology outreach under NUHM, focusing on accessible skin health solutions.`,
  },
  {
    id: 6,
    name: "Dr Kalyani Deshmukh",
    qualification: "MBBS, MD (Dermatology)",
    doctorImage: `${CDN_BASE_URL}website_images/vayu/experts_page/dr-kalyani.webp`,
    experince: "3 Years",
    patients: "50000+ Patients",
    description: `"Dr Kalyani Deshmukh is a leading dermatologist with extensive hands-on experience in dermatological procedures. She has also authored five international research papers, bringing clinical expertise to personalised acne treatments.
"`,
  },
];

export const featureGridData = [
  {
    id: 1,
    title: "Dermatologist-  Approved Care",
    description: "Expert-approved skincare for safe, effective results",
    buttonText: "BOOK A CALL",
    imageSrc: `${CDN_BASE_URL}website_images/clear_rituals/experts_page/Feature-one.webp`,
    redirect: "book-a-call",
  },
  {
    id: 2,
    title: "AI Powered Skin Analysis",
    description: "AI-driven analysis for personalized skincare",
    buttonText: "TAKE THE SKIN TEST",
    imageSrc: `${CDN_BASE_URL}website_images/clear_rituals/experts_page/Feature-two.webp`,
    redirect: "/skin-test",
  },
  {
    id: 3,
    title: "Clinically Proven Ingredients",
    description: "Safe & tested ingredients for your skin types",
    imageSrc: `${CDN_BASE_URL}website_images/clear_rituals/experts_page/Feature-three.webp`,
  },
  {
    id: 4,
    title: "Track Your Skin’s Progress",
    description: "Monitor changes and see real improvements.",
    buttonText: "SEE MORE REVIEWS",
    imageSrc: "/progress.png",
    redirect: "/reviews",
  },
];

export const listOfProblems = [
  {
    id: 1,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/black_heads.webp`,
    alt: "black_heads",
    title: "Blackheads",
    description: "",
  },
  {
    id: 2,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/white_heads.webp`,
    alt: "white_heads",
    title: "Whiteheads",
    description: "",
  },
  {
    id: 3,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/small_bumps.webp`,
    alt: "small_bumps",
    title: "Small Bumps",
    description: "",
  },
  {
    id: 4,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/pus_filled_pimples.webp`,
    alt: "pus_filled_pimples",
    title: "Pus Filled Pimples",
    description: "",
  },
  {
    id: 5,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/big_boils.webp`,
    alt: "big_boils",
    title: "Big Boils",
    description: "",
  },
];

export const doctorsTeam = [
  {
    id: 1,
    name: "Dr. Julie Russak, M.D.",
    designation: "FAAD Board-Certified Dermatologist",
    patients: "Over 10000+ patients",
    quote:
      "Nutrafol is a necessary part of my hair growth protocol since I have personally seen the positive impact it can have on the hair health of my clients.",
    image: DocJulie,
  },
  {
    id: 2,
    name: "Dr. Julie Russak, M.D.",
    designation: "FAAD Board-Certified Dermatologist",
    patients: "Over 10000+ patients",
    quote:
      "Nutrafol is a necessary part of my hair growth protocol since I have personally seen the positive impact it can have on the hair health of my clients.",
    image: DocJulie,
  },
  {
    id: 3,
    name: "Dr. Julie Russak, M.D.",
    designation: "FAAD Board-Certified Dermatologist",
    patients: "Over 10000+ patients",
    quote:
      "Nutrafol is a necessary part of my hair growth protocol since I have personally seen the positive impact it can have on the hair health of my clients.",
    image: DocJulie,
  },
  {
    id: 4,
    name: "Dr. Julie Russak, M.D.",
    designation: "FAAD Board-Certified Dermatologist",
    patients: "Over 10000+ patients",
    quote:
      "Nutrafol is a necessary part of my hair growth protocol since I have personally seen the positive impact it can have on the hair health of my clients.",
    image: DocJulie,
  },
  {
    id: 5,
    name: "Dr. Julie Russak, M.D.",
    designation: "FAAD Board-Certified Dermatologist",
    patients: "Over 10000+ patients",
    quote:
      "Nutrafol is a necessary part of my hair growth protocol since I have personally seen the positive impact it can have on the hair health of my clients.",
    image: DocJulie,
  },
  {
    id: 6,
    name: "Dr. Julie Russak, M.D.",
    designation: "FAAD Board-Certified Dermatologist",
    patients: "Over 10000+ patients",
    quote:
      "Nutrafol is a necessary part of my hair growth protocol since I have personally seen the positive impact it can have on the hair health of my clients.",
    image: DocJulie,
  },
  {
    id: 4,
    name: "Dr. Julie Russak, M.D.",
    designation: "FAAD Board-Certified Dermatologist",
    patients: "Over 10000+ patients",
    quote:
      "Nutrafol is a necessary part of my hair growth protocol since I have personally seen the positive impact it can have on the hair health of my clients.",
    image: DocJulie,
  },
  {
    id: 5,
    name: "Dr. Julie Russak, M.D.",
    designation: "FAAD Board-Certified Dermatologist",
    patients: "Over 10000+ patients",
    quote:
      "Nutrafol is a necessary part of my hair growth protocol since I have personally seen the positive impact it can have on the hair health of my clients.",
    image: DocJulie,
  },
  {
    id: 6,
    name: "Dr. Julie Russak, M.D.",
    designation: "FAAD Board-Certified Dermatologist",
    patients: "Over 10000+ patients",
    quote:
      "Nutrafol is a necessary part of my hair growth protocol since I have personally seen the positive impact it can have on the hair health of my clients.",
    image: DocJulie,
  },
];

export const resultsAndTestimonials = {
  roshniSinha: {
    id: 1,
    src: `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/roshni_sinha.webp`,
    alt: "Roshni Sinha",
    title: "Roshni Sinha",
    city: "Mumbai",
    date: "12 June 2023",
    rating: `${CDN_BASE_URL}website_images/vayu_images/rating_05.webp`,
    description:
      "The treatment plan suggested by VayuSkin is exclusive to the individual filling the skin test, based on the test's results. The same treatment plan isn’t recommended to another individual. Significant improvements in skin health can be seen in 4-8 weeks based, for most of the problems.",
  },
  samreenAnsari: {
    id: 2,
    src: `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/samreen_ansari.webp`,
    alt: "Samreen Ansari",
    title: "Samreen Ansari",
    city: "Mumbai",
    date: "24 August 2023",
    rating: `${CDN_BASE_URL}website_images/vayu_images/rating_05.webp`,
    description:
      "VayuSkin is a game-changer! With its personalized approach to skincare, I've seen remarkable improvements in my skin health. The weekly expert advice via 1:1 calls with an experienced dermatologist makes it a must-have for anyone looking to elevate their beauty routine.",
  },
  ananyaSharma: {
    id: 3,
    src: `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/ananya_sharma.webp`,
    alt: "Ananya Sharma",
    title: "Ananya Sharma",
    city: "Delhi",
    date: "17 Jan 2024",
    rating: `${CDN_BASE_URL}website_images/vayu_images/rating_45.webp`,
    description:
      "VayuSkin's personalized recommendations and expert guidance have helped me achieve healthier skin. The convenience of accessing professional advice from the comfort of my home makes it a standout in the world of skincare apps. Highly recommended!",
  },
  swatiGoswami: {
    id: 4,
    src: `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/swati_goswami12.webp`,
    alt: "Swati Goswami",
    title: "Swati Goswami",
    city: "Bangalore",
    date: "28 Feb 2024",
    rating: `${CDN_BASE_URL}website_images/vayu_images/rating_05.webp`,
    description:
      "VayuSkin app is excellent. With its personalized approach to skincare, I have seen remarkable improvements in my skin quality. Highly recommended to everyone for getting best solution for skin",
  },
};

export const reviewTestimonials = [
  {
    name: "Priya, Mumbai",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg1.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg1.webp`,
    // "location": "",
    quote:
      "Life-changing routine! After years of battling acne, Clear Ritual finally cleared my skin. It’s gentle yet so effective—my skin feels healthier and looks better than ever.",
    helped_solve: [
      "Acne Marks",
      "Oily Skin",
      "Pigmentation",
      "Inflammatory Acne",
    ],
  },
  {
    name: "Aditi, Gujrat",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg2.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg2.webp`,
    // "location": "",
    quote:
      "Visible results in just two weeks! My skin feels smoother, dark spots have faded, and I’m definitely sticking with Clear Ritual for my skincare journey.",
    helped_solve: [
      "Irritation",
      "Acne Marks",
      "Normal Skin",
      "Redness",
      "Irritation",
    ],
  },
  {
    name: "Riya, Delhi",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg3.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg3.webp`,
    // "location": "",
    quote:
      "Pure magic! My sensitive skin finally found the perfect match. No irritation, just glowing, happy skin. Highly recommend!",
    helped_solve: ["Cystic Acne", "Acne Marks", "Oily Skin", "Hormonal Acne"],
  },
  {
    name: "Naina, Mumbai",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg4.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg4.webp`,
    // "location": "",
    quote:
      "I used to feel tiny bumps under my skin every time I touched my face. Clear Ritual cleared them, and my skin feels smooth for the very first time!",
    helped_solve: [
      "Tiny Bumps",
      "Skin Texture",
      "Dry Skin",
      "Uneven Skin Texture",
    ],
  },
  {
    name: "Rohan, Delhi",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg5.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg5.webp`,
    // "location": "",
    quote:
      "I had deep acne marks that wouldn’t fade. Clear Ritual helped lighten them, and now my skin tone looks more even and healthy.",
    helped_solve: ["Dark Spots", "Acne Scars", "Normal Skin", "Pigmentation"],
  },
  {
    name: "Piya, Gujrat",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg6.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg6.webp`,
    // "location": "",
    quote:
      "I had painful, red pimples that never seemed to go away. After using Clear Ritual, my breakouts reduced, and my skin feels calmer and smoother.",
    helped_solve: [
      "Inflammatory Acne",
      "Painful Pimples",
      "Oily Skin",
      "Uneven Skin Texture",
    ],
  },
  // {
  //   name: "Muskaan, Mumbai",
  //   beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg3.webp`,
  //   afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg3.webp`,
  //   // "location": "",
  //   quote:
  //     "Pimples kept coming back in the same spots. Clear Ritual broke the cycle, and now my skin stays clearer for longer. Finally, some peace of mind!",
  //   helped_solve: ["Hormonal Acne", "Redness", "Oily Skin", "Irritation"],
  // },
  {
    name: "Anushka, Ludhiana",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg8.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg8.webp`,
    // "location": "",
    quote:
      "I struggled with small, pus-filled pimples that always left marks. Clear Ritual’s routine helped control new breakouts and even out my skin tone beautifully.",
    helped_solve: [
      "Pus-filled Pimples",
      "Cheek Acne",
      "Oily Skin",
      "Post Inflammatory Marks",
    ],
  },
  {
    name: "Ankit, Bangalore",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg7.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg7.webp`,
    // "location": "",
    quote:
      "My nose and forehead were covered with blackheads and spots. After using Clear Ritual, my skin feels clean, fresh, and my pores look visibly smaller.",
    helped_solve: [
      "Open Pores",
      "Blackheads",
      "Dark Spots",
      "Combination Skin",
    ],
  },
];

export const MorereviewTestimonials = [
  {
    src: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/shobita.webp`,
    name: "Shobita",
    location: "Mumbai",
    date: "25 Jan, 2025",
    rating: 4.8,
    review:
      "Painful pimples and red marks were constant problems. With Clear Ritual, my acne reduced a lot, my skin feels even, and best of all, it no longer feels sensitive!",
  },
  {
    name: "Tanvi",
    location: "Bangalore",
    date: "12 Dec, 2024",
    rating: 4.4,
    review:
      "My T-zone was always shiny, and makeup never stayed. Clear Ritual balanced my skin’s oil, and now I barely need blotting paper—my makeup lasts all day!",
  },
  {
    src: ``,
    name: "Megha",
    location: "Bangalore",
    date: "23 Nov, 2024",
    rating: 5.0,
    review:
      "Excess oil and blackheads were my biggest frustrations. Clear Ritual helped reduce the oil, shrink my pores, and my skin now feels fresh and less greasy.",
  },
  {
    name: "Amit",
    location: "Delhi",
    date: "15 Feb, 2025",
    rating: 4.5,
    review:
      "Blackheads and oily skin were always a battle. Thanks to Clear Ritual, my nose looks clearer, pores are tighter, and my skin stays matte throughout the day.",
  },
  {
    name: "Namrita",
    location: "Pune",
    date: "22 Feb, 2025",
    rating: 4.5,
    review:
      "Tiny bumps on my forehead and nose wouldn’t go away. Clear Ritual’s routine transformed my skin texture—it’s smoother, less oily, and finally manageable.",
  },
  {
    src: ``,
    name: "Neha",
    location: "Jaipur",
    date: "01 March, 2025",
    rating: 4.3,
    review:
      "Hormonal acne made me feel so frustrated because it was painful and kept coming back in the same places. I would get deep pimples on my cheeks that took weeks to go away. After using Vayu, my breakouts have become much smaller and don’t last as long. My skin feels healthier, and I finally feel like I have control over my acne.",
  },
  {
    name: "Arjun",
    location: "Chandigarh",
    date: "13 March, 2025",
    rating: 4.5,
    review:
      "Acne marks were my biggest insecurity. With Clear Ritual, the pigmentation faded a lot, and my skin looks even-toned and cleaner. Big confidence boost!",
  },
  {
    src: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg2.webp`,
    src2: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg2.webp`,
    name: "Mansi",
    location: "Lucknow",
    date: "17 Jan, 2025",
    rating: 4.9,
    review:
      "Breakouts on my cheeks and jawline always bothered me. After using Clear Ritual, my acne’s almost gone, my skin feels calm, and I feel great about it!",
  },
  {
    name: "Kunal",
    location: "Ahmedabad",
    date: "06 Oct, 2024",
    rating: 4.8,
    review:
      "Spicy food always triggered my breakouts. Clear Ritual balanced my skin from the inside, and now I rarely get pimples. My face feels under control again!",
  },
  {
    name: "Simran",
    location: "Hyderabad",
    date: "18 March, 2025",
    rating: 4.6,
    review:
      "Painful cystic acne and stubborn scars exhausted me. Clear Ritual reduced my breakouts, sped up healing, and my skin finally looks and feels healthier.",
  },
  {
    name: "Sakshi",
    location: "Surat",
    date: "28 Jan, 2025",
    rating: 4.7,
    review:
      "Other treatments dried my skin out completely. Clear Ritual cleared my breakouts without stripping moisture—now my face feels soft, hydrated, and breakout-free!",
  },
];

export const howItWorks = [
  {
    id: 1,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/take_the_skin_test.webp`,
    alt: "take_the_skin_test",
    title: "Take the Skin Test",
    description: "Get expert insights into your skin type and acne triggers.",
  },
  {
    id: 2,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/clear_ritual_kit.webp`,
    alt: "buy_you_kit",
    title: "Order Your Personalised Kit",
    description:
      "Dermatologist-recommended skincare, designed for your skin’s needs.",
  },
  {
    id: 3,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/talk_to_expert.webp`,
    alt: "talk_to_expert",
    title: "Expert Support On-Demand",
    description:
      "Connect with our skin specialists whenever you need guidance.",
  },
];

export const ourInHouseDoctors = {
  siddhiSonawane: {
    id: 1,
    src: `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/dr_siddhi_sonawane.webp`,
    alt: "Dr. Siddhi Sonawane",
    title: "Dr. Siddhi Sonawane",
    designation: "M.B.B.S, MD (Dermatology)",
  },
  aarushiMittal: {
    id: 3,
    src: `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/dr_aarushi_mittal.webp`,
    alt: "Dr. Aarushi Mittal",
    title: "Dr. Aarushi Mittal",
    designation: "M.B.B.S, MD (Dermatology)",
  },
  dhwaniSaxena: {
    id: 2,
    src: `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/dr_dhwani_saxena.webp`,
    alt: "Dr. Dhwani Saxena",
    title: "Dr. Dhwani Saxena",
    designation: "M.B.B.S, MD (Dermatology)",
  },
  drShreya: {
    id: 4,
    src: `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/dr_shreya.webp`,
    alt: "Dr. Shreya Deoghare",
    title: "Dr. Shreya Deoghare",
    designation: "M.B.B.S, MD(Dermatology)",
  },
};

export const safeAndScintific = [
  {
    id: 1,
    src: `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/vegan_friendly.webp`,
    alt: "Vegan friendly",
    name: "Vegan friendly",
  },
  {
    id: 2,
    src: `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/harbal.webp`,
    alt: "100% herbal",
    name: "100% herbal",
  },
  {
    id: 3,
    src: `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/no_side_effects.webp`,
    alt: "No side effects",
    name: "No side effects",
  },
  {
    id: 4,
    src: `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/doctor_recommended.webp`,
    alt: "Doctor Recommended",
    name: "Doctor Recommended",
  },
  {
    id: 5,
    src: `${CDN_BASE_URL}website_images/vayu/vayu_skin_2/dermatology_tested.webp`,
    alt: "Dermatologically tested",
    name: "Dermatologically tested",
  },
];

export const rootCauses = [
  {
    id: 1,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/stress.webp`,
    alt: "Stress",
    name: "Stress",
    description:
      "Stress disrupts hormonal balance, increasing oil production and inflammation, which causes acne flare-ups.",
  },
  {
    id: 2,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/diet.webp`,
    alt: "Diet",
    name: "Diet",
    description:
      "Unhealthy diet choices spike inflammation and oil production, making acne worse",
  },
  {
    id: 3,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/tired_liver.webp`,
    alt: "Tired Liver",
    name: "Tired Liver",
    description:
      "When your liver slows down, toxins build up in the body and surface as stubborn breakouts",
  },
  {
    id: 4,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/toxins.webp`,
    alt: "Toxins",
    name: "Toxins",
    description:
      "Excess toxins in the body clog pores and fuel acne-causing inflammation",
  },
  {
    id: 5,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/hormonal_imbalance.webp`,
    alt: "Hormonal Imbalance",
    name: "Hormonal Imbalance",
    description:
      "Hormonal imbalances increase oil production and clog pores, causing persistent acne.",
  },
  {
    id: 6,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/gut_unhappy.webp`,
    alt: "Unhappy Gut",
    name: "Unhappy Gut",
    description:
      "Poor gut health disturbs internal balance, triggering inflammation and acne breakouts",
  },
];

export const skincareIngredients = [
  {
    id: 1,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/lactic_acid.webp`,
    alt: "Lactic Acid",
    name: "Lactic Acid",
    description:
      "Gently exfoliates dead skin cells and deeply hydrates to enhance skin texture and smoothness",
  },
  {
    id: 2,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/salicylic_acid.webp`,
    alt: "Salicylic Acid",
    name: "Salicylic Acid",
    description:
      "Unclogs pores and prevents future breakouts for visibly clearer skin",
  },
  {
    id: 3,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/jojoba_oil.webp`,
    alt: "Jojoba Oil",
    name: "Jojoba Oil",
    description:
      "Regulates excess oil and calms skin inflammation to reduce acne flare-ups",
  },
  {
    id: 4,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/niacinamide.webp`,
    alt: "Niacinamide",
    name: "Niacinamide",
    description:
      "Minimises redness, reinforces the skin’s natural barrier, and balances oil production",
  },
  {
    id: 5,
    src: `${CDN_BASE_URL}website_images/clear_rituals/landingPage/azelaic_acid.webp`,
    alt: "Azelaic Acid",
    name: "Azelaic Acid",
    description:
      "Targets acne-causing bacteria and promotes a more even, healthy-looking skin tone",
  },
];

export const testimonials = [
  {
    name: "Priya, Mumbai",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg1.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg1.webp`,
    // "location": "",
    quote:
      "Life-changing routine! After years of battling acne, Clear Ritual finally cleared my skin. It’s gentle yet so effective—my skin feels healthier and looks better than ever.",
  },
  {
    name: "Aditi, Gujrat",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg2.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg2.webp`,
    // "location": "",
    quote:
      "Visible results in just two weeks! My skin feels smoother, dark spots have faded, and I’m definitely sticking with Clear Ritual for my skincare journey.",
  },
  {
    name: "Riya, Delhi",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg3.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg3.webp`,
    // "location": "",
    quote:
      "Pure magic! My sensitive skin finally found the perfect match. No irritation, just glowing, happy skin. Highly recommend!",
    helped_solve: ["Cystic Acne", "Acne Marks", "Oily Skin", "Hormonal Acne"],
  },
  {
    name: "Naina, Mumbai",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg4.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg4.webp`,
    // "location": "",
    quote:
      "I used to feel tiny bumps under my skin every time I touched my face. Clear Ritual cleared them, and my skin feels smooth for the very first time!",
  },
  {
    name: "Rohan, Delhi",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg5.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg5.webp`,
    // "location": "",
    quote:
      "I had deep acne marks that wouldn’t fade. Clear Ritual helped lighten them, and now my skin tone looks more even and healthy.",
  },
  {
    name: "Piya, Gujrat",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg6.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg6.webp`,
    // "location": "",
    quote:
      "I had painful, red pimples that never seemed to go away. After using Clear Ritual, my breakouts reduced, and my skin feels calmer and smoother.",
  },
  // {
  //   name: "Muskaan, Mumbai",
  //   beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg3.webp`,
  //   afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg3.webp`,
  //   // "location": "",
  //   quote:
  //     "Pimples kept coming back in the same spots. Clear Ritual broke the cycle, and now my skin stays clearer for longer. Finally, some peace of mind!",
  // },
  {
    name: "Anushka, Ludhiana",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg8.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg8.webp`,
    // "location": "",
    quote:
      "I struggled with small, pus-filled pimples that always left marks. Clear Ritual’s routine helped control new breakouts and even out my skin tone beautifully.",
  },
  {
    name: "Ankit, Bangalore",
    beforeImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/beforeImg7.webp`,
    afterImg: `${CDN_BASE_URL}website_images/clear_rituals/reviewPage/afterImg7.webp`,
    // "location": "",
    quote:
      "My nose and forehead were covered with blackheads and spots. After using Clear Ritual, my skin feels clean, fresh, and my pores look visibly smaller.",
  },
];

export const FAQHomePage = [
  {
    question: "How does the skin test work?",
    answer:
      "Our proprietary algorithm, developed in collaboration with leading dermatologists and powered by advanced AI, analyses both external skin concerns—like acne, oiliness, dryness, and sensitivity—and internal factors such as hormonal changes, stress levels, and lifestyle habits. By mapping these insights, our intelligent system detects patterns and places you into precise skin profiles. With every test completed, the algorithm becomes smarter, continuously refining its accuracy to deliver better, research-backed, personalised skincare recommendations. This means your acne treatment plan evolves with your skin, ensuring you get solutions that are tailored to your skin’s changing needs over time.",
  },
  {
    question: "Are the products safe for sensitive skin?",
    answer:
      "Absolutely. Safety is at the heart of everything we do at Clear Ritual. Each product in your personalised acne treatment plan is dermatologically tested, hypoallergenic, and formulated to be gentle on even the most sensitive skin types. We steer clear of harsh chemicals and potential irritants that could compromise your skin barrier or cause redness. Our dermatologist-approved ingredients are selected to work in harmony with your skin, ensuring effective results without risking irritation or long-term damage.",
  },
  {
    question: "What makes us different from other skincare brands?",
    answer:
      " Clear Ritual is not a one-size-fits-all solution. Unlike mass-market brands that promote generic routines, we harness real data through our proprietary AI model, co-created with dermatologists, to design truly personalised acne solutions. Each recommendation is grounded in science, informed by real user data, and refined constantly to meet your evolving skin needs. If something in your regimen isn’t delivering results, our system adjusts proactively — because we believe your skincare should adapt to you, not the other way around.",
  },
  {
    question: "How long before I see results?",
    answer:
      "Most Clear Ritual users notice visible improvements within 3 to 4 weeks of starting their personalised regimen. However, achieving clear, healthy skin is a progressive journey. That’s why we recommend retaking the skin test at the start of each month. Regular updates allow our AI model to learn from your skin’s progress, fine-tuning your routine to ensure consistent, long-term results. Remember, lasting skin health is built over time — and we’re with you at every step.",
  },
  {
    question: "Will this routine help with my acne?",
    answer:
      "Yes, and we have the research to back it up. Acne is multifaceted, which is why our AI-powered model and dermatologist-designed system classify your acne into specific types: hormonal acne, bacterial acne, fungal acne, and cystic acne. Based on your skin profile, we recommend targeted solutions that address your acne’s root cause and severity. We go beyond offering products — we build a structured, adaptive acne treatment plan designed for sustainable, long-term results.",
  },
  {
    question: "When should I be concerned about my acne?",
    answer:
      "If your acne is painful, causing deep scars, or not improving with personalised treatments, seeing a dermatologist directly is advisable. However, even mild acne benefits from proactive care. Our advanced skin test helps detect early warning signs and recommends preventive routines before acne worsens. Early intervention is crucial — because preventing acne is always easier than treating advanced breakouts. With Clear Ritual, you get proactive support for healthier, clearer skin every step of the way.",
  },
];

export const FAQResultPage = [
  {
    question: "Why was this regimen recommended for me?",
    answer:
      "Each product in your regimen is carefully mapped to your skin's current condition and how it is expected to evolve. We analyze your skin concerns, lifestyle, and internal factors to recommend a combination of products that work together, rather than in isolation. The ingredients in each product are also mapped to each other to ensure they complement one another, creating a routine that supports your skin holistically rather than through standalone treatments.",
  },
  {
    question: "Do I need all these products?",
    answer:
      "Yes, our recommendations are designed as a complete system where each product plays a crucial role in cleansing, treating, protecting your skin, and supporting your overall skin health. This regimen is carefully curated to ensure that every step enhances the next, creating a seamless and effective skincare routine. Using the full kit delivers stronger, more consistent results than individual products used in isolation. We strongly believe in this kit because it has been carefully tested, refined, and mapped to work as a cohesive solution. Each product in the kit complements the others, ensuring they don't just work individually but amplify each other's effects. We stand by this kit because we have seen the difference it makes—delivering targeted, long-term results that single products alone cannot achieve.",
  },
  {
    question: "Can I combine these products with my current skincare routine?",
    answer:
      "While our recommended products are safe and effective, it's always best to book a call with our doctors and skin experts before mixing them with your existing routine— to ensure that your routine is optimized for your skin without ingredient conflicts.",
  },
  {
    question: "What should I do if I experience irritation or a reaction?",
    answer:
      "If you experience irritation, reduce the frequency of use—try applying the product every other day instead of daily. If your skin still reacts, pause its use and monitor for improvement. Applying a moisturizer before active treatments can help reduce sensitivity. If irritation persists, reach out to our team, and we'll help you adjust your regimen accordingly. We also recommend patch-testing new products before applying them to your entire face.",
  },
  {
    question: "How long should I follow this regimen before making changes?",
    answer:
      "Skincare takes time, and visible improvements usually appear within three to four weeks. However, because your skin evolves, we update our recommendations to match your changing needs. We encourage you to retake the skin test or check in with our experts every month so we can refine your regimen based on your skin's progress.",
  },
  {
    question:
      "Will this regimen work for my acne, dark spots, or other skin concerns?",
    answer:
      "Yes, our approach addresses not just your immediate skin concerns but also their root causes and long-term effects. For acne, we focus on treating active breakouts, reducing post-acne marks, and strengthening your skin barrier to prevent future breakouts. Our recommendations evolve monthly, ensuring your regimen adapts as your skin improves. We are with you throughout your skincare journey to continuously optimize your routine.",
  },
];

export const prescriptionData = {
  clinic: {
    primaryDoctor: {
      name: "Dr. Shailendra Chaubey",
      qualification: "BAMS, Ayurveda",
      registrationLabel: "Medical Registration No.",
      registrationNumber: "I-53420-A",
      signature: SignatureOne,
    },
    secondaryDoctor: {
      name: "Dr. Divya Poulose",
      qualification: "M.B.B.S, MD (Dermatology)",
      registrationLabel: "MMC:",
      registrationNumber: "2022/087496",
      signature: SignatureTwo,
    },
  },
  patient: {
    name: "Jigrnet Choral",
    age: 32,
    gender: "Male",
    date: "18 May, 2025",
    diagnosisType: "Skin Diagnosis",
    diagnosis: "Mild Acne",
  },
  prescription: {
    header: "Medicine",
    medicines: [
      {
        id: 1,
        name: "Rohglow Facewash",
        instructions:
          "Apply a pea-sized amount to damp skin, massage gently for 30-40 seconds, then rinse and pat dry.",
        timing: "AM - PM",
      },
      {
        id: 2,
        name: "Aquasoft Moisturizing Lotion",
        instructions: "Apply evenly on clean skin and let it absorb fully.",
        timing: "AM - PM",
      },
      {
        id: 3,
        name: "Aziderm 10% Gel",
        instructions:
          "Apply a thin layer only on acne-prone areas; avoid rubbing.",
        timing: "PM",
      },
      {
        id: 4,
        name: "La Shield",
        instructions:
          "Apply generously after moisturizer and reapply every 2-3 hours if outdoors.",
        timing: "AM",
      },
      {
        id: 5,
        name: "Baidyanath Guduchi",
        instructions: "Take the tablets after meals.",
        dosage: "Dosage: 1 Tablet a Day",
      },
    ],
  },
  treatment: {
    title: "Treatment Duration",
    description:
      "Recommended for 4 weeks of regular usage in order to see results",
  },
};

export const faqDataHelpPage = {
  products: [
    {
      question: "Question XYZ",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Question XYZ",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Question XYZ",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Question XYZ",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Question XYZ",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Question XYZ",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ],
  shipping: [
    {
      question: "Question XYZ",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Question XYZ",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Question XYZ",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Question XYZ",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ],
  orders: [
    {
      question: "Question XYZ",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Question XYZ",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ],
  returns: [
    {
      question: "Question XYZ",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Question XYZ",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ],
  contact: [
    {
      question: "Question XYZ",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ],
};
// {
//   id: 6,
//   src: `${CDN_BASE_URL}website_images/vayu_images/open_pores.webp`,
//   alt: "open_pores",
//   title: "Open pores",
// subTitle:"",
//   description: "Visible tiny holes on the facial skin's surface",
// },
// {
//   id: 7,
//   src: `${CDN_BASE_URL}website_images/vayu_images/dark_circles.webp`,
//   alt: "dark_circles",
//   title: "Dark circles",
// subTitle:"",
//   description: "Blackish or brownish skin tone under the eyes",
// },
// {
//   id: 8,
//   src: `${CDN_BASE_URL}website_images/vayu_images/eczema.webp`,
//   alt: "eczema",
//   title: "Eczema",
// subTitle:"",
//   description: "Red, itchy, and inflamed skin patches",
// },
// {
//   id: 9,
//   src: `${CDN_BASE_URL}website_images/vayu_images/psoriasis.webp`,
//   alt: "psoriasis",
//   title: "Psoriasis",
// subTitle:"",
//   description: "Red, scaly patches on the skin",
// },
// {
//   id: 10,
//   src: `${CDN_BASE_URL}website_images/vayu_images/urticaria.webp`,
//   alt: "urticaria",
//   title: "Urticaria",
// subTitle:"",
//   description: "Raised, itchy welts or hives on the skin",
// },
