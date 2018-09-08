/**
 * Created by zenghongtu on 08/09/2018
 * Desc: data.js
 */

var fs = require('fs');
var faker = require('faker');

function generate(num) {
    const siteInfo = [];
    let _n = num;
    while (_n--) {
        var _date = new Date(faker.date.between('2018-08-12T21:34:21.389Z', '2018-09-12T21:34:21.389Z')).toISOString().slice(0, 10);
        var _visitorNum = faker.random.number({min: 200, max: 1000});
        var _pageNum = faker.random.number({min: 200, max: 1000});
        siteInfo.push({
            date: _date,
            visitorNum: _visitorNum,
            pageNum: _pageNum
        })
    }
    return {siteInfo}
}


fs.writeFile(__dirname + '/mockData.json', JSON.stringify(generate(20)), function () {
    console.log("mockData generated successfully!");
});
