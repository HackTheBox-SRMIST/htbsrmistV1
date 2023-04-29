import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);

   const handleMouseEnter = () => {
      setIsHover(true);
   };

   const handleMouseLeave = () => {
      setIsHover(false);
   };

  useEffect(() => {
    // Show the button when the user scrolls down 20px from the top of the document
    const toggleVisibility = () => {
      if (window.pageYOffset > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener when the component is unmounted
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Scroll to the top of the document when the button is clicked
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
        style={{
          position : "fixed",
          width: "50px",
          height: "50px",
          borderRadius: "4px",
          justifyContent: "center",
          alignItems: "center",
          bottom: "40px",
          right: "35px",
          fontSize: "28px",
          padding: "5px",
          border: "none",
          backgroundColor: isHover ?"rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.3)",
          color: 'rgb(159, 239, 0)',
          backdropFilter: "blur(4px)",
          cursor: "pointer",
          zIndex: "9999",
          boxShadow: isHover ?"0 0 10px rgb(159, 239, 0)" : "none"
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={scrollToTop}
        >
        ↑</button>
      )}
    </>
  );
};

export default ScrollToTopButton;
