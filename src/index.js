// Entry point for the API server
const app = require('./app');
const PORT = process.env.PORT || 3000;

// Start the server - listen on all interfaces for container/cloud compatibility
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} on all interfaces`);
});