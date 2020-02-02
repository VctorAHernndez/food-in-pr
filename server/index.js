const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV === 'production') {
    app.get('/', path.join(__dirname, '../client/build/index.html'));
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use("/api/restaurants", require("./routes/api/restaurants"));

app.listen(PORT, () => console.log('Started server at port ' + PORT));