function signup() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // Simple password confirmation check
    if (password !== confirmPassword) {
        document.getElementById('signupMessage').innerHTML = 'Password and Confirm Password do not match.';
        return;
    }

    
    var accessToken = generateAccessToken();

    // Create a user object
    var user = {
        name: name,
        email: email,
        accessToken: accessToken
    };

    // Convert the user object to a JSON string
    var userJSON = JSON.stringify(user);

    // Store the JSON string in local storage
    localStorage.setItem('user', userJSON);

    // Display success message
    document.getElementById('signupMessage').innerHTML = 'Signup successful! Redirecting to Profile...';

    setTimeout(function () {
        document.getElementById('signupPage').style.display = 'none';
        displayProfilePage();
    }, 2000);
}

function displayProfilePage() {
    // Check if the user is logged in
    var userJSON = localStorage.getItem('user');
    if (userJSON) {
        var user = JSON.parse(userJSON);

        // Display profile details
        var name = user.name;
        var email = user.email;
        var accessToken = user.accessToken;
        var passwordPlaceholder = '*****'; // 

        document.getElementById('profileDetails').innerHTML =
            'Full Name: ' + name + '<br>' +
            'Email: ' + email + '<br>' +
            'Token: ' + accessToken + '<br>' +
            'Password: ' + passwordPlaceholder;

        // Show the profile page
        document.getElementById('profilePage').style.display = 'block';
    } else {
        // Redirect to signup page if the user is not logged in
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

function generateAccessToken() {
    return Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
}

window.onload = function () {
    displayProfilePage();
};