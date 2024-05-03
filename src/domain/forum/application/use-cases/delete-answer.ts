import { AnswersRepository } from '../repositories/answers-repository'

export interface DeleteAnswerUseCaseInput {
  authorId: string
  answerId: string
}

export type DeleteAnswerUseCaseOutput = void

export class DeleteAnswerUseCase {
  constructor(private readonly answersRepo: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseInput): Promise<DeleteAnswerUseCaseOutput> {
    const question = await this.answersRepo.findById(answerId)
    if (!question) {
      throw new Error('Answer not found.')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.answersRepo.delete(question)
  }
}
