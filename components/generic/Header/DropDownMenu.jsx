const DropdownMenu = ({
    title,
    isOpen,
    onToggle,
    children,
    className = "",
    hasDropdown = true,
    anchorId
}) => {
    if (!hasDropdown) {
        return (
            <span className={`font-sophiaPro font-[400] text-[14px] leading-[140%] text-[#313233] hover:text-Primary/500 transition-colors ${className}`}>
                {title}
            </span>
        );
    }

    return (
        <div className={`relative ${className}`}>
            <button
                className="font-sophiaPro font-[400] text-[14px] leading-[140%] text-[#313233] flex items-center space-x-1 hover:text-Primary/500 transition-colors"
                onClick={onToggle}
                id={anchorId}
            >
                <span>{title}</span>
            </button>
            {children}
        </div>
    );
};

export default DropdownMenu;