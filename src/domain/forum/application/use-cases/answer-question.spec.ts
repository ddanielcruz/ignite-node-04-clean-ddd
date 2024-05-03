import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswersRepository: AnswersRepository = {
  async create() {},
}

describe('AnswerQuestion', () => {
  let sut: AnswerQuestionUseCase

  beforeEach(() => {
    sut = new AnswerQuestionUseCase(fakeAnswersRepository)
  })

  it('should answer the question', async () => {
    const { answer } = await sut.execute({
      content: 'any_content',
      instructorId: new UniqueEntityId('any_instructor_id'),
      questionId: new UniqueEntityId('any_question_id'),
    })

    expect(answer.content).toBe('any_content')
    expect(answer.authorId.equals('any_instructor_id')).toBe(true)
    expect(answer.questionId.equals('any_question_id')).toBe(true)
  })
})
