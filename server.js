const express = require('express');
// create connection
const db = require('./db/connection');
const apiRoutes = require('./routes/index');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Not Found response for unmatched routes
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
// db.connect(err => {
//   if (err) throw err;
//   console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
// });
