function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var recipient = "rakeshpanditdeveloper@gmail.com";
    var subject = "New Contact Form Submission: " + data.subject;
    var message = `
      Full Name: ${data.fullName}
      Email: ${data.email}
      Subject: ${data.subject}
      Message: ${data.message}
    `;
    
    // Send email
    MailApp.sendEmail(recipient, subject, message);
    
    // Optional: Log data into Google Sheets
    var sheet = SpreadsheetApp.openById("1jVh9-DEAQWvQ-3eozaLV4ew7fDhwJyo0hgDijEa9K4M").getActiveSheet();
    sheet.appendRow([new Date(), data.fullName, data.email, data.subject, data.message]);
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Message sent successfully!" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}