document.querySelectorAll('.info-item').forEach(item => {
  item.addEventListener('click', function(e) {
    e.stopPropagation();
    const type = this.getAttribute('data-type');
    const value = this.getAttribute('data-value');
    let link;

    if (type === 'phone') {
      // vCard details
      const name = "Ajit Joshi";
      const phone = "915-855-5745";
      const email = "ajit7275@gmail.com";
      // vCard string
      const vcard =
        "BEGIN:VCARD\n" +
        "VERSION:3.0\n" +
        "FN:" + name + "\n" +
        "TEL;TYPE=CELL:" + phone + "\n" +
        "EMAIL:" + email + "\n" +
        "END:VCARD";
      // Create and trigger download
      const blob = new Blob([vcard], { type: "text/vcard" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "Ajit_Joshi.vcf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return; // Stop further actions for phone
    }

    // Existing behavior for email/address
    if (type === 'email') link = `mailto:${value}`;
    else if (type === 'address') link = `https://www.google.com/maps?q=${encodeURIComponent(value)}`;
    if (link) window.open(link, '_blank');
    navigator.clipboard.writeText(value).then(() => showCopyMessage(type));
  });
});
