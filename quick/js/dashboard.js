// Update all dashboards
function updateAllDashboards() {
  // In a real app, this would use WebSockets or similar real-time tech
  console.log('Updating all dashboards...');
  
  // Get current user
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  // Update views based on user role
  if (currentUser) {
    switch(currentUser.role) {
      case 'admin':
        updateAdminDashboard();
        break;
      case 'agent':
        updateAgentDashboard(currentUser.email);
        break;
      case 'customer':
        updateCustomerDashboard(currentUser.email);
        break;
    }
  }
  
  // Update all report data
  updateReportData();
}

// Update admin dashboard
function updateAdminDashboard() {
  const tickets = JSON.parse(localStorage.getItem('tickets'));
  
  // Update ticket lists
  const openTickets = tickets.filter(t => t.status === 'Open');
  const assignedTickets = tickets.filter(t => t.status === 'Assigned' || t.status === 'In Progress');
  
  // Update UI elements
  document.getElementById('openTicketsCount').textContent = openTickets.length;
  document.getElementById('assignedTicketsCount').textContent = assignedTickets.length;
  
  // Refresh ticket tables if they're visible
  if (document.getElementById('adminTicketsView').style.display !== 'none') {
    renderAdminTicketsTable();
  }
}

// Update agent dashboard
function updateAgentDashboard(agentEmail) {
  const tickets = JSON.parse(localStorage.getItem('tickets'));
  
  // Get agent's assigned tickets
  const myTickets = tickets.filter(t => t.assignedTo === agentEmail && 
    (t.status === 'Assigned' || t.status === 'In Progress'));
  
  // Update UI elements
  document.getElementById('myTicketsCount').textContent = myTickets.length;
  
  // Refresh ticket tables if they're visible
  if (document.getElementById('agentTicketsView').style.display !== 'none') {
    renderAgentTicketsTable();
  }
}

// Update report data
function updateReportData() {
  const tickets = JSON.parse(localStorage.getItem('tickets'));
  const users = JSON.parse(localStorage.getItem('users'));
  
  // Calculate performance metrics
  const agents = users.filter(u => u.role === 'agent');
  
  agents.forEach(agent => {
    const agentTickets = tickets.filter(t => t.assignedTo === agent.email);
    const resolvedTickets = agentTickets.filter(t => t.status === 'Resolved' || t.status === 'Closed');
    
    // Calculate performance stats
    const performanceStats = {
      ticketCount: agentTickets.length,
      resolvedCount: resolvedTickets.length,
      resolutionRate: agentTickets.length > 0 ? 
        Math.round((resolvedTickets.length / agentTickets.length) * 100) : 0,
      avgResolutionTime: calculateAvgResolutionTime(agentTickets),
      avgRating: calculateAvgRating(agentTickets)
    };
    
    // Update agent's performance stats
    const userIndex = users.findIndex(u => u.email === agent.email);
    if (userIndex !== -1) {
      users[userIndex].performanceStats = performanceStats;
    }
  });
  
  // Save updated user data
  localStorage.setItem('users', JSON.stringify(users));
  
  // Refresh reports if they're visible
  if (document.getElementById('adminReportsView').style.display !== 'none') {
    renderAdminReports();
  }
  if (document.getElementById('agentReportsView').style.display !== 'none') {
    renderAgentReports();
  }
}