/**
 * Created by zenghongtu on 08/09/2018
 * Desc: data.js
 */

var fs = require('fs');
var faker = require('faker');

function generate(num) {
    const siteInfo = [];
    const tags = [];
    const categories = [];
    const articles = [];
    let _n = num;
    while (_n--) {
        var _date = new Date(faker.date.between('2018-08-12T21:34:21.389Z', '2018-09-12T21:34:21.389Z')).toISOString().slice(0, 10);
        var _visitorNum = faker.random.number({min: 200, max: 1000});
        var _pageNum = faker.random.number({min: 200, max: 1000});
        siteInfo.push({
            date: _date,
            visitorNum: _visitorNum,
            pageNum: _pageNum
        });

        const _tag = faker.hacker.noun();
        tags.push(_tag);
        categories.push(_tag);
        const _title = faker.lorem.sentence();
        const _content = faker.lorem.paragraphs();
        const _viewsCount = faker.random.number({min: 10, max: 100});
        const _likeCount = faker.random.number({min: 10, max: 100});
        const _commentCount = faker.random.number({min: 10, max: 100});
        const _createdAt = faker.date.past();
        const _updatedAt = faker.date.recent();

        articles.push({
            id: _n,
            title: _title,
            content: _content,
            viewsCount: _viewsCount,
            likeCount: _likeCount,
            commentCount: _commentCount,
            updatedAt: _updatedAt,
        });
    }
    return {
        siteInfo,
        login: {
            isAuthenticated: true,
            data: 'token'
        },
        profile: {
            message: 'ok'
        },
        tags,
        categories,
        articles
    }
}


fs.writeFile(__dirname + '/mockData.json', JSON.stringify(generate(20)), function () {
    console.log("mockData generated successfully!");
});
