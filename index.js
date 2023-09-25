const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/AuthRout');
const productRoute = require('./routes/productRoute');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
mongoose.connect('mongodb+srv://chhewanglama:LamaLama@cluster0.mczgxgs.mongodb.net/shopy').then(() => {
  app.listen(5000)
}).catch((err) => {
  console.log(err)

})

app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  abortOnLimit: true,
  createParentPath: true
}))

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(authRoute);
app.use(productRoute);

// app.get('/', (req, res) => {
//   // return res.send('hello');
//   return res.status(404).sendFile('index.html', { root: __dirname })
// });


app.use((req, res) => {
  return res.status(404).json({
    status: 'error',
    message: 'not found'
  });
});