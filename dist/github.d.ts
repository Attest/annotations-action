import { Annotations } from "./annotations";
export declare class Github {
    private readonly client;
    private readonly context;
    private readonly owner;
    private readonly repo;
    private readonly sha;
    private check;
    constructor(token: string);
    private static githubAnnotationFromAnnotation;
    createCheck(name: string): Promise<this>;
    updateCheckWithAnnotations(annotations: Annotations): Promise<void>;
}
