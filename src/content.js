import React from "react";
import { createRoot } from "react-dom/client";
import IconComponent from "./IconComponent";

let processedTweets = new Set();

function addReactIconToTweet(tweetElement) {
  if (processedTweets.has(tweetElement)) return;

  const likeButton = tweetElement.querySelector('[data-testid="like"]');
  if (likeButton) {
    const iconWrapper = document.createElement("div");
    iconWrapper.className = "react-icon-wrapper";

    // Render the React component
    createRoot(iconWrapper).render(
      <IconComponent onClick={() => console.log("Icon clicked!")} />
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
