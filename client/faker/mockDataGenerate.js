/**
 * Created by zenghongtu on 03/09/2018.
 * Desc: articles
 */

const faker = require('faker');
const fs = require('fs');
const generateMockData = (count = 30) => {
    let i = faker.random.number({min: 20, max: count});

    const articles = [];
    const categories = [];
    const tags = [];
    const titles = [];
    const books = [];
    const projects = {create: [], contribute: []};

    while (i--) {
        const _title = faker.lorem.sentence();
        const _content = faker.lorem.paragraphs();
        const _viewsCount = faker.random.number({min: 10, max: 100});
        const _likeCount = faker.random.number({min: 10, max: 100});
        const _commentCount = faker.random.number({min: 10, max: 100});
        const _createdAt = faker.date.past();
        const _updatedAt = faker.date.recent();

        articles.push({
            id: i,
            title: _title,
            content: _content,
            viewsCount: _viewsCount,
            likeCount: _likeCount,
            commentCount: _commentCount,
            createdAt: _createdAt,
            updatedAt: _updatedAt
        });

        const _tag = faker.hacker.noun();
        const _category = faker.hacker.adjective();
        const _title_ = faker.lorem.sentence();

        categories.push(_tag);
        tags.push(_category);
        titles.push(_title_);

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

        books.push({title: _booktitle, authors: _authors, articles: _articles});

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
                name: _projectName,
                url: _projectUrl,
                star: _starNum,
                fork: _forkNum,
                desc: _projectDesc,
                articles: _projectArticles
            })
            :
            projects.contribute.push({
                name: _projectName,
                url: _projectUrl,
                star: _starNum,
                fork: _forkNum,
                desc: _projectDesc,
                articles: _projectArticles
            })
    }

    const _slogan = faker.lorem.sentence();
    const aboutInfo = {slogan: _slogan};

    const _visitorNum = faker.random.number({min: 200, max: 1000});  //  访问总人数
    const _pageNum = faker.random.number({min: 200, max: 1000});  //  总浏览量
    const _viewNum = faker.random.number({min: 200, max: 1000});  //  某一 ip 访问总次数
    const _runtime = faker.random.number({min: 200, max: 1000}); // 本站运行时间 (秒)
    const _imageUrl = faker.image.avatar(); // 本站运行时间 (秒)
    const siteInfo = {
        visitorNum: _visitorNum,
        pageNum: _pageNum,
        viewNum: _viewNum,
        runtime: _runtime,
        imgUrl: 'https://cn.bing.com/az/hprichbg/rb/BrazilianPine_ZH-CN10573180887_1920x1080.jpg'
    };

    return {
        articles,
        sidebar: {
            categories,
            tags,
            titles,
        },
        books,
        projects,
        aboutInfo,
        siteInfo
    }
};


fs.writeFile(__dirname + '/mockData.json', JSON.stringify(generateMockData(40)), function () {
    console.log("mockData generated successfully!");
});
