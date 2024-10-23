const fs = require('fs');
const path = require('path'); // <--- 여기!!!

const directoryPath = '../3.function';

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.log("읽기 실패!!", err.message);
        return;
    }
    
    console.log(files);
    console.log(files[0]);
    files.forEach((file) => {
        const filePath = path.join(directoryPath, file); // <--- 여기!!!
        fs.readFile(filePath, 'utf8', (err, data) => {   // <--- 여기!!!
            if (err) {
                console.log("파일 내용 읽기 실패", err.message);
                return;
            }
            console.log(data);
        })    
    })
});
