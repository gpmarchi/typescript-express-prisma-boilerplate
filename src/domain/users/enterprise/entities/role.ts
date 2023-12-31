import { Entity } from '@/shared/entities/entity'
import { UniqueEntityID } from '@/shared/entities/value-objects/unique-entity-id'
import { Optional } from '@/shared/types/optional'
import { Slug } from './value-objects/slug'

export interface RoleProps {
  slug: Slug
  title: string
  description: string
  permissions: UniqueEntityID[]
  createdAt: Date
  updatedAt?: Date
}

export class Role extends Entity<RoleProps> {
  get slug() {
    return this.props.slug
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)

    this.update()
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description

    this.update()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private update() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<RoleProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    const role = new Role(
      {
        ...props,
        slug: Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    )

    return role
  }
}
