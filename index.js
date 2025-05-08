
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
//  post director
import checkIn from './routers/post/checkIn.js';
import cancelCheckIn from './routers/post/cancelCheckIn.js';
import checkOut from './routers/post/checkOut.js';
import CreatUser from './routers/post/createUser.js';
import Login from './routers/post/login.js'
import router_Record from   './routers/get/existingRecord.js';
import getUser from './routers/get/users.js'
import router_Excel from './routers/TOExcelSheet/attendanceExport.js';
import router_IsUserPresentToday from './routers/get/isUserPresentToday.js';
import gradePromotionRouter from './routers/post/gradePromotion.js';
import { addStudentsSmart } from './routers/addFackStudents.js'; // عدّل المسار حسب مكان الملف
const app = express();
const port = 5000;
app.use(express.json());
// https://attendance-log-school.vercel.app
const corsOptions= {
    origin : "*",
    optionsSuccessStatus: 200,
}
app.use((req, res, next) => {
    const contentLength = parseInt(req.get('content-length'), 10);
    console.log(`حجم البيانات: ${contentLength} bytes`);
    next();
  });

app.use(cors(corsOptions));
connectDB();


//--------------post router----------//
//create an account 
app.use("/api" ,CreatUser());
app.use("/api" ,Login());
//handle presence and departure
app.use("/api" ,checkIn());
app.use("/api" ,cancelCheckIn());
app.use("/api" ,checkOut());
//handle grade promotion
app.use("/api/gradePromotionRouter" ,gradePromotionRouter);

// -------------get router----------//
app.use("/api/router_IsUserPresentToday" ,router_IsUserPresentToday);
app.use("/api/router_Record" ,router_Record);
app.use("/api/getUser" ,getUser);
app.use("/api/router_IsUserPresentToday" ,router_IsUserPresentToday);
//-----------------Excel sheet------------------//
app.use("/api/router_Excel" ,router_Excel);



app.get('/', (req, res) => {
    addStudentsSmart(); // Uncomment this line to seed students
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})