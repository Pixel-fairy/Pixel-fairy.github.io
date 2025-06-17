// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  const infoItems = document.querySelectorAll('.info-item');
  
  // Check if elements exist
  if (infoItems.length === 0) {
    console.log('No .info-item elements found');
    return;
  }

  infoItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const type = this.getAttribute('data-type');
      const value = this.getAttribute('data-value');
      
      console.log('Clicked item:', { type, value }); // Debug log
      
      if (!type || !value) {
        console.log('Missing data-type or data-value attributes');
        return;
      }

      let link;
      
      if (type === 'phone') {
        // vCard details
        const name = "Ajit Joshi";
        const phone = "915-855-5745";
        const email = "ajit7275@gmail.com";
        
        // vCard string
        const vcard = [
          "BEGIN:VCARD",
          "VERSION:3.0",
          "FN:" + name,
          "TEL;TYPE=CELL:" + phone,
          "EMAIL:" + email,
          "END:VCARD"
        ].join("\n");
        
        try {
          // Create and trigger download
          const blob = new Blob([vcard], { type: "text/vcard" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = "Ajit_Joshi.vcf";
          a.style.display = 'none'; // Hide the link
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          console.log('vCard download triggered');
        } catch (error) {
          console.error('Error creating vCard:', error);
        }
        return; // Stop further actions for phone
      }
      
      // Existing behavior for email/address
      if (type === 'email') {
        link = `mailto:${value}`;
      } else if (type === 'address') {
        link = `https://www.google.com/maps?q=${encodeURIComponent(value)}`;
      }
      
      if (link) {
        try {
          window.open(link, '_blank');
        } catch (error) {
          console.error('Error opening link:', error);
        }
      }
      
      // Copy to clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(() => {
          console.log('Copied to clipboard:', value);
          if (typeof showCopyMessage === 'function') {
            showCopyMessage(type);
          }
        }).catch(err => {
          console.error('Failed to copy to clipboard:', err);
          // Fallback for older browsers
          fallbackCopyToClipboard(value);
        });
      } else {
        // Fallback for older browsers
        fallbackCopyToClipboard(value);
      }
    });
  });
});

// Fallback clipboard function for older browsers
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    console.log('Fallback copy successful');
    if (typeof showCopyMessage === 'function') {
      showCopyMessage('text');
    }
  } catch (err) {
    console.error('Fallback copy failed:', err);
  }
  
  document.body.removeChild(textArea);
}
