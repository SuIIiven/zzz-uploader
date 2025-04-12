// Function to send message to Discord via backend
async function sendMessage() {
    const message = document.getElementById('message').value;
    if (!message) {
        alert('Please enter a message.');
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        if (response.ok) {
            alert('Message sent successfully!');
            document.getElementById('message').value = ''; // Clear the text box
        } else {
            alert('Failed to send message.');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Error sending message.');
    }
}

// Function to load the current queue
async function loadQueue() {
    try {
        const response = await fetch('http://localhost:3000/queue');
        const data = await response.json();
        const queueDiv = document.getElementById('queue');
        if (data.queue && data.queue.length > 0) {
            queueDiv.innerHTML = '<ul>' + data.queue.map(item => `<li>${item}</li>`).join('') + '</ul>';
        } else {
            queueDiv.innerHTML = 'No maps in queue.';
        }
    } catch (error) {
        console.error('Error loading queue:', error);
        document.getElementById('queue').innerHTML = 'Failed to load queue.';
    }
}

// Load the queue when the page loads
window.onload = loadQueue;