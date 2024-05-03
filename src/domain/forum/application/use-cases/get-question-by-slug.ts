import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

export interface GetQuestionBySlugUseCaseInput {
  slug: string
}

export interface GetQuestionBySlugUseCaseOutput {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private readonly questionsRepo: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseInput): Promise<GetQuestionBySlugUseCaseOutput> {
    const question = await this.questionsRepo.findBySlug(slug)

    // TODO Use a custom error
    if (!question) {
      throw new Error('Question not found.')
    }

    return { question }
  }
}
