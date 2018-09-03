/**
 * Created by zenghongtu on 03/09/2018.
 * Desc: articles
 */

const faker = require('faker/locale/zh_CN');
const fs = require('fs');
const generateArticles = (count = 30) => {
    const articles = [];

    let i = count;
    while (i--) {
        const title = faker.lorem.sentence();
        const content = faker.lorem.paragraphs();
        const viewsCount = faker.random.number({max: 100});
        const likeCount = faker.random.number({max: 100});
        const createdAt = faker.date.past();
        const updatedAt = faker.date.recent();

        articles.push({
            id: i,
            title,
            content,
            viewsCount,
            likeCount,
            createdAt,
            updatedAt
        })
    }
    return {
        articles
    }

};


fs.writeFile(__dirname + '/articles.json', JSON.stringify(generateArticles(30)), function () {
    console.log("articles generated successfully!");
});
