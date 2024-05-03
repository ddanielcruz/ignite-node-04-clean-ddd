import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { AnswerQuestionUseCase } from './answer-question'

let sut: AnswerQuestionUseCase
let inMemoryAnswersRepo: InMemoryAnswersRepository

describe('AnswerQuestion', () => {
  beforeEach(() => {
    inMemoryAnswersRepo = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepo)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      content: 'any_content',
      instructorId: new UniqueEntityId('any_instructor_id'),
      questionId: new UniqueEntityId('any_question_id'),
    })

    expect(answer.content).toBe('any_content')
    expect(answer.authorId.equals('any_instructor_id')).toBe(true)
    expect(answer.questionId.equals('any_question_id')).toBe(true)
    expect(inMemoryAnswersRepo.answers[0].id.equals(answer.id)).toBe(true)
  })
})
