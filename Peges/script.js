async function sendMessageToAI(message) {
    const apiKey = '';

    const url = "https://api.openai.com/v1/chat/completions"

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }]
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        renderMessage(aiResponse);
    } catch (error) {
        console.error('Error fetching AI response:', error);
        renderMessage('Error fetching AI response.');
    }
}

// Event listener for the send button
document.getElementById('send-button').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput) {
        renderMessage(userInput, true);
        sendMessageToAI(userInput);
        document.getElementById('user-input').value = '';
    }
});

function renderMessage (message, isUser = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isUser ? 'user': 'ai');
    messageElement.textContent = message;
    document.getElementById('chat-history').appendChild(messageElement);

    // Auto-scroll to the bottom
    const chatHistory = document.getElementById('chat-history');
    chatHistory.scrollTop = chatHistory.scrollHeight;
} 

document.getElementById('user-input').addEventListener('keypress', (Event) => {
    if (Event.key === 'Enter'){
        document.getElementById('send-button').click();
    }
});
