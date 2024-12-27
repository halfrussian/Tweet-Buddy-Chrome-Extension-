console.log("Tweet Buddy Extension Loaded");

// Set to keep track of processed tweets
let processedTweets = new Set();




// Function to add "HI" text next to the like button in each tweet
function addHiTextNextToLikeButton(tweetElement) {
  // Check if the tweet has already been processed
  if (processedTweets.has(tweetElement)) {
    return; // If yes, skip this tweet
  }

  // Find the like button using its data-testid attribute
  const likeButton = tweetElement.querySelector('[data-testid="like"]');

  if (likeButton) {
    console.log("Like button found:", likeButton);

    //svg stuff should go here

    // Create a wrapper for the SVG icon
    const svgIconWrapper = document.createElement("div");
    svgIconWrapper.style.display = "inline-block"; // Ensure it aligns with the button
    svgIconWrapper.style.marginLeft = "10px"; // Add spacing
    svgIconWrapper.style.cursor = "pointer"; // Optional: make it clickable

    // Add the SVG icon

    // Add the SVG icon
    svgIconWrapper.innerHTML = `
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
     <path d="M8.048 2.241c.964-.709 2.079-1.238 3.325-1.241a4.616 4.616 0 0 1 3.282 1.355c.41.408.757.86.996 1.428.238.568.348 1.206.347 1.968 0 2.193-1.505 4.254-3.081 5.862-1.496 1.526-3.213 2.796-4.249 3.563l-.22.163a.749.749 0 0 1-.895 0l-.221-.163c-1.036-.767-2.753-2.037-4.249-3.563C1.51 10.008.007 7.952.002 5.762a4.614 4.614 0 0 1 1.353-3.407C3.123.585 6.223.537 8.048 2.24Zm-1.153.983c-1.25-1.033-3.321-.967-4.48.191a3.115 3.115 0 0 0-.913 2.335c0 1.556 1.109 3.24 2.652 4.813C5.463 11.898 6.96 13.032 8 13.805c.353-.262.758-.565 1.191-.905l-1.326-1.223a.75.75 0 0 1 1.018-1.102l1.48 1.366c.328-.281.659-.577.984-.887L9.99 9.802a.75.75 0 1 1 1.019-1.103l1.384 1.28c.295-.329.566-.661.81-.995L12.92 8.7l-1.167-1.168c-.674-.671-1.78-.664-2.474.03-.268.269-.538.537-.802.797-.893.882-2.319.843-3.185-.032-.346-.35-.693-.697-1.043-1.047a.75.75 0 0 1-.04-1.016c.162-.191.336-.401.52-.623.62-.748 1.356-1.637 2.166-2.417Zm7.112 4.442c.313-.65.491-1.293.491-1.916v-.001c0-.614-.088-1.045-.23-1.385-.143-.339-.357-.633-.673-.949a3.111 3.111 0 0 0-2.218-.915c-1.092.003-2.165.627-3.226 1.602-.823.755-1.554 1.637-2.228 2.45l-.127.154.562.566a.755.755 0 0 0 1.066.02l.794-.79c1.258-1.258 3.312-1.31 4.594-.032.396.394.792.791 1.173 1.173Z"></path>
 </svg>
`;

    // Apply dynamic color using CSS
    svgIconWrapper.style.color = "#71767B"; // Default to white

     // Insert the SVG next to the like button
     likeButton.parentNode.insertBefore(svgIconWrapper, likeButton.nextSibling);


    // Mark the tweet as processed
    processedTweets.add(tweetElement);
  } else {
    console.log("No like button found in this tweet.");
  }
}

// Function to monitor tweets on the page
function monitorTweets() {
  const tweetElements = document.querySelectorAll('[data-testid="tweet"]'); // Query all tweet elements
  tweetElements.forEach(addHiTextNextToLikeButton); // Add "HI" text next to the like button in each tweet
}

// Initial monitoring of tweets
monitorTweets();

// Observer to handle dynamic loading of tweets (infinite scroll)
const observer = new MutationObserver((mutationsList, observer) => {
  console.log("Mutation detected");
  monitorTweets(); // Recheck and add "HI" text to newly loaded tweets
});
observer.observe(document.body, { childList: true, subtree: true });