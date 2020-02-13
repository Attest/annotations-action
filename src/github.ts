import { Annotations } from '@/annotations'
import { Context } from '@actions/github/lib/context'
import { Octokit } from '@octokit/rest'
import github from '@actions/github'

export class Github {
  private readonly client: github.GitHub
  private readonly context: Context
  private readonly owner: string
  private readonly repo: string
  private readonly sha: string
  private check: Octokit.ChecksCreateResponse | null = null

  public constructor(token: string) {
    this.client = new github.GitHub({
      auth: token,
    })
    this.context = github.context
    this.owner = this.context.repo.owner
    this.repo = this.context.repo.repo
    this.sha = this.context.payload.pull_request?.head.sha ?? this.context.sha
  }

  private static githubAnnotationFromAnnotation(
    annotations: Annotations,
  ): Octokit.ChecksUpdateParamsOutputAnnotations[] {
    return annotations.map(annotation => {
      const { level, message, path, column = {}, line = {} } = annotation

      const startLine = line?.start ?? 0
      const endLine = line?.end ?? 0

      const isSameLinePosition = startLine === endLine
      const startColumn = isSameLinePosition ? column?.start ?? line.end : undefined
      const endColumn = isSameLinePosition ? column?.end ?? line.start : undefined

      return {
        annotation_level: level,
        message,
        path,
        start_column: startColumn,
        end_column: endColumn,
        start_line: startLine,
        end_line: endLine,
      }
    })
  }

  public async createCheck(name: string): Promise<this> {
    const { owner, repo, sha } = this

    const response = await this.client.checks.create({
      owner,
      repo,
      name,
      head_sha: sha,
      status: 'in_progress',
    })

    this.check = response.data

    return this
  }

  public async updateCheckWithAnnotations(annotations: Annotations): Promise<void> {
    if (this.check === null) return

    const { owner, repo } = this
    const { name, id } = this.check

    await this.client.checks.update({
      owner,
      repo,
      check_run_id: id,
      name,
      status: 'completed',
      conclusion: annotations.conclusion,
      output: {
        title: `${name}: output`,
        summary: `${annotations.length} annotations written`,
        text: `
          - Failures: ${annotations.failures.length}
          - Warnings: ${annotations.warnings.length}
          - Notices: ${annotations.notices.length}
        `,
        annotations: Github.githubAnnotationFromAnnotation(annotations),
      },
    })
  }
}
