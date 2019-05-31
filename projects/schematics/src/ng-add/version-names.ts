/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/** Name of the ngMaterialPro version that is shipped together with the schematics. */
export const ngMaterialProVersion = loadPackageVersionGracefully('@notadd/ng-material-pro');

/** Loads the full version from the given Angular package gracefully. */
function loadPackageVersionGracefully(packageName: string): string | null {
  try {
    return require(`${packageName}/package.json`).version;
  } catch {
    return null;
  }
}
