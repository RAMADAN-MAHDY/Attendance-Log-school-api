
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
//  post director
import checkIn from './routers/post/checkIn.js';
import checkOut from './routers/post/checkOut.js';
import CreatUser from './routers/post/createUser.js';
import Login from './routers/post/login.js'
import router_Record from   './routers/get/existingRecord.js';
import getUser from './routers/get/users.js'
import router_Excel from './routers/TOExcelSheet/attendanceExport.js';
import router_IsUserPresentToday from './routers/get/isUserPresentToday.js';
const app = express();
const port = 5000;
app.use(express.json());

const corsOptions= {
    origin : "http://localhost:3000",
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
app.use("/api" ,checkOut());

// -------------get router----------//
app.use("/api/router_Record" ,router_Record);
app.use("/api/getUser" ,getUser);
app.use("/api/router_Excel" ,router_Excel);
app.use("/api/router_IsUserPresentToday" ,router_IsUserPresentToday);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})