const removeProductData = (gender) => {
    const maleData = [
        {
            product: "Hair Ras",
            effect: "Hair Ras helps reduce hair fall.",
        },
        {
            product: "Health Tatva",
            effect: "Health Tatva helps in boosting metabolism.",
        },
        {
            product: "Scalp Oil",
            effect: "Scalp Oil nurtures scalp health to support stronger hair.",
        },
        {
            product: "Gutt Shuddhi",
            effect: "Gutt Shuddhi supports digestion to help reduce hair fall.",
        },
        {
            product: "Gut Shuddhi",
            effect: "Gut Shuddhi supports digestion to help reduce hair fall.",
        },
        {
            product: "Digest Boost",
            effect: "Digest Boost supports digestion to help reduce hair fall.",
        },
        {
            product: "Nasal Grit",
            effect: "Nasal Ghrit promotes better sleep to help reduce hair fall.",
        },
        {
            product: "Nasal Drops",
            effect: "Nasal Drops promotes better sleep to help reduce hair fall.",
        },
        {
            product: "Thyro Santulan",
            effect: "Thyro Santulan helps reduce hair fall caused by thyroid issues.",
        },
        {
            product: "Iron Santulan",
            effect: "Iron Santulan helps reduce hair fall caused by anemia.",
        },
        {
            product: "Calm Ras",
            effect:
                "Calm Ras helps to reduce hairfall caused by stress and sleep issues.",
        },
        {
            product: "Minoxidil 5%",
            effect: "Minoxidil 5% promotes hair regrowth for thicker, fuller hair.",
        },
        {
            product: "Anti-dandruff Shampoo",
            effect: "Anti-Dandruff Shampoo fights dandruff to help reduce hair fall.",
        },
        {
            product: "Anti-dandruff Night Lotion",
            effect: "Night Lotion fights dandruff to help reduce hair fall.",
        },
        {
            product: "Defence Shampoo",
            effect: "Defence Shampoo ensures hair hygiene for a healthy scalp.",
        },
        {
            product: "Recap serum 30ml",
            effect: "Recap Serum supports hair regrowth for fuller, healthier hair.",
        },
        {
            product: "Hair vitamin with Biotin",
            effect:
                "Hair Vitamin addresses nutritional deficiency to reduce hair fall.",
        },
        {
            product: "Minoxidil 5% alc free",
            effect:
                "Minoxidil 5% alcohol free promotes hair regrowth for thicker, fuller hair.",
        },
        {
            product: "Minoxidil 5%, Alcohol-free",
            effect:
                "Minoxidil 5% alcohol free promotes hair regrowth for thicker, fuller hair.",
        },
        {
            product: "Minoxidil 2% alc free",
            effect:
                "Minoxidil 2% alcohol free promotes hair regrowth for thicker, fuller hair.",
        },
        {
            product: "Minoxidil 2%, Alcohol-free",
            effect:
                "Minoxidil 2% alcohol free promotes hair regrowth for thicker, fuller hair.",
        },
        {
            product: "Consti Clear for Improved Bowel Movement",
            effect: "Consti clear supports digestion to help reduce hair fall.",
        },
        {
            product: "Consti Clear",
            effect: "Consti clear supports digestion to help reduce hair fall.",
        },
        {
            product: "Digest boost for Improved Digestive Ability",
            effect: "Digest Boost supports digestion to help reduce hair fall.",
        },
        {
            product: "Ketoconazole 2% Night Lotion",
            effect: "Night Lotion fights dandruff to help reduce hair fall.",
        },
        {
            product: "Recap Serum",
            effect: "Recap Serum supports hair regrowth for fuller, healthier hair.",
        },
        {
            product: "Recap Serum 30ml",
            effect: "Recap Serum supports hair regrowth for fuller, healthier hair.",
        },
        {
            product: "Defence Shampoo 180ml",
            effect: "Defence Shampoo ensures hair hygiene for a healthy scalp.",
        },
        {
            product: "Defence Shampoo",
            effect: "Defence Shampoo ensures hair hygiene for a healthy scalp.",
        },
        {
            product: "Defence Conditioner",
            effect:
                "Defence conditioner improves hair quality by deeply moisturizing the hair strands",
        },
        {
            product: "Nourish hair oil",
            effect: "Nourish Oil deeply nourishes hair for strength and shine.",
        },
        {
            product: "Shine Leave-in Serum",
            effect: "Shine Serum enhances hair texture for a vibrant, healthy look.",
        },
        {
            product: "Kevon",
            effect: "Night Lotion fights dandruff to help reduce hair fall.",
        },
        {
            product: "Minoxidil 2%",
            effect: "Minoxidil 2% promotes hair regrowth for thicker, fuller hair.",
        },
        {
            product: "Scalp Oil",
            effect: "Scalp Oil nurtures scalp health to support stronger hair.",
        },
    ];
    const femaleData = [
        {
            product: "Her Santulan",
            effect: "Her Santulan supports daily wellness to maintain healthy hair.",
        },
        {
            product: "Mom Santulan for Postpartum hair",
            effect: "Mom Santulan helps reduce post-partum hair fall.",
        },
        {
            product: "Mom Santulan",
            effect: "Mom Santulan helps reduce post-partum hair fall.",
        },
        {
            product: "Iron Santulan",
            effect: "Iron Santulan helps reduce hair fall caused by anemia.",
        },
        {
            product: "PCOS Santulan",
            effect: "PCOS Santulan helps to reduce hair fall caused by PCOS.",
        },
        {
            product: "PCOS",
            effect: "PCOS Santulan helps to reduce hair fall caused by PCOS.",
        },
        {
            product: "Thyro Santulan",
            effect: "Thyro Santulan helps reduce hair fall caused by thyroid issues.",
        },
        {
            product: "Gut Shuddhi",
            effect: "Gut Shuddhi supports digestion to help reduce hair fall.",
        },
        {
            product: "Gutt Shuddhi",
            effect: "Gutt Shuddhi supports digestion to help reduce hair fall.",
        },
        {
            product: "Digest boost for Improved Digestive Ability",
            effect: "Digest Boost supports digestion to help reduce hair fall.",
        },
        {
            product: "Health Tatva",
            effect: "Health Tatva helps in boosting metabolism.",
        },
        {
            product: "Hair Vitamin for her",
            effect:
                "Hair Vitamin addresses nutritional deficiency to reduce hair fall.",
        },
        {
            product: "Calm Ras",
            effect: "Calm Ras helps to reduce hair fall caused by stress.",
        },
        {
            product: "Nasal Ghrit",
            effect: "Nasal Ghrit promotes better sleep to help reduce hair fall.",
        },
        {
            product: "Nasal Drops",
            effect: "Nasal Drops promotes better sleep to help reduce hair fall.",
        },
        {
            product: "Hair Ras",
            effect:
                "Hair Ras provides essential nourishment for stronger, healthier hair.",
        },
        {
            product: "Anti-Dandruff Shampoo",
            effect: "Anti-Dandruff Shampoo fights dandruff to help reduce hair fall.",
        },
        {
            product: "Anti dandruff shampoo",
            effect: "Anti-Dandruff Shampoo fights dandruff to help reduce hair fall.",
        },
        {
            product: "Recap Serum",
            effect: "Recap Serum supports hair regrowth for fuller, healthier hair.",
        },
        {
            product: "Recap Serum 30ml",
            effect: "Recap Serum supports hair regrowth for fuller, healthier hair.",
        },
        {
            product: "Minoxidil 2%",
            effect: "Minoxidil 2% promotes hair regrowth for thicker, fuller hair.",
        },
        {
            product: "Ketoconazole 2% night lotion",
            effect: "Night Lotion fights dandruff to help reduce hair fall.",
        },
        {
            product: "Kevon",
            effect: "Night Lotion fights dandruff to help reduce hair fall.",
        },
        {
            product: "Scalp Oil",
            effect: "Scalp Oil nurtures scalp health to support stronger hair.",
        },
        {
            product: "Nourish hair oil",
            effect: "Nourish Oil deeply nourishes hair for strength and shine.",
        },
        {
            product: "Shine Leave-in Serum",
            effect: "Shine Serum enhances hair texture for a vibrant, healthy look.",
        },
        {
            product: "Defence Shampoo 180ml",
            effect: "Defence Shampoo ensures hair hygiene for a healthy scalp.",
        },
        {
            product: "Defence Shampoo",
            effect: "Defence Shampoo ensures hair hygiene for a healthy scalp.",
        },
        {
            product: "Defence Conditioner",
            effect:
                "Defence conditioner improves hair quality by deeply moisturizing the hair strands",
        },
        {
            product: "Digest Boost",
            effect: "Digest Boost supports digestion to help reduce hair fall.",
        },
        {
            product: "Consti Clear for Improved Bowel Movement",
            effect: "Consti clear supports digestion to help reduce hair fall.",
        },
        {
            product: "Consti Clear",
            effect: "Consti clear supports digestion to help reduce hair fall.",
        },
        {
            product: "Digest boost for Improved Digestive Ability",
            effect: "Digest Boost supports digestion to help reduce hair fall.",
        },
        {
            product: "Nasal Grit",
            effect: "Nasal Ghrit promotes better sleep to help reduce hair fall.",
        },
        {
            product: "Minoxidil 5% alc free",
            effect:
                "Minoxidil 5% alcohol free promotes hair regrowth for thicker, fuller hair.",
        },
        {
            product: "Minoxidil 5%, Alcohol-free",
            effect:
                "Minoxidil 5% alcohol free promotes hair regrowth for thicker, fuller hair.",
        },
        {
            product: "Minoxidil 2% alc free",
            effect:
                "Minoxidil 2% alcohol free promotes hair regrowth for thicker, fuller hair.",
        },
        {
            product: "Minoxidil 2%, Alcohol-free",
            effect:
                "Minoxidil 2% alcohol free promotes hair regrowth for thicker, fuller hair.",
        },
    ];
    if (gender == "M") {
        return maleData;
    } else return femaleData;
};

export default removeProductData;
