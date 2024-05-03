import { QuestionsRepository } from '../repositories/questions-repository'

export interface DeleteQuestionUseCaseInput {
  authorId: string
  questionId: string
}

export type DeleteQuestionUseCaseOutput = void

export class DeleteQuestionUseCase {
  constructor(private readonly questionsRepo: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseInput): Promise<DeleteQuestionUseCaseOutput> {
    const question = await this.questionsRepo.findById(questionId)
    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.questionsRepo.delete(question)
  }
}
