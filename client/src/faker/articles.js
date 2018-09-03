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
        const sentence = faker.lorem.sentence();
        const paragraphs = faker.lorem.paragraphs();

        articles.push({
            id: i,
            sentence,
            paragraphs
        })
    }
    return {
        articles
    }

};


fs.writeFile(__dirname + '/articles.json', JSON.stringify(generateArticles(50)), function () {
    console.log("articles generated successfully!");
});
