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
    const books = [];
    const projects = {create: [], contribute: []};

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
        const _desc = faker.lorem.paragraphs();
        const _paragraphs = faker.lorem.paragraphs(faker.random.number({min: 10, max: 25}));
        const _viewsCount = faker.random.number({min: 10, max: 100});
        const _likeCount = faker.random.number({min: 10, max: 100});
        const _commentCount = faker.random.number({min: 10, max: 100});
        const _createdAt = faker.date.past();
        const _updatedAt = faker.date.recent();
        const _is_publish = faker.random.boolean();

        articles.push({
            id: _n,
            title: _title,
            content: _paragraphs,
            des: _desc,
            viewsCount: _viewsCount,
            likeCount: _likeCount,
            commentCount: _commentCount,
            updatedAt: _updatedAt,
            is_publish: _is_publish
        });

        const _booktitle = faker.lorem.sentence();
        let j = faker.random.number({min: 1, max: 3});
        const _articles = [];
        const _authors = [];
        while (j--) {
            const _article = faker.lorem.sentence();
            const _author = faker.name.firstName() + faker.name.lastName();
            _articles.push({article: _article, id: j});
            _authors.push(_author)
        }
        books.push({id: _n, title: _booktitle, authors: _authors, articles: _articles});

        const _projectName = faker.name.title();
        const _projectUrl = faker.internet.url();
        const _starNum = faker.random.number({min: 100, max: 1000});
        const _forkNum = faker.random.number({min: 100, max: 1000});
        const _projectDesc = faker.lorem.sentence();
        const _projectArticles = [];
        let k = faker.random.number({min: 1, max: 3});
        while (k--) {
            const _article = faker.lorem.sentence();
            _projectArticles.push({article: _article, id: k});
        }
        faker.random.boolean() ?
            projects.create.push({
                id: _n,
                name: _projectName,
                url: _projectUrl,
                star: _starNum,
                fork: _forkNum,
                desc: _projectDesc,
                articles: _projectArticles
            })
            :
            projects.contribute.push({
                id: _n,
                name: _projectName,
                url: _projectUrl,
                star: _starNum,
                fork: _forkNum,
                desc: _projectDesc,
                articles: _projectArticles
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
        articles,
        books,
        projects
    }
}


fs.writeFile(__dirname + '/mockData.json', JSON.stringify(generate(20)), function () {
    console.log("mockData generated successfully!");
});
