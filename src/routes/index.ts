import express, { Router } from 'express';
import path from 'path';
import sequelize from '../config/connectDB';
import userAPI from './user.route';
import noteAPI from './note.route';
import contentAPI from './content.route';

const router: Router = express.Router();
router.use(express.static(path.join(__dirname, 'public')));

router.use("/user", userAPI);
router.use("/note", noteAPI);
router.use("/content", contentAPI);

async function testConnection() {
  console.log(" check db");
  try {
    await sequelize.authenticate();
    console.log('Kết nối cơ sở dữ liệu thành công!', sequelize.getDatabaseName());
    await sequelize.sync({ force: true })
  } catch (error) {
    console.error('Không thể kết nối đến cơ sở dữ liệu:', error);
    await sequelize.sync({ force: true })
  }
}
router.get('/', (req, res) => {
  console.log(" check dqqb", testConnection());
  console.log("ckkk");
  console.log(req.body);
  res.send('Hello World!');
}
);


export default router;
