import { createRoot } from "react-dom/client";
import IconComponent from "./IconComponent";

const processedTweets = new Set();
const clickedTweets = new Map();
const initialState = JSON.parse(localStorage.getItem('clickedTweets')) || {};

function addReactIconToTweet(tweetElement) {
  const likeButton = tweetElement.querySelector('[data-testid="like"], [data-testid="unlike"]');
  const tweetLinkElement = tweetElement.querySelector("a[href*='/status/']");
 
  const tweetURL = tweetLinkElement ? tweetLinkElement.href : null;

  if (!tweetURL || processedTweets.has(tweetElement)) return;
  
  const tweetId = tweetURL.split("/status/")[1].split("/")[0];
  const iconWrapper = document.createElement("div");
  iconWrapper.className = "react-icon-wrapper";

  createRoot(iconWrapper).render(
    <IconComponent
      tabindex={likeButton.tabIndex}
      tweetURL={tweetURL}
      tweetId={tweetId}
      tweetLinkElement={tweetLinkElement}
      defaultClickedState={initialState[tweetId] === "true"}
      onClick={(id, isClicked) => {
        initialState[id] = isClicked.toString();
        localStorage.setItem('clickedTweets', JSON.stringify(initialState)); 
        clickedTweets.set(id, isClicked);
      }}
    />
  );

  likeButton.parentNode.insertBefore(iconWrapper, likeButton.nextSibling);
  processedTweets.add(tweetElement); 
}

function monitorTweets() {
  document.querySelectorAll('[data-testid="tweet"]').forEach(addReactIconToTweet);
}

const observer = new MutationObserver(() => monitorTweets());
observer.observe(document.body, { childList: true, subtree: true });

monitorTweets();
