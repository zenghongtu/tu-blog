import app from '../app/index';
import supertest from 'supertest';
import {expect, should} from 'chai';

const request = supertest.agent(app.listen());

const temp = {
    name: 'tu',
    password: '123',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTM0ZjEzODZmNDkxMjIzNmVkYjUwYiIsIm5hbWUiOiJ0dSIsInJvbGUiOjAsImlhdCI6MTUzNzQzMjg5MywiZXhwIjoxNTM3NDc2MDkzfQ.acy1Outhpwd8dm4EQCMKV7slN4DbG0XxzCxoUuwJ0QE',
    _id: "5ba35efad039e72523adf788",
    categories: [],
    tags: [],
    articles: [],
};


// describe('POST /users', () => {
//     it('should name equal and password not equal', done => {
//         request
//             .post('/users')
//             .set('Accept', 'application/json')
//             .send({
//                 "name": temp.name,
//                 "email": "zenghongtu@gmail.com",
//                 "password": temp.password
//             })
//             .expect(200, (err, res) => {
//                 const _body = res.body
//                 expect(_body.name).to.be.equal(temp.name)
//                 expect(_body.password).to.not.be.equal(temp.password)
//                 done();
//             });
//     });
// });

// describe('POST /authenticate', () => {
//     it('should get token', done => {
//         request
//             .post('/authenticate')
//             .set('Accept', 'application/json')
//             .send({
//                 name: temp.name,
//                 password: temp.password,
//             })
//             .expect(200, (err, res) => {
//                 expect(res.body.token).to.be.a('string').not.to.be.empty;
//                 temp.token = res.body.token;
//                 done();
//             });
//     });
// });

// describe('POST /categories', () => {
//     it('should add categories', done => {
//         let i = 5;
//         while (i--) {
//             request
//                 .post('/categories')
//                 .set('Accept', 'application/json')
//                 .set('Authorization', `Bearer ${temp.token}`)
//                 .set('Accept', 'application/json')
//                 .send({
//                     "name": 'cat' + i
//                 })
//                 .expect(200, (err, res) => {
//                     expect(res.body).to.be.an('object').not.to.empty;
//                 });
//         }
//         done()
//     });
// });


// describe('POST /tags', () => {
//     it('should add tags', done => {
//         let i = 5;
//         while (i--) {
//             request
//                 .post('/tags')
//                 .set('Accept', 'application/json')
//                 .set('Authorization', `Bearer ${temp.token}`)
//                 .set('Accept', 'application/json')
//                 .send({
//                     "name": 'tag' + i
//                 })
//                 .expect(200, (err, res) => {
//                     expect(res.body).to.be.an('object').not.to.empty;
//                 });
//         }
//         done()
//     });
// });


describe('GET /categories', () => {
    it('should get categories', done => {
        request
            .get('/categories')
            .set('_id', temp._id)
            .expect(200, (err, res) => {
                // const _id = res.headers._id
                // expect(_id).not.to.be.empty;
                // temp._id = _id
                const _body = res.body;
                expect(_body).not.to.be.empty;
                temp.categories = _body;
                done()
            });
    })
});

describe('GET /tags', () => {
    it('should get tags', done => {
        request
            .get('/tags')
            .set('_id', temp._id)
            .expect(200, (err, res) => {
                const _body = res.body;
                expect(_body).not.to.be.empty;
                temp.tags = _body;
                done()
            });
    })
});

describe('POST /articles', () => {
    it('should add article', done => {
        let i = 5;
        while (i--) {
            request
                .post('/articles')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${temp.token}`)
                .set('Accept', 'application/json')
                .send({
                    "title": "a test " + i + 60,
                    "desc": "this is a test" + i,
                    "body": "this is a body",
                    "category": temp.categories[i],
                    "tags": [
                        temp.tags[i]
                    ],
                    "isPublish": true
                })
                .expect(200, (err, res) => {
                    expect(res.body).to.be.an('object').not.to.empty;
                });
        }
        done()
    });
});

describe('GET /articles', () => {
    it('should get articles', done => {
        request
            .get('/articles')
            .set('_id', temp._id)
            .expect(200, (err, res) => {
                const _body = res.body;
                expect(_body).not.to.be.empty;
                temp.articles = _body;
                done()
            });
    })
});

describe('GET /site', () => {
    it('pv>=1 and uv>=1 and visits>=1', done => {
        request
            .get('/site')
            .set('_id', temp._id)
            .expect(200, (err, res) => {
                expect(res.body.site.pv).to.be.at.least(1);
                expect(res.body.site.uv).to.be.at.least(1);
                expect(res.body.visitor.visits).to.be.at.least(1);
                done();
            });
    });
});

