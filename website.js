document.getElementById('registrationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value.trim();
    }
    
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const text = await response.text();
      if (response.ok) {
        alert(text);
        this.reset();
      } else {
        alert('Error: ' + text);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please try again.');
    }
  });