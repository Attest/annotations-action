'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var os = _interopDefault(require('os'));
var path = _interopDefault(require('path'));
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

const github = require('@actions/github');

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

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var command = createCommonjsModule(function (module, exports) {
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os$1 = __importStar(os);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os$1.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return (s || '')
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return (s || '')
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}

});

unwrapExports(command);
var command_1 = command.issueCommand;
var command_2 = command.issue;

var core = createCommonjsModule(function (module, exports) {
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });

const os$1 = __importStar(os);
const path$1 = __importStar(path);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable
 */
function exportVariable(name, val) {
    process.env[name] = val;
    command.issueCommand('set-env', { name }, val);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    command.issueCommand('add-path', {}, inputPath);
    process.env['PATH'] = `${inputPath}${path$1.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store
 */
function setOutput(name, value) {
    command.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message
 */
function error(message) {
    command.issue('error', message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message
 */
function warning(message) {
    command.issue('warning', message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os$1.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store
 */
function saveState(name, value) {
    command.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;

});

var core$1 = unwrapExports(core);
var core_1 = core.ExitCode;
var core_2 = core.exportVariable;
var core_3 = core.setSecret;
var core_4 = core.addPath;
var core_5 = core.getInput;
var core_6 = core.setOutput;
var core_7 = core.setFailed;
var core_8 = core.debug;
var core_9 = core.error;
var core_10 = core.warning;
var core_11 = core.info;
var core_12 = core.startGroup;
var core_13 = core.endGroup;
var core_14 = core.group;
var core_15 = core.saveState;
var core_16 = core.getState;

function getInputs() {
  const token = core$1.getInput('token');
  const path = core$1.getInput('path');
  const title = core$1.getInput('title');
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
  core$1.setFailed(`annotations-action: ${error.message}`);
});
//# sourceMappingURL=index.js.map
