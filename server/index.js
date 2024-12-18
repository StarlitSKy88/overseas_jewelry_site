const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const productRoutes = require('./routes/products');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 路由
app.use('/api/products', productRoutes);

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 数据库同步和服务器启动
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');

    // 同步数据库模型（开发环境可以使用 force: true 来重置数据库）
    await sequelize.sync({ alter: true });
    console.log('数据库模型同步完成');

    app.listen(port, () => {
      console.log(`服务器运行在端口 ${port}`);
    });
  } catch (error) {
    console.error('无法启动服务器:', error);
    process.exit(1);
  }
}

startServer();