document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email-input');
    const fetchAndProceedButton = document.getElementById('fetch-and-proceed');
    const messageDisplay = document.getElementById('message-display');

    emailInput.addEventListener('input', function() {
        fetchAndProceedButton.disabled = !emailInput.value.trim();
    });

    fetchAndProceedButton.addEventListener('click', function() {
        const email = emailInput.value.trim().toLowerCase();
        if (!email) {
            alert("Please enter a valid email address.");
            return;
        }
        const hash = CryptoJS.MD5(email).toString();
        const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=200`;

        const gravatarImage = new Image();
        gravatarImage.src = gravatarUrl;

        gravatarImage.onload = function() {
            // Assume GitHub username is the part of the email before the @ symbol
            const githubUsername = email.split('@')[0];

            // Fetch GitHub repositories
            fetch(`https://api.github.com/users/${githubUsername}/repos`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`GitHub user not found for ${githubUsername}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (!Array.isArray(data)) {
                        throw new Error('Unexpected response format');
                    }

                    const repos = data.map(repo => repo.name);
                    // Store the profile information in localStorage
                    localStorage.setItem('profile', JSON.stringify({ email, githubUsername, repos, gravatarUrl }));
                    localStorage.setItem('gravatarFetched', 'true');

                    // Display success message
                    messageDisplay.innerHTML = '<p>Gravatar fetched successfully. Redirecting...</p>';
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 3000); // 3 seconds timeout
                })
                .catch(error => {
                    console.error('Error fetching GitHub repositories:', error);
                    
                    // Store the profile information in localStorage with just the email and gravatarUrl
                    localStorage.setItem('profile', JSON.stringify({ email, gravatarUrl }));
                    localStorage.setItem('gravatarFetched', 'true');

                    // Display success message
                    messageDisplay.innerHTML = '<p>Gravatar fetched successfully. Redirecting...</p>';
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 3000); // 3 seconds timeout
                });
        };

        gravatarImage.onerror = function() {
            // Store the profile information in localStorage with just the email
            localStorage.setItem('profile', JSON.stringify({ email }));
            localStorage.setItem('gravatarFetched', 'true');

            // Display success message
            messageDisplay.innerHTML = '<p>Gravatar fetched successfully. Redirecting...</p>';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000); // 3 seconds timeout
        };
    });

    // Check if the gravatar was already fetched
    if (localStorage.getItem('gravatarFetched') === 'true') {
        fetchAndProceedButton.disabled = false;
    }
});
