import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  questions: Question[] = []

  async create(question: Question): Promise<void> {
    this.questions.push(question)
  }

  async delete(question: Question): Promise<void> {
    this.questions = this.questions.filter((q) => !q.id.equals(question.id))
  }

  async findById(id: string | UniqueEntityId): Promise<Question | null> {
    return this.questions.find((q) => q.id.toString() === id.toString()) ?? null
  }

  async findBySlug(slug: string | Slug): Promise<Question | null> {
    return this.questions.find((q) => q.slug.value === slug.toString()) ?? null
  }
}
