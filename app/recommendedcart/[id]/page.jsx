import RecommendedCart from "@/components/RecommendedCart/RecommendedCart";



export const metadata = {
    title: "Reorder your kit",
    description: "See your next month kit as recommended by doctor",
};

const page = async ({ searchParams, params }) => {


    return (
        <>

            <RecommendedCart searchParams={searchParams} params={params} />
        </>
    );
};

export default page;
