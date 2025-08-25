import React from "react";

function MobileNav({ navLinks }) {
  return (
    <div className="absolute top-[calc(100%+10px)] w-full animate-in slide-in-from-bottom-80 lg:hidden">
      <div className="container rounded-md bg-popover shadow-md border">
        {navLinks.map((item, index) => (
          <p key={index}>{item.title}</p>
        ))}
      </div>
    </div>
  );
}

export default MobileNav;
