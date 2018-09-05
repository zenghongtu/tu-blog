/**
 * Created by zenghongtu on 03/09/2018.
 * Desc: articles
 */

const faker = require('faker/locale/zh_CN');
const fs = require('fs');
const generateMockData = (count = 30) => {
    let i = faker.random.number({max: count});

    const articles = [];
    const categories = [];
    const tags = [];
    const titles = [];

    while (i--) {
        const _title = faker.lorem.sentence();
        const _content = faker.lorem.paragraphs();
        const _viewsCount = faker.random.number({min: 10, max: 100});
        const _likeCount = faker.random.number({min: 10, max: 100});
        const _commentCount = faker.random.number({min: 10, max: 100});
        const _createdAt = faker.date.past();
        const _updatedAt = faker.date.recent();

        const _tag = faker.hacker.noun();
        const _category = faker.hacker.adjective();
        const _title_ = faker.lorem.sentence();

        categories.push(_tag);
        tags.push(_category);
        titles.push(_title_);

        articles.push({
            id: i,
            title: _title,
            content: _content,
            viewsCount: _viewsCount,
            likeCount: _likeCount,
            commentCount: _commentCount,
            createdAt: _createdAt,
            updatedAt: _updatedAt
        })
    }
    return {
        articles,
        sidebar: {
            categories,
            tags,
            titles,
        }
    }

};


fs.writeFile(__dirname + '/mockData.json', JSON.stringify(generateMockData(30)), function () {
    console.log("mockData generated successfully!");
});
