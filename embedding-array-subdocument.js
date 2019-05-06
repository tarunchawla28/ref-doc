const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ref-doc2')
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Could not connect to database'));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
})
const Author = mongoose.model('Author', authorSchema);
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: {
        type: [authorSchema],
        required: true
    }
}))

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });
    const result = await course.save();
    console.log(course);
}

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}
/*createCourse('Nodejs Course', [
    new Author({ name: 'Tarun Chawla' }),
    new Author({ name: 'Tarun Goel' })
])*/
//addAuthor('5cd02098c8ddcf31c4197236', new Author({ name: 'Amy' }))
removeAuthor('5cd02098c8ddcf31c4197236', '5cd02161310fcf4aa4771cd3')