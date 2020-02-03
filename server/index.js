const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use("/api/restaurants", require("./routes/api/restaurants"));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

app.listen(PORT, () => console.log('Started server at port ' + PORT));