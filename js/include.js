  // ======================= HTML Files Include ============================================
function includeHTML(filePath, elementId) {
    let element = document.getElementById(elementId);
    if (element) {
      fetch(filePath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Could not fetch ${filePath}`);
          }
          return response.text();
        })
        .then(data => {
          element.innerHTML = data;
        })
        .catch(error => {
          console.error(`Error including ${filePath}:`, error);
        });
    } else {
      console.error(`Element with ID "${elementId}" not found.`);
    }
  }
  

  // ======================= Currency Converter ============================================

  async function convertCurrency() {
    var fromCurrency = document.getElementById("fromCurrency").value;
    var toCurrency = document.getElementById("toCurrency").value;
    var amount = document.getElementById("amount").value;

    // Google Apps Script URL
    var scriptUrl = "https://script.google.com/macros/s/AKfycbwl2NKNM0zmFf_SZRtXEuBLWIQkU_ew3YySmrD8VAdy38vX1yXcnN4crZHmvjj-RkgT/exec";

    try {
      // Call the Google Apps Script function
      const response = await fetch(`${scriptUrl}?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`);
      const data = await response.json();

      if (data.convertedAmount) {
        document.getElementById("convertedAmount").textContent = data.convertedAmount;
      } else {
        document.getElementById("convertedAmount").textContent = "Error: " + data.error;
      }

    } catch (error) {
      console.error(error);
      document.getElementById("convertedAmount").textContent = "Error: Unable to fetch conversion data.";
    }
  }



// ====================== Include Contact form ===============
  // function includeHTML(file, elementId) {
  //   var xhttp = new XMLHttpRequest();
  //   xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //       document.getElementById(elementId).innerHTML = this.responseText;
  //     }
  //   };
  //   xhttp.open("GET", file, true);
  //   xhttp.send();
  // }
  