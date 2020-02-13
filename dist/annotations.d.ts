import { Annotation } from "./annotation";
export declare type AnnotationsConclusion = 'success' | 'failure' | 'neutral';
export declare class Annotations extends Array<Annotation> {
    static fromJSON(json: string): Annotations;
    hasFailure(): boolean;
    hasWarning(): boolean;
    get failures(): Annotation[];
    get warnings(): Annotation[];
    get notices(): Annotation[];
    get conclusion(): AnnotationsConclusion;
}
