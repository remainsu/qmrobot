var fs = require("fs");
var readLine = require("readline");

function getHttpString(s) {
    var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    //var reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    //var reg=/(http(s)?\:\/\/)?(www\.)?(\w+\:\d+)?(\/\w+)+\.(swf|gif|jpg|bmp|jpeg)/gi;
    //var reg=/(http(s)?\:\/\/)?(www\.)?(\w+\:\d+)?(\/\w+)+\.(swf|gif|jpg|bmp|jpeg)/gi;
    var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    //var reg= /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
    //v = v.replace(reg, "<a href='$1$2'>$1$2</a>"); //这里的reg就是上面的正则表达式
    //s = s.replace(reg, "$1$2"); //这里的reg就是上面的正则表达式
    s = s.match(reg);
    console.log(s)
    return (s)
}

//随机数
function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
}

/**
 * 按行读取文件内容
 *
 * @param fReadName 文件名路径
 * @param cb 回调函数
 *
 * @return 字符串数组
 */
function readFileToArr(fReadName, cb) {

    var arr = [];
    var readObj = readLine.createInterface({
        input: fs.createReadStream(fReadName)
    });

    readObj.on('line', function (line) {
        arr.push(line);
    });
    readObj.on('close', function () {
        console.log('readLine close....');
        cb(arr);
    }); 
}

module.exports = {
    getHttpString,
    random,
    readFileToArr,
}