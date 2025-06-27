import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['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'], // Replace with your OpenAI API key
});

async function fetchCountryInfo() {
    const country = document.getElementById('country-input').value;
    if (!country) {
        alert('Please enter a country name.');
        return;
    };

    try {
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    { role: 'user', content: `Provide a brief description of ${country}.` }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            displayCountryInfo(data.choices[0].message.content);
        } else {
            alert('No information found. Please try again.');
        }
    } catch (error) {
        alert('Error fetching country info: ' + error.message);
    }
}

function displayCountryInfo(info) {
    document.getElementById('country-name').textContent = info.split('.')[0];
    document.getElementById('country-description').textContent = info;
    document.getElementById('country-info').style.display = 'block';
}