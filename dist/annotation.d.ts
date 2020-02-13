export interface Annotation {
    message: string;
    path: string;
    line?: AnnotationSourcePositionReference;
    column?: AnnotationSourcePositionReference;
    level: AnnotationLevel;
}
export declare type AnnotationLevel = 'notice' | 'warning' | 'failure';
export interface AnnotationSourcePositionReference {
    start?: number;
    end?: number;
}
