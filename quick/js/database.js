// Initialize database
function initDatabase() {
  if (!localStorage.getItem('tickets')) {
    localStorage.setItem('tickets', JSON.stringify([]));
  }
  if (!localStorage.getItem('users')) {
    const users = [
      { id: 'user1', email: 'customer@example.com', name: 'John Customer', role: 'customer' },
      { id: 'admin1', email: 'admin@example.com', name: 'Admin User', role: 'admin' },
      { id: 'agent1', email: 'agent1@example.com', name: 'Support Agent', role: 'agent', team: 'Support' }
    ];
    localStorage.setItem('users', JSON.stringify(users));
  }
}

// Generic data functions
function getTickets() {
  return JSON.parse(localStorage.getItem('tickets')) || [];
}

function saveTickets(tickets) {
  localStorage.setItem('tickets', JSON.stringify(tickets));
  localStorage.setItem('ticketsLastUpdated', Date.now());
}

function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}