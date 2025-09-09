const VideoTestimonialsGrid = () => {
  const products = Array(4).fill({
    title: "ALL I NEED SUNSCREEN SPF...",
    price: "₹449.00",
    ingredients: "+ Kakadu Plum & Niacinamide",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616c-de3e4?w=400&h=600&fit=crop&crop=face",
  });

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-normal text-gray-900 mb-12 text-left">
          Lorem ipsum
        </h1>

        {/* Product Grid */}
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 hide-scrollbar">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 sm:flex-shrink min-w-[250px] sm:min-w-0 group"
            >
              {/* Product Image Container */}
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <div className="absolute inset-0 border-4 rounded-lg z-10 border-transparent"></div>

                <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay with ingredients */}
                  <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                    <div className="text-white">
                      <div className="text-sm font-medium leading-tight">
                        {product.ingredients}
                      </div>
                    </div>
                  </div>

                  {/* Product bottle at bottom */}
                  <div className="absolute -bottom-4 left-4 overflow-visible z-12">
                    <div className="w-8 h-12 bg-yellow-400 rounded-sm opacity-90"></div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide leading-tight">
                  {product.title}
                </h3>

                <div className="text-sm text-gray-700 font-medium">
                  {product.price}
                </div>

                <button className="w-full bg-Primary/500 text-white py-3 px-4 rounded-full font-medium text-sm transition-colors duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoTestimonialsGrid;
