// Replace your existing JavaScript with this code
document.querySelectorAll('.info-item').forEach(item => {
  item.addEventListener('click', function(e) {
    e.stopPropagation();
    const type = this.getAttribute('data-type');
    const value = this.getAttribute('data-value');
    let link;

    if (type === 'phone') {
      // Get contact details dynamically
      const name = document.querySelector('.name').textContent.trim();
      const emailItem = document.querySelector('.info-item[data-type="email"]');
      const emailValue = emailItem ? emailItem.getAttribute('data-value') : '';
      
      // Create vCard content
      const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL;TYPE=cell:${value}\nEMAIL:${emailValue}\nEND:VCARD`;
      
      // Trigger download
      const blob = new Blob([vcard], { type: "text/vcard" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name.replace(/\s/g, '_')}.vcf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (type === 'email') {
      link = `mailto:${value}`;
    } else if (type === 'address') {
      link = `https://www.google.com/maps?q=${encodeURIComponent(value)}`;
    }

    // Handle other types (email/address)
    if (type !== 'phone') {
      if (link) window.open(link, '_blank');
      navigator.clipboard.writeText(value).then(() => showCopyMessage(type));
    }
  });
});

// Keep this function unchanged
function showCopyMessage(type) {
  const messages = {
    phone: "Phone number copied!",
    email: "Email address copied!",
    address: "Address copied!"
  };
  copyMessage.textContent = messages[type] || "Copied to clipboard!";
  copyMessage.style.display = 'block';
  setTimeout(() => copyMessage.style.display = 'none', 1800);
}
