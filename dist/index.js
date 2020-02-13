'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var github = _interopDefault(require('@actions/github'));
var core = _interopDefault(require('@actions/core'));
var fs = _interopDefault(require('fs'));

class Annotations extends Array {
  static fromJSON(json) {
    return new Annotations(...JSON.parse(json));
  }

  hasFailure() {
    return this.some(annotation => annotation.level === 'failure');
  }

  hasWarning() {
    return this.some(annotation => annotation.level === 'warning');
  }

  get failures() {
    return this.filter(annotation => annotation.level === 'failure');
  }

  get warnings() {
    return this.filter(annotation => annotation.level === 'warning');
  }

  get notices() {
    return this.filter(annotation => annotation.level === 'notice');
  }

  get conclusion() {
    if (this.length === 0) return 'success';
    if (this.hasFailure()) return 'failure';
    if (this.hasWarning()) return 'neutral';
    return 'success';
  }

}

class Github {
  constructor(token) {
    var _ref, _this$context$payload;

    this.check = null;
    this.client = new github.GitHub({
      auth: token
    });
    this.context = github.context;
    this.owner = this.context.repo.owner;
    this.repo = this.context.repo.repo;
    this.sha = (_ref = (_this$context$payload = this.context.payload.pull_request) == null ? void 0 : _this$context$payload.head.sha) != null ? _ref : this.context.sha;
  }

  static githubAnnotationFromAnnotation(annotations) {
    return annotations.map(annotation => {
      var _ref2, _ref3, _ref4, _ref5;

      const {
        level,
        message,
        path,
        column = {},
        line = {}
      } = annotation;
      const startLine = (_ref2 = line == null ? void 0 : line.start) != null ? _ref2 : 0;
      const endLine = (_ref3 = line == null ? void 0 : line.end) != null ? _ref3 : 0;
      const isSameLinePosition = startLine === endLine;
      const startColumn = isSameLinePosition ? (_ref4 = column == null ? void 0 : column.start) != null ? _ref4 : line.end : undefined;
      const endColumn = isSameLinePosition ? (_ref5 = column == null ? void 0 : column.end) != null ? _ref5 : line.start : undefined;
      return {
        annotation_level: level,
        message,
        path,
        start_column: startColumn,
        end_column: endColumn,
        start_line: startLine,
        end_line: endLine
      };
    });
  }

  async createCheck(name) {
    const {
      owner,
      repo,
      sha
    } = this;
    const response = await this.client.checks.create({
      owner,
      repo,
      name,
      head_sha: sha,
      status: 'in_progress'
    });
    this.check = response.data;
    return this;
  }

  async updateCheckWithAnnotations(annotations) {
    if (this.check === null) return;
    const {
      owner,
      repo
    } = this;
    const {
      name,
      id
    } = this.check;
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
        annotations: Github.githubAnnotationFromAnnotation(annotations)
      }
    });
  }

}

function getInputs() {
  const token = core.getInput('token');
  const path = core.getInput('path');
  const title = core.getInput('title');
  return validateEnvironmentOptions({
    token,
    path,
    title
  });
}

function validateEnvironmentOptions(environment) {
  if (!environment.token) {
    throw new Error('`token` input must be set.');
  }

  if (!environment.path) {
    throw new Error('`path` input must be set.');
  }

  if (!environment.title) {
    throw new Error('`title` input must be set');
  }

  return environment;
}

async function main() {
  const {
    token,
    title,
    path
  } = getInputs();
  const github = new Github(token);
  await github.createCheck(title);
  const file = fs.readFileSync(path);
  const annotations = Annotations.fromJSON(file.toString());
  await github.updateCheckWithAnnotations(annotations);
}

main().catch(error => {
  /* eslint-disable-next-line no-console */
  console.error(error.stack);
  core.setFailed(`annotations-action: ${error.message}`);
});
//# sourceMappingURL=index.js.map
