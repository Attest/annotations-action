export interface Annotation {
  message: string
  path: string
  line?: AnnotationSourcePositionReference
  column?: AnnotationSourcePositionReference
  level: AnnotationLevel
}

export type AnnotationLevel = 'notice' | 'warning' | 'failure'
export interface AnnotationSourcePositionReference {
  start?: number
  end?: number
}
