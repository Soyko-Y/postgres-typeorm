import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { News } from '../entity/News';

export const createNews = async (req: Request, res: Response) => {
  let news = new News();
  news = { ...req.body };

  const newsRepository = getRepository(News);

  await newsRepository.save(news);
  res.send(news);
};

export const getAllNews = async (req: Request, res: Response) => {
  const newsRepository = getRepository(News);

  const allNews = await newsRepository.find();
  res.send(allNews);
};

export const getNewsById = async (req: Request, res: Response) => {
  const newsRepository = getRepository(News);

  const news = await newsRepository.findOne({
    id: Number(req.params.id)
  });

  res.send(news);
};

export const updateNewsById = async (req: Request, res: Response) => {
  const { title, body, isViewed } = req.body;
  const newsRepository = getRepository(News);

  await newsRepository.update(Number(req.params.id), {
    title,
    body,
    isViewed
  });

  const updatedNews = await newsRepository.find({
    id: Number(req.params.id)
  });

  res.send(updatedNews);
};

export const deleteNewsById = async (req: Request, res: Response) => {
  const newsRepository = getRepository(News);

  const news = await newsRepository.find({
    id: Number(req.params.id)
  });

  await newsRepository.remove(news);

  res.send(`News id ${req.params.id} has been deleted.`);
};
