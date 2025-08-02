// Save token after login
function saveToken(role, token) {
  localStorage.setItem(`${role}_token`, token);
}

// Retrieve token for a specific role
function getToken(role) {
  return localStorage.getItem(`${role}_token`);
}

// Remove token on logout
function clearToken(role) {
  localStorage.removeItem(`${role}_token`);
}

// Check if user is authenticated
function isAuthenticated(role) {
  return !!getToken(role);
}

// Example usage in login.js
function loginUser(role, username, password) {
  // Simulated backend login (replace with fetch call)
  const dummyUser = {
    admin: { username: 'admin', password: 'admin123', token: 'admin_token_xyz' },
    agent: { username: 'agent', password: 'agent123', token: 'agent_token_xyz' },
    user: { username: 'user', password: 'user123', token: 'user_token_xyz' }
  };

  const user = dummyUser[role];
  if (user && user.username === username && user.password === password) {
    saveToken(role, user.token);
    window.location.href = `${role}-dashboard.html`;
  } else {
    alert("Invalid credentials");
  }
}

// Add this check to each dashboard file at the top to restrict access
// Example in user-dashboard.html or script tag
/*
<script>
  if (!isAuthenticated('user')) {
    window.location.href = 'login.html';
  }
</script>
*/
