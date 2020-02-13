import { Rule, SchematicContext, Tree, branchAndMerge, chain, mergeWith, MergeStrategy, template, url, apply, move } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getProject, buildDefaultPath } from '@schematics/angular/utility/project';
import { parseName } from '@schematics/angular/utility/parse-name';
import { Schema } from './schema';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { addDeclarationToAppModule } from '../ng-module/add-declaration-to-module.rule';
import { strings } from '@angular-devkit/core';

export function ngRx(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const projectName = _options.project || Object.keys(workspace.projects)[0];
    const project = getProject(workspace, projectName);
    const path = _options.path || buildDefaultPath(project as any);
    const parsedPath = parseName(path, _options.name);

    _options.name = parsedPath.name;
    _options.path = parsedPath.path;

    const appModule = parsedPath.path+'/views/pages/apps/'+dasherize(_options.app)+'/'+dasherize(_options.app)+'.module.ts';

    // const appIndex = parsedPath.path+'/core/'+dasherize(_options.app)+'/index.ts';

    const sourceTemplate = url('./files');
    const sourceParametrizeTemplate = apply(sourceTemplate,[
      template({
        ..._options,
        ...strings
      }),
      move(parsedPath.path),
    ]);

    // const rule = addDeclarationToAppModule(appModule, _options.name, _options.app);

    tree = chain([
      branchAndMerge(chain([
        mergeWith(sourceParametrizeTemplate, MergeStrategy.Overwrite),
        addDeclarationToAppModule(appModule, _options.name, _options.app),
        // addDeclarationToAppModule(appIndex,_options.name, _options.app)
      ]), MergeStrategy.AllowOverwriteConflict),
      // branchAndMerge(chain([
      //   addDeclarationToAppModule(appModule, _options.name, _options.app),
        // addDeclarationToAppModule(appIndex,_options.name, _options.app)
      // ])),
    ])(tree, _context) as Tree;
    return tree;

    // const rule = branchAndMerge(addDeclarationToAppModule(appIndex, _options.name, _options.app));
    // return rule(tree, _context);
  };
}
