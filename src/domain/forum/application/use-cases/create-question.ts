import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

export interface CreateQuestionUseCaseInput {
  authorId: string
  title: string
  content: string
}

export interface CreateQuestionUseCaseOutput {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private readonly questionsRepo: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseInput): Promise<CreateQuestionUseCaseOutput> {
    const question = new Question({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    await this.questionsRepo.create(question)

    return { question }
  }
}
