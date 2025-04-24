const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const programRoutes = require('./routes/programs');
const clientRoutes = require('./routes/clients');
const apiRoutes = require('./routes/api');
const app = express();
const PORT = 5000;




app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/programs', programRoutes);
app.use('/clients', clientRoutes);
app.use('/api', apiRoutes);
app.use(express.static('public'));


// Home
app.get('/', (req, res) => {
  res.send('Welcome to the CEMA Health System API');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
