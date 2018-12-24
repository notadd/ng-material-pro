import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageToPackageJson } from './package-config';
import { ngMaterial2Version } from './version-names';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(): Rule {
  return (host: Tree, context: SchematicContext) => {
    addPackageToPackageJson(host, '@notadd/ng-material2', `~${ngMaterial2Version}`);
    context.logger.log('info', `✅️ Added @notadd/ng-material2 into dependencies`);

    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);
  };
}
