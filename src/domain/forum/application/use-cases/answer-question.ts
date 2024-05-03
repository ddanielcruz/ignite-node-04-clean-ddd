import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

export interface AnswerQuestionUseCaseParams {
  instructorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private readonly answersRepo: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseParams) {
    const answer = new Answer({
      authorId: instructorId,
      questionId,
      content,
    })

    await this.answersRepo.create(answer)

    return { answer }
  }
}
