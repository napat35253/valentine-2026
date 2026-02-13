document.addEventListener("DOMContentLoaded", () => {
  const introContainer = document.getElementById("intro-container");
  const mainContainer = document.getElementById("main-container");
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const successPopup = document.getElementById("success-popup");

  // Initial Animation Sequence
  setTimeout(() => {
    // Wait for the flyIn animation to finish (4s)
    introContainer.style.display = "none";
    mainContainer.classList.remove("hidden");
    // Add a small delay to allow the removal of hidden class to take effect before adding visible class for transition
    setTimeout(() => {
      mainContainer.classList.add("visible");
    }, 50);
  }, 4000); // Matches the 4s animation duration

  let noClickCount = 0;
  const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
    "Plsss? :(",
    "Pretty please? :(",
    "I'll be very sad :(",
    "I'm gonna cry... :(",
  ];

  // Interaction Logic
  noBtn.addEventListener("click", () => {
    noClickCount++;

    // Make "Yes" button bigger
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    const newSize = currentSize * 1.3; // Grow by 30% each time
    yesBtn.style.fontSize = `${newSize}px`;

    // Also increase padding to maintain button proportions
    const currentPadding = parseFloat(
      window.getComputedStyle(yesBtn).paddingTop,
    );
    yesBtn.style.padding = `${currentPadding * 1.2}px ${currentPadding * 1.2 * 2.5}px`;

    // Change "No" button text
    const phraseIndex = Math.min(noClickCount, phrases.length - 1);
    noBtn.textContent = phrases[phraseIndex];

    // Move "No" button randomly (harder to click)
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    // Make sure it doesn't go off screen too much, keep it somewhat centralized but erratic
    // Just applying position absolute might break the layout flow, so let's use transform
    // But to make it really run away, absolute is better.
    // Let's switch to absolute positioning after the first click if not already
    if (noBtn.style.position !== "absolute") {
      noBtn.style.position = "absolute";
    }

    noBtn.style.left = `${Math.random() * 80 + 10}%`; // Keep within 10-90% width
    noBtn.style.top = `${Math.random() * 80 + 10}%`; // Keep within 10-90% height
  });

  // Hover effect for "No" button (optional, making it REALLY hard)
  // defined in requirements as "hard to click", so let's add a slight evasion on hover too
  noBtn.addEventListener("mouseover", () => {
    if (noClickCount > 2) {
      // Only start evading after a few clicks
      const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
      const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

      noBtn.style.position = "absolute";
      noBtn.style.left = `${Math.random() * 80 + 10}%`;
      noBtn.style.top = `${Math.random() * 80 + 10}%`;
    }
  });

  // Mobile touch support for "No" button evasion
  // Using touchstart to trigger movement before they can lift their finger to 'click'
  noBtn.addEventListener("touchstart", (e) => {
    if (noClickCount > 0) {
      // Should match the evasion logic, but maybe be stricter on mobile?
      // Prevent default to stop click from firing if we move it
      // But we also want them to be able to click it eventually?
      // Let's just move it. If they manage to tap really fast, good for them.
      const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
      const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

      noBtn.style.position = "absolute";
      noBtn.style.left = `${Math.random() * 80 + 10}%`;
      noBtn.style.top = `${Math.random() * 80 + 10}%`;
    }
  });

  yesBtn.addEventListener("click", () => {
    successPopup.classList.remove("hidden");
    launchConfetti();
  });
});

// Simple Confetti Function
function launchConfetti() {
  const colors = ["#ff6b6b", "#ff9e9e", "#ffffff", "#ffcc00"];
  const confettiCount = 100;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    const bg = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.background = bg;

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
    confetti.style.opacity = Math.random();

    document.body.appendChild(confetti);

    // Remove after animation
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

// Check for confetti styles in JS or add to CSS?
// Let's add the confetti styles dynamically
const style = document.createElement("style");
style.innerHTML = `
    .confetti {
        position: fixed;
        top: -10px;
        width: 10px;
        height: 10px;
        z-index: 999;
        animation: fall linear forwards;
    }
    
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(720deg);
        }
    }
`;
document.head.appendChild(style);
