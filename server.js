const express          = require('express');
const dotenv           = require('dotenv');
const { sequelize }    = require('./models');
const authRoutes       = require('./routes/authRoutes');
const clientRoutes     = require('./routes/clientRoutes');
const menuRoutes       = require('./routes/menuRoutes');
const orderRoutes      = require('./routes/orderRoutes');
const authMiddleware   = require('./middlewares/authMiddleware');

dotenv.config();
const app = express();
app.use(express.json());

// Public (signup/login)
app.use('/api/auth', authRoutes);

// Protected
app.use('/api/clients', authMiddleware, clientRoutes);
app.use('/api/menu',    authMiddleware, menuRoutes);
app.use('/api/orders',  authMiddleware, orderRoutes);

sequelize.authenticate()
  .then(() => sequelize.sync())
  .then(() => app.listen(process.env.PORT||5000, () => console.log('Up on 5000')))
  .catch(err => console.error('Startup error:', err));
