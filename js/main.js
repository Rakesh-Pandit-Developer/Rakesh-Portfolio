    // =============== Time ======================================
    // Function to update time for a specific timezone
    function updateTime() {
        // Jordan Time (UTC+3)
        let jordanDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Amman" }));
        let jordanTime = jordanDate.toLocaleTimeString();
        document.getElementById("jordan-time").innerText = jordanTime;
  
        // Nepal Time (UTC+5:45)
        let nepalDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }));
        let nepalTime = nepalDate.toLocaleTimeString();
        document.getElementById("nepal-time").innerText = nepalTime;
      }
      // Update time every second
      setInterval(updateTime, 1000);
      updateTime();




// ======================== Search =============================
// Search form aur result div ko select karna
const searchForm = document.getElementById("searchForm");
const searchQueryInput = document.getElementById("searchQuery");
const resultsDiv = document.getElementById("results");

// API Key aur Search Engine ID
const API_KEY = "AIzaSyAK5xST4fi6AX8yO9PaIt4B8rRXzWnCkaU";
const CX = "00a523c8478af499a"; // Search Engine ID

// Form submit event
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Default form behavior ko rokna
  const query = searchQueryInput.value; // User input
  if (!query) {
    alert("Please enter a search query");
    return;
  }

  // API call
  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    resultsDiv.innerHTML = `<p class="text-danger">Error fetching search results. Please try again later.</p>`;
  }
});

// Results display function
function displayResults(data) {
  if (!data.items || data.items.length === 0) {
    resultsDiv.innerHTML = `<p class="text-warning">No results found for your query.</p>`;
    return;
  }

  // Clear previous results
  resultsDiv.innerHTML = "";

  // Results ko display karna
  data.items.forEach((item) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("mb-3");

    // Result structure
    resultItem.innerHTML = `
      <h4><a href="${item.link}" target="_blank">${item.title}</a></h4>
      <p>${item.snippet}</p>
      <a href="${item.link}" target="_blank">${item.link}</a>
    `;
    resultsDiv.appendChild(resultItem);
  });
}





// =====================================================

