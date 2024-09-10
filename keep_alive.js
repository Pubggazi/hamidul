// Function to send keep-alive request
function keepAlive() {
    // Replace 'http://your-web-server.com/keep-alive' with your actual web server URL
    var url = 'https://bug-free-space-waffle-q54gj6qxvrjc4v5v.github.dev/';
    
    fetch(url)
    .then(response => {
        if (response.ok) {
            console.log('Keep-alive request sent successfully.');
        } else {
            console.error('Failed to send keep-alive request.');
        }
    })
    .catch(error => {
        console.error('An error occurred while sending keep-alive request:', error);
    });
}

// Send keep-alive request every 300 seconds (30,000 milliseconds)
setInterval(keepAlive, 30000);
