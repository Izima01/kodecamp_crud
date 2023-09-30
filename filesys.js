const fs = require('fs');

// fs.writeFile('sample.doc', 'This is a sample file', (err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('File created sucessfully');
// });

// fs.readFile('sample.doc', (err, data) => {
//     if (err) {
//         console.log('An error occured', err);
//         return;
//     }
//     console.log(data.toString());
// })

// fs.unlink('sample.doc', (err) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log('Deleted successfully');
// })

// fs.mkdir('css', err => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('Folder created');
// });


fs.writeFile('./css/styles.css', 'h1{ \n    font-size: 24px;\n    color:red;\n}', err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('File created');
})