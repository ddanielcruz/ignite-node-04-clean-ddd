import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

export interface AnswerQuestionUseCaseInput {
  instructorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
}

export interface AnswerQuestionUseCaseOutput {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private readonly answersRepo: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseInput): Promise<AnswerQuestionUseCaseOutput> {
    const answer = new Answer({
      authorId: instructorId,
      questionId,
      content,
    })

    await this.answersRepo.create(answer)

    return { answer }
  }
}
