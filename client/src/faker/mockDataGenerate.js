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
        });

        books.push({title: _booktitle, authors: _authors, articles: _articles})
    }
    return {
        articles,
        sidebar: {
            categories,
            tags,
            titles,
        },
        books
    }

};


fs.writeFile(__dirname + '/mockData.json', JSON.stringify(generateMockData(40)), function () {
    console.log("mockData generated successfully!");
});
