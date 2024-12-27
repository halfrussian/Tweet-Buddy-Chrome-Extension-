import React from "react";
import { createRoot } from "react-dom/client";
import IconComponent from "./IconComponent";

let processedTweets = new Set();

function addReactIconToTweet(tweetElement) {
  if (processedTweets.has(tweetElement)) return;

  const likeButton = tweetElement.querySelector('[data-testid="like"], [data-testid="unlike"]');
  if (likeButton && (likeButton.dataset.testid === "like" || likeButton.dataset.testid === "unlike")) {
    const iconWrapper = document.createElement("div");
    iconWrapper.className = "react-icon-wrapper";

   
    const tabindex = likeButton.tabIndex;  

  
    const tweetLinkElement = tweetElement.querySelector("a[href*='/status/']");
    const tweetLink = tweetLinkElement ? tweetLinkElement.href : null;
    
    createRoot(iconWrapper).render(
      <IconComponent
        tabindex={tabindex}
        onClick={() => {
          if (tweetLink) {
            console.log("Tweet Link:", tweetLink);
          } else {
            console.log("Tweet link not found!");
          }
        }}
      />
    );

    likeButton.parentNode.insertBefore(iconWrapper, likeButton.nextSibling);
    processedTweets.add(tweetElement);
  }
}

function monitorTweets() {
  const tweets = document.querySelectorAll('[data-testid="tweet"]');
  tweets.forEach(addReactIconToTweet);
}

// Observe dynamic tweets
const observer = new MutationObserver(() => monitorTweets());
observer.observe(document.body, { childList: true, subtree: true });

monitorTweets();