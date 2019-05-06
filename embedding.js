const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ref-doc1')
    .then(() => console.log('Connected to mongodb'))
    .catch(err => console.error('Could not connect to mongodb'));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});
const Author = mongoose.model('Author', authorSchema);
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: authorSchema,
        required: true
    }
}));
async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });
    const result = await course.save();
    console.log(result);
};
async function listCourse() {
    const course = await Course.find();
    console.log(course);
}
async function updateAuthor(courseId) {
    //First way
    /* const course = await Course.findById(courseId);
     course.author.name = 'Tarun Chawla'
     course.save();*/
    //Second way
    /* const course=await Course.update({_id:courseId},{
         $set:{
             'author.name':'Tarun Goel'
         }
     })*/
    //To remove a property completely
    const course = await Course.update({ _id: courseId }, {
        $unset: {
            'author': ''
        }
    })
}
createCourse('Node Js', new Author({ name: 'Tarun' }))
//updateAuthor('5cd015d3a4f9cd528ce58567');
