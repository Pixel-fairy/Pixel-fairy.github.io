
    const card = document.getElementById('businessCard');
    const copyMessage = document.getElementById('copyMessage');

    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });

    document.querySelectorAll('.info-item').forEach(item => {
      item.addEventListener('click', function(e) {
        e.stopPropagation();
        const type = this.getAttribute('data-type');
        const value = this.getAttribute('data-value');
        let link;
        if (type === 'phone') link = `tel:${value.replace(/-/g, '')}`;
        else if (type === 'email') link = `mailto:${value}`;
        else if (type === 'address') link = `https://www.google.com/maps?q=${encodeURIComponent(value)}`;
        if (link) window.open(link, '_blank');
        navigator.clipboard.writeText(value).then(() => showCopyMessage(type));
      });
    });

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
