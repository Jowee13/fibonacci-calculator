function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0,
    b = 1;
  for (let i = 2; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

function calculateFibonacci() {
  const input = document.getElementById("fibonacci-input");
  const output = document.getElementById("output");
  const errorMessage = document.getElementById("error-message");
  const n = parseInt(input.value);

  errorMessage.textContent = "";

  if (isNaN(n) || n < 0 || !Number.isInteger(Number(input.value))) {
    errorMessage.textContent = "Please enter a non-negative integer.";
    output.textContent = "";
    return;
  }

  const result = fibonacci(n);
  output.textContent = `Input: n = ${n}\nOutput: ${result}\nExplanation: ${result} is the ${n}${getOrdinalSuffix(
    n
  )} number of the Fibonacci series.`;
}

function getOrdinalSuffix(n) {
  const j = n % 10;
  const k = n % 100;
  if (j == 1 && k != 11) {
    return "st";
  }
  if (j == 2 && k != 12) {
    return "nd";
  }
  if (j == 3 && k != 13) {
    return "rd";
  }
  return "th";
}

document
  .getElementById("fibonacci-input")
  .addEventListener("input", function () {
    document.getElementById("error-message").textContent = "";
  });
