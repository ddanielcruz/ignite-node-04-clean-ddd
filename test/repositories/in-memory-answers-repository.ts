import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  answers: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    this.answers = this.answers.filter((a) => !a.id.equals(answer.id))
  }

  async findById(id: string | UniqueEntityId): Promise<Answer | null> {
    return this.answers.find((a) => a.id.toString() === id.toString()) ?? null
  }
}
