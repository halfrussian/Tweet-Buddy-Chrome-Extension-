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
        
        // Create a div to hold the "HI" text
        const hiText = document.createElement('div');
        hiText.innerText = 'HI'; // Set the text
        hiText.style.color = 'white';  // Set the text color to white
        hiText.style.fontSize = '16px';  // Set the font size
        hiText.style.marginLeft = '10px';  // Space it out from the like button
        hiText.style.cursor = 'pointer';  // Make it clickable if needed
        
        // Insert the "HI" text next to the like button
        likeButton.parentNode.insertBefore(hiText, likeButton.nextSibling);

        // Mark the tweet as processed
        processedTweets.add(tweetElement);
    } else {
        console.log("No like button found in this tweet.");
    }
}

// Function to monitor tweets on the page
function monitorTweets() {
    const tweetElements = document.querySelectorAll('[data-testid="tweet"]');  // Query all tweet elements
    tweetElements.forEach(addHiTextNextToLikeButton);  // Add "HI" text next to the like button in each tweet
}

// Initial monitoring of tweets
monitorTweets();

// Observer to handle dynamic loading of tweets (infinite scroll)
const observer = new MutationObserver((mutationsList, observer) => {
    console.log("Mutation detected");
    monitorTweets();  // Recheck and add "HI" text to newly loaded tweets
});
observer.observe(document.body, { childList: true, subtree: true });