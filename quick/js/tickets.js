// Ticket operations
function createNewTicket(ticketData) {
  const tickets = getTickets();
  const newTicket = {
    id: 'T-' + Date.now(),
    ...ticketData,
    status: 'Open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    replies: [],
    slaStatus: 'On Time'
  };
  tickets.push(newTicket);
  saveTickets(tickets);
  notifyNewTicket(newTicket);
  return newTicket;
}

function assignTicket(ticketId, agentId) {
  const tickets = getTickets();
  const ticketIndex = tickets.findIndex(t => t.id === ticketId);
  
  if (ticketIndex !== -1) {
    tickets[ticketIndex].assignedTo = agentId;
    tickets[ticketIndex].status = 'Assigned';
    tickets[ticketIndex].updatedAt = new Date().toISOString();
    saveTickets(tickets);
    notifyAssignment(tickets[ticketIndex]);
    return true;
  }
  return false;
}

// Add other ticket functions...