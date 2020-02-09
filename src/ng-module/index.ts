import { Rule, SchematicContext, Tree, url, template, move, mergeWith, apply, chain, branchAndMerge, MergeStrategy } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getProject, buildDefaultPath } from '@schematics/angular/utility/project';
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core';
import { Schema } from './schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngModule(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const projectName = _options.project || Object.keys(workspace.projects)[0];
    const project = getProject(workspace, projectName);
    const path = _options.path || buildDefaultPath(project as any);
    const parsedPath = parseName(path, _options.name);

    _options.name = parsedPath.name;
    _options.path = parsedPath.path;

    const sourceTemplate = url('./files');
    const sourceParametrizeTemplate = apply(sourceTemplate,[
      template({
        ..._options,
        ...strings
      }),
      move(parsedPath.path)
    ]);

    tree = chain([
      branchAndMerge(chain([
        mergeWith(sourceParametrizeTemplate, MergeStrategy.Overwrite),
      ]), MergeStrategy.AllowOverwriteConflict),
    ])(tree, _context) as Tree;
    return tree;
  };
}
