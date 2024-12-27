import { createRoot } from "react-dom/client";
import IconComponent from "./IconComponent";

// Track processed tweets to avoid re-insertion
const processedTweets = new Set();
const clickedTweets = new Map();

// Store initial tweet states from localStorage
const initialState = JSON.parse(localStorage.getItem('clickedTweets')) || {};

function addReactIconToTweet(tweetElement) {
  const likeButton = tweetElement.querySelector('[data-testid="like"], [data-testid="unlike"]');
  const tweetLinkElement = tweetElement.querySelector("a[href*='/status/']");
  const tweetId = tweetLinkElement ? tweetLinkElement.href : null;

  if (!tweetId || processedTweets.has(tweetElement)) return;

  const iconWrapper = document.createElement("div");
  iconWrapper.className = "react-icon-wrapper";

  createRoot(iconWrapper).render(
    <IconComponent
      tabindex={likeButton.tabIndex}
      tweetId={tweetId}
      defaultClickedState={initialState[tweetId] === "true"}
      onClick={(id, isClicked) => {
        initialState[id] = isClicked.toString();
        localStorage.setItem('clickedTweets', JSON.stringify(initialState)); // Save updated state
        clickedTweets.set(id, isClicked); // Update clicked state
      }}
    />
  );

  likeButton.parentNode.insertBefore(iconWrapper, likeButton.nextSibling);
  processedTweets.add(tweetElement); // Mark tweet as processed
}

function monitorTweets() {
  document.querySelectorAll('[data-testid="tweet"]').forEach(addReactIconToTweet);
}

// Observe dynamic tweets
const observer = new MutationObserver(() => monitorTweets());
observer.observe(document.body, { childList: true, subtree: true });

// Run initially to add icons to already loaded tweets
monitorTweets();
