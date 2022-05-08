import express from "express";
import {SubmitFeedbackUseCase} from "./use-cases/submit-feedback-use-case";
import {PrismaFeedbacksRepository} from "./repositories/prisma/prisma-feedbacks-repository";
import {NodemailerMailAdapeter} from "./adapters/nodemailer/nodemailer-mail-adapeter";


export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {

  const {type, comment, screenshot} = req.body;

  const prismaFeedbackRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapeter = new NodemailerMailAdapeter()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository, nodemailerMailAdapeter);

  const feedback = await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  });

  return res.status(201).json({data: feedback});
});