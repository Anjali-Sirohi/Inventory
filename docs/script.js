document.addEventListener('DOMContentLoaded', () => {
    const addItemForm = document.getElementById('addItemForm');
    const itemsList = document.getElementById('itemsList');
  
    addItemForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(addItemForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
  
      const response = await fetch('/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        addItemForm.reset();
        loadItems();
      } else {
        alert('Error adding item');
      }
    });
  
    async function loadItems() {
      const response = await fetch('/viewItems');
      const items = await response.json();
  
      itemsList.innerHTML = '';
      items.forEach((item) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<strong>${item.name}</strong> - Category: ${item.category}, Quantity: ${item.quantity}, Price: $${item.price.toFixed(2)}`;
        itemsList.appendChild(itemDiv);
      });
    }
  
    loadItems();
  });
  