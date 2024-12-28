import React, { useState, useEffect } from "react";

const IconComponent = ({ tabindex, onClick, tweetId, tweetLinkElement, defaultClickedState = false }) => {
  const isHomepage = window.location.pathname === "/home" || /^[\/][a-zA-Z0-9_-]+$/.test(window.location.pathname);
  const isStatusPage = window.location.pathname.includes("/status");

  const [isClicked, setIsClicked] = useState(defaultClickedState); // Persist click state
  const [isHovered, setIsHovered] = useState(false); // Track hover state
 

  const hoverColor = "#58a6ff";
  const defaultColor = "#71767B";

  const homepageTabZeroStyles = {
    marginLeft: "5px",
    marginTop: "5px",
    marginBottom: "5px",
    color: defaultColor,
    cursor: "pointer",
  };

  const homepageTabOneStyles = {
    marginLeft: "24px",
    marginTop: "13px",
    marginBottom: "10px",
    color: defaultColor,
    cursor: "pointer",
  };

  const statusPageTabZeroStyles = {
    marginLeft: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    color: defaultColor,
    cursor: "pointer",
  };

  const statusPageTabOneStyles = {
    marginLeft: "20px",
    marginTop: "17px",
    marginBottom: "10px",
    color: defaultColor,
    cursor: "pointer",
  };

  const [currentStyles, setCurrentStyles] = useState(
    isHomepage
      ? homepageTabZeroStyles
      : isStatusPage
      ? statusPageTabZeroStyles
      : {} // Default if not homepage or status page
  );

  useEffect(() => {
    if (isHomepage) {
      if (tabindex === 0) {
        setCurrentStyles(homepageTabOneStyles);
      } else if (tabindex === -1) {
        setCurrentStyles(homepageTabZeroStyles);
      }
    } else if (isStatusPage) {
      if (tabindex === 0) {
        setCurrentStyles(statusPageTabOneStyles);
      } else if (tabindex === -1) {
        setCurrentStyles(statusPageTabZeroStyles);
      }
    }
  }, [tabindex, isHomepage, isStatusPage]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

 
  const handleClick = () => {
    const newClickedState = !isClicked;
    setIsClicked(newClickedState);

    onClick(tweetId, newClickedState);

    const tweetObj = {
      id: tweetId.split("/").pop(),
      username: tweetId.split("/")[3],
      tweetLink: tweetId,
    };

    console.log(tweetObj)
 
    //POST 

  // OR CHECK IF IT EXISTS AND DELETE



  };

 

  const iconStyles = {
    ...currentStyles,
    color: isClicked ? hoverColor : isHovered ? hoverColor : defaultColor,
    borderRadius: "50%",
    transition: "color 0.3s ease, transform 0.3s ease",
  };





  return (
    <button
      style={{
        backgroundColor: "transparent",
        backgroundRepeat: "no-repeat",
        border: "none",
        cursor: "pointer",
        overflow: "hidden",
        outline: "none",
      }}
      onClick={handleClick}
      tabIndex={tabindex}
    >
      <div style={{ width: "50px" }}>
        <div
          className="icon-wrapper"
          style={iconStyles}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="17"
            height="17"
            fill="currentColor"
          >
            <path d="M8.048 2.241c.964-.709 2.079-1.238 3.325-1.241a4.616 4.616 0 0 1 3.282 1.355c.41.408.757.86.996 1.428.238.568.348 1.206.347 1.968 0 2.193-1.505 4.254-3.081 5.862-1.496 1.526-3.213 2.796-4.249 3.563l-.22.163a.749.749 0 0 1-.895 0l-.221-.163c-1.036-.767-2.753-2.037-4.249-3.563C1.51 10.008.007 7.952.002 5.762a4.614 4.614 0 0 1 1.353-3.407C3.123.585 6.223.537 8.048 2.24Zm-1.153.983c-1.25-1.033-3.321-.967-4.48.191a3.115 3.115 0 0 0-.913 2.335c0 1.556 1.109 3.24 2.652 4.813C5.463 11.898 6.96 13.032 8 13.805c.353-.262.758-.565 1.191-.905l-1.326-1.223a.75.75 0 0 1 1.018-1.102l1.48 1.366c.328-.281.659-.577.984-.887L9.99 9.802a.75.75 0 1 1 1.019-1.103l1.384 1.28c.295-.329.566-.661.81-.995L12.92 8.7l-1.167-1.168c-.674-.671-1.78-.664-2.474.03-.268.269-.538.537-.802.797-.893.882-2.319.843-3.185-.032-.346-.35-.693-.697-1.043-1.047a.75.75 0 0 1-.04-1.016c.162-.191.336-.401.52-.623.62-.748 1.356-1.637 2.166-2.417Z"></path>
          </svg>
        </div>
      </div>
    </button>
  );
};

export default IconComponent;
