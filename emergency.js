document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
    
    // Form submission
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addContact();
    });
    
    // Panic button
    document.getElementById('panicButton').addEventListener('click', triggerPanic);
});

function loadContacts() {
    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = '';
    
    const contacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    
    if (contacts.length === 0) {
        contactsList.innerHTML = '<p class="text-gray-500">No emergency contacts saved yet.</p>';
        return;
    }
    
    contacts.forEach((contact, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.className = 'flex justify-between items-center p-3 bg-gray-50 rounded-lg';
        contactDiv.innerHTML = `
            <div>
                <p class="font-medium">${contact.name}</p>
                <p class="text-sm text-gray-600">${contact.number}</p>
            </div>
            <button class="delete-btn px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition" data-index="${index}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        contactsList.appendChild(contactDiv);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            deleteContact(parseInt(e.target.closest('button').dataset.index));
        });
    });
}

function addContact() {
    const nameInput = document.getElementById('contactName');
    const numberInput = document.getElementById('contactNumber');
    
    const name = nameInput.value.trim();
    const number = numberInput.value.trim();
    
    if (!name || !number) {
        alert('Please enter both name and number');
        return;
    }
    
    const contacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    contacts.push({ name, number });
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
    
    // Reset form and reload list
    nameInput.value = '';
    numberInput.value = '';
    loadContacts();
}

function deleteContact(index) {
    const contacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    if (index >= 0 && index < contacts.length) {
        contacts.splice(index, 1);
        localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
        loadContacts();
    }
}

function triggerPanic() {
    const contacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    const statusElement = document.getElementById('panicStatus');
    
    if (contacts.length === 0) {
        statusElement.textContent = "No emergency contacts saved! Add contacts first.";
        statusElement.className = "mt-4 text-sm text-red-600";
        return;
    }
    
    // In a real app, this would send SMS/call to all contacts
    // For this demo, we'll simulate it
    let message = "EMERGENCY ALERT SENT TO:\n";
    contacts.forEach(contact => {
        message += `${contact.name}: ${contact.number}\n`;
    });
    
    alert(message);
    statusElement.textContent = "Emergency alert sent to all contacts!";
    statusElement.className = "mt-4 text-sm text-green-600";
    
    // Vibrate device if supported
    if (navigator.vibrate) {
        navigator.vibrate([500, 200, 500, 200, 500]);
    }
}
