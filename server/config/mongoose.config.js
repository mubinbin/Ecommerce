const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mern_project_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(()=>console.log('Connected to database successfully!'))
    .catch(err => console.log("No, there are errors" + err));