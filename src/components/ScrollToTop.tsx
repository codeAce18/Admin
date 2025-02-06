import React, { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    // Cast the selected element to HTMLElement so we can access the `style` property
    const scrollToTop = document.querySelector(".scrollToTop") as HTMLElement;

    const handleScroll = () => {
      if (window.scrollY > 100) {
        scrollToTop.style.display = "flex";
      } else {
        scrollToTop.style.display = "none";
      }
    };

    const handleClick = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Adds smooth scroll to the top
      });
    };

    // Attach event listeners
    window.addEventListener('scroll', handleScroll);
    scrollToTop.addEventListener('click', handleClick);

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
      scrollToTop.removeEventListener('click', handleClick);
    };
  }, []); // The empty array ensures this runs only once when the component mounts

  return (
    <div className="scrollToTop bg-primary" style={{ display: "none" }}>
      <span className="arrow lh-1 ri-arrow-up-fill"><i className="ti ti-arrow-big-up ri-arrow-up-fill fs-16"></i></span>
    </div>
  );
};

export default ScrollToTop;
