import React from "react";
import IngredientsDetails from "@/components/ingredientsInfo/components/main";
import ingredientdData from '@/components/ingredientsInfo/data/data.json'


interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {

  const { slug } = params;
  const ingredientData = ingredientdData.find(ingredient => ingredient.slug === slug);
  return <IngredientsDetails data={ingredientData} />;
}

export default page;