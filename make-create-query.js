const fs = require('fs');

const testFolder = './result/b2';

fs.readdir(testFolder, (err, files) => {
  files.forEach(fileName => {
    const filePath = testFolder + '/' + fileName

    fs.readFile(filePath, 'utf8', (err, data) => {
      const content = `db.sets.insert({
        "_id": new ObjectId(),
        "imgUrl": "https://static.lazyvaccine.com/6485262474387409_6414323875499894_1657862373749.png",
        "name": "${fileName.substring(0, fileName.lastIndexOf('.')).replace("B2", "B1, B2")}",
        "categoryId": ObjectId("626e52d97344a674023aeb10"),
        "description": "Bộ đề thi bằng lái xe B1, B2 này được xây dựng theo tài liệu 600 câu hỏi thi ô tô Tổng Cục Đường Bộ VN ban hành. Nếu học thuộc hết 18 đề thi thử bằng lái xe B2 này đồng nghĩa với việc bạn sẽ nắm chắc việc thi đậu lý thuyết 100% mà không cần phải lo lắng.",
        "tags": [
          "sát hạch",
          "lái xe",
          "b1",
          "b2",
          "600 câu"
        ],
        "fromLanguage": "vi",
        "toLanguage": "vi",
        "items": ${data.replace(/"new ObjectId\(\)"/g, "new ObjectId()")},
        "creatorId": ObjectId("61ced7be4d51dc003e3615a8"),
        "lastUpdated": new Date(),
        "delFlag": false
      })`;

      fs.writeFile(filePath, content, err => {
        if (err) {
          console.error(err);
        }
        console.log("write: " + fileName)
      });
    });
  });
});
