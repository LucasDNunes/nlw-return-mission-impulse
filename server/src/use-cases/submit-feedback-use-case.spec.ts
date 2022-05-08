import {SubmitFeedbackUseCase} from "./submit-feedback-use-case";

describe('submit feedback', () => {

  const createFeedbackSpy = jest.fn();
  const sendMailSpy = jest.fn();

  const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy },
    {sendMail: sendMailSpy }
  );

  it('should be able submit a feedback', async () => {

    await expect(submitFeedback.execute({
      type:'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64teste.jpg',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledTimes(1);
    expect(sendMailSpy).toHaveBeenCalledTimes(1)
  });

  it('should not be able submit a feedback without type', async () => {

    await expect(submitFeedback.execute({
      type:'',
      comment: 'example comment',
      screenshot: 'data:image/png;base64teste.jpg',
    })).rejects.toThrow();
  });

  it('should not be able submit a feedback without comment', async () => {

    await expect(submitFeedback.execute({
      type:'BUG',
      comment: '',
      screenshot: 'data:image/png;base64teste.jpg',
    })).rejects.toThrow();
  });

  it('should not be able submit a feedback with an invalid screenshot', async () => {

    await expect(submitFeedback.execute({
      type:'BUG',
      comment: 'Ta tudo bugado',
      screenshot: 'teste.jpg',
    })).rejects.toThrow();
  });
})