const Loader = () => {
	const commonRingClasses = "absolute inset-0 rounded-full border-[1.04px]";

	return (
		<div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center min-h-full space-x-1 bg-gray-800 bg-opacity-10">
			<div className="relative md:w-[112px] w-[108px] md:h-[112px] h-[108px]">
				{/* Static gray ring */}
				<div
					className={commonRingClasses}
					style={{ borderColor: "#8CC5FA" }}
				></div>

				{/* Animated black ring */}
				<div
					className={`${commonRingClasses} animate-spin`}
					style={{
						borderColor: "#000000",
						borderTopColor: "#000000",
						borderRightColor: "transparent",
						borderBottomColor: "transparent",
						borderLeftColor: "transparent",
					}}
				></div>
			</div>
		</div>
	);
};

export default Loader;
