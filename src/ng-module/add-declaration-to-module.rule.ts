import { Rule, Tree, SchematicsException } from '@angular-devkit/schematics';
import { normalize } from '@angular-devkit/core';
import * as ts from 'typescript';
import { addSymbolToNgModuleMetadata } from '../utility/ast-utils';
import { InsertChange } from "../utility/change";
import { insertExport } from '../utility/route-utils';
import { dasherize, classify } from '@angular-devkit/core/src/utils/strings';

export function addDeclarationToAppModule(appModule: string, name: string, app:string): Rule {
    return (host: Tree) => {
      if (!appModule) {
        return host;
      }
  
      const modulePath = normalize(/*'/' +*/ appModule);
      //const modulePath = appModule;
      console.log('modulePath', modulePath);
      const text = host.read(modulePath);
      if (text === null) {
        throw new SchematicsException(`File ${modulePath} does not exist.`);
      }
      const sourceText = text.toString('utf-8');
      const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
      
      if(appModule === '/src/app/views/pages/apps/'+dasherize(app)+'/'+dasherize(app)+'.module.ts'){
        console.log('module traitment');
        const changes1 = addSymbolToNgModuleMetadata(source, 
            modulePath, 
            'imports', 
            classify(name)+'Effects', 
            '../../../../core/'+dasherize(app)+'/_effects/'+dasherize(name)+'.effects', 
            'EffectsModule.forFeature(['+classify(name)+'Effects])');
        const changes2 = addSymbolToNgModuleMetadata(source, 
            modulePath, 
            'imports', 
            classify(name)+'sReducer' ,
            '../../../../core/'+dasherize(app)+'/_reducers/'+dasherize(name)+'.reducers', 
            'StoreModule.forFeature(\''+dasherize(name)+'\', '+classify(name)+'sReducer)');
        const changes3 = addSymbolToNgModuleMetadata(source, 
            modulePath, 
            'providers', classify(name)+'sService', 
            '../../../../core/'+dasherize(app)+'/_services/'+dasherize(name)+'.service', 
            classify(name)+'sService');
        const chamges4 = changes1.concat(changes2.concat(changes3))
        const recorder = host.beginUpdate(modulePath);
        for (const change of chamges4) {
          if (change instanceof InsertChange) {
            recorder.insertLeft(change.pos, change.toAdd);
          }
        }
        host.commitUpdate(recorder);
    
        return host;
      }else {
        console.log('index traitment');
        const changes =  [
            insertExport(source, modulePath, 'select'+classify(name)+'ById'.replace(/\..*$/, ''), './_selectors/'+dasherize(name)+'.selectors'),
            insertExport(source, modulePath, 'select'+classify(name)+'sInStore'.replace(/\..*$/, ''), './_selectors/'+dasherize(name)+'.selectors'),
            insertExport(source, modulePath, 'select'+classify(name)+'sPageLoading'.replace(/\..*$/, ''), './_selectors/'+dasherize(name)+'.selectors'),
            insertExport(source, modulePath, 'selectLastCreated'+classify(name)+'Id'.replace(/\..*$/, ''), './_selectors/'+dasherize(name)+'.selectors'),
            insertExport(source, modulePath, 'select'+classify(name)+'sShowInitWaitingMessage'.replace(/\..*$/, ''), './_selectors/'+dasherize(name)+'.selectors'),
            insertExport(source, modulePath, classify(name)+'sReducer'.replace(/\..*$/, ''), './_reducers/'+dasherize(name)+'.reducers'),
            insertExport(source, modulePath, classify(name)+'Effects'.replace(/\..*$/, ''), './_effects/'+dasherize(name)+'.effects'),
            insertExport(source, modulePath, classify(name)+'sPageToggleLoading'.replace(/\..*$/, ''), './_actions/'+dasherize(name)+'.actions'),
            insertExport(source, modulePath, classify(name)+'sPageCancelled'.replace(/\..*$/, ''), './_actions/'+dasherize(name)+'.actions'),
            insertExport(source, modulePath, classify(name)+'sPageLoaded'.replace(/\..*$/, ''), './_actions/'+dasherize(name)+'.actions'),
            insertExport(source, modulePath, classify(name)+'sPageRequested'.replace(/\..*$/, ''), './_actions/'+dasherize(name)+'.actions'),
            insertExport(source, modulePath, 'Many'+classify(name)+'sDeleted'.replace(/\..*$/, ''), './_actions/'+dasherize(name)+'.actions'),
            insertExport(source, modulePath, 'One'+classify(name)+'Deleted'.replace(/\..*$/, ''), './_actions/'+dasherize(name)+'.actions'),
            insertExport(source, modulePath, classify(name)+'sStatusUpdated'.replace(/\..*$/, ''), './_actions/'+dasherize(name)+'.actions'),
            insertExport(source, modulePath, classify(name)+'Updated'.replace(/\..*$/, ''), './_actions/'+dasherize(name)+'.actions'),
            insertExport(source, modulePath, classify(name)+'Created'.replace(/\..*$/, ''), './_actions/'+dasherize(name)+'.actions'),
            insertExport(source, modulePath, classify(name)+'OnServerCreated'.replace(/\..*$/, ''), './_actions/'+dasherize(name)+'.actions'),
            insertExport(source, modulePath, classify(name)+'Actions'.replace(/\..*$/, ''), './_actions/'+dasherize(name)+'.actions'),
            insertExport(source, modulePath, classify(name)+'ActionTypes'.replace(/\..*$/, ''), './_actions/'+dasherize(name)+'.actions'),
            insertExport(source, modulePath, classify(name)+'sDataSource'.replace(/\..*$/, ''), './_data-sources/'+dasherize(name)+'s.datasource'),
            insertExport(source, modulePath, classify(name)+'Model'.replace(/\..*$/, ''), './_models/'+dasherize(name)+'.model'),
        ];

        const recorder = host.beginUpdate(modulePath);
        for (const change of changes) {
          if (change instanceof InsertChange) {
            recorder.insertLeft(change.pos, change.toAdd);
          }
        }
        host.commitUpdate(recorder);
    
        return host;
      }
  
    //   const changes = addSymbolToNgModuleMetadata(source, modulePath, 'imports', 'LoggerModule', '@my/logger-lib', 'LoggerModule.forRoot({ enableDebug: true })');

    //   const recorder = host.beginUpdate(modulePath);
    //   for (const change of changes) {
    //     if (change instanceof InsertChange) {
    //       recorder.insertLeft(change.pos, change.toAdd);
    //     }
    //   }
    //   host.commitUpdate(recorder);
  
    //   return host;
    };
  }