import request from 'supertest';
import app from '../app';
import {createConnection, getConnection} from 'typeorm';

describe('Test NewsController', () => {
  beforeAll(async ()=>{
    await createConnection();
  });

  afterAll(async ()=>{
    await getConnection().close(); 
  });

  const news = [
    {title: 'title1', body: 'body1', isViewed: false},
    {title: 'title2', body: 'body2', isViewed: false}
  ];

  it('Request /api/news should post one news', async () => {
    const result1 = await request(app).post('/api/news').send(news[0]);
    const result2 = await request(app).post('/api/news').send(news[1]);

    expect(result1.status).toBe(200);
    expect(result2.status).toBe(200);
  });


  it('Request /api/news should return news', async () => {
    const result = await request(app).get('/api/news').send();

    expect(result.status).toBe(200);
    expect(result.body[0].title).toBe(news[0].title);
    expect(result.body[0].body).toBe(news[0].body);
    expect(result.body[1].title).toBe(news[1].title);
    expect(result.body[1].body).toBe(news[1].body);
  });

  it('Request /api/news should return news by id', async () => {
    const result = await request(app).get('/api/news/1').send();

    expect(result.status).toBe(200);
    expect(result.body.title).toBe(news[0].title);
    expect(result.body.body).toBe(news[0].body);
  });

  it('Request /api/news should update news by id', async () => {
    const newNews = {title: 'newTitle', body: 'newBody', isViewed: true};
    const result = await request(app).put('/api/news/1').send(newNews);

    expect(result.status).toBe(200);
    expect(result.body[0].title).toBe(newNews.title);
    expect(result.body[0].body).toBe(newNews.body);
  });

  it('Request /api/news should delete news by id', async () => {
    const result = await request(app).delete('/api/news/1').send();

    expect(result.status).toBe(200);
  });
});
