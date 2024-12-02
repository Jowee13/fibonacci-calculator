let isScrolling = false;
let resultContainerCreated = false;

function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

function calculateFibonacci() {
  const input = document.getElementById("fibonacci-input");
  const errorMessage = document.getElementById("error-message");
  const n = parseInt(input.value);

  errorMessage.textContent = ""; 

  if (isNaN(n) || n < 0 || !Number.isInteger(n)) {
    errorMessage.textContent = "Please enter a non-negative integer.";
    return;
  }

  const result = fibonacci(n);
  let resultContainer = document.querySelector(".result-container");

  if (!resultContainer) {
    resultContainer = document.createElement("div");
    resultContainer.classList.add("result-container");
    document.body.appendChild(resultContainer);
    resultContainer.classList.add("slide-in");  
  } else if (resultContainerCreated) {
    resultContainer.classList.remove("slide-in"); 
  }

  resultContainerCreated = true;

  resultContainer.innerHTML = `
    <h2>Input: n = ${n}</h2>
    <p><strong>Output:</strong> ${result}</p>
    <p><strong>Explanation:</strong> ${result} is the ${n}${getOrdinalSuffix(n)} number of the Fibonacci sequence.</p>
  `;

  if (!isScrolling) {
    isScrolling = true;
    smoothScrollTo(resultContainer);  
  }
}

function getOrdinalSuffix(n) {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}

document.getElementById("fibonacci-input").addEventListener("input", function () {
  document.getElementById("error-message").textContent = "";
});

function smoothScrollTo(element, duration = 1500) {
  const start = window.scrollY;
  const end = element.getBoundingClientRect().top + start;
  const distance = end - start;
  let startTime = null;

  function scrollStep(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const scrollAmount = Math.min(progress / duration, 1) * distance;

    window.scrollTo(0, start + scrollAmount);

    if (progress < duration) {
      window.requestAnimationFrame(scrollStep); 
    } else {
      isScrolling = false; 
    }
  }

  window.requestAnimationFrame(scrollStep); 
}
