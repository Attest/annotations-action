import { Annotation } from '@/annotation'

export type AnnotationsConclusion = 'success' | 'failure' | 'neutral'

export class Annotations extends Array<Annotation> {
  public static fromJSON(json: string): Annotations {
    return new Annotations(...JSON.parse(json))
  }

  public hasFailure(): boolean {
    return this.some(annotation => annotation.level === 'failure')
  }

  public hasWarning(): boolean {
    return this.some(annotation => annotation.level === 'warning')
  }

  public get failures(): Annotation[] {
    return this.filter(annotation => annotation.level === 'failure')
  }

  public get warnings(): Annotation[] {
    return this.filter(annotation => annotation.level === 'warning')
  }

  public get notices(): Annotation[] {
    return this.filter(annotation => annotation.level === 'notice')
  }

  public get conclusion(): AnnotationsConclusion {
    if (this.length === 0) return 'success'
    if (this.hasFailure()) return 'failure'
    if (this.hasWarning()) return 'neutral'
    return 'success'
  }
}
