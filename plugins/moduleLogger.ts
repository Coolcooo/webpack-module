import { Compiler } from 'webpack';
import * as fs from 'fs';

type InputOptions = {
    path: string,
    pathToSave: string
}

class ModuleLogger {

    private fsNames: Set<string>;
    private path: string;
    private pathToSave: string;
    constructor({ path, pathToSave }: InputOptions) {
        this.path = path;
        this.pathToSave = pathToSave;
        this.fsNames = new Set();
    }
    apply(compiler: Compiler) {
        compiler.hooks.normalModuleFactory.tap(
            'ModuleLogger',
            (normalModuleFactory) => {
                normalModuleFactory.hooks.module.tap('ModuleLogger', (_module, _createData) => {
                    // @ts-ignore
                    //this.fsNames.delete(`${_createData.resource}`);
                    return _module;
                });
            }
        );
        // compiler.hooks.compile.tap('ModuleLogger', () => {
        //     this.getPathsAllFiles(this.path);
        // });
        // compiler.hooks.afterDone.tap('ModuleLogger', () => {
        //     fs.writeFileSync(this.pathToSave, JSON.stringify(Array.from(this.fsNames)));
        // });
    }

    // getPathsAllFiles(path: string) {
    //     const files = fs.readdirSync(path);
    //     for (const file of files) {
    //         const pathOfFile = `${path}\\${file}`;
    //         const isDirectory = fs.lstatSync(pathOfFile).isDirectory();
    //         if (isDirectory) {
    //             this.getPathsAllFiles(pathOfFile);
    //         } else {
    //             this.fsNames.add(pathOfFile);
    //         }
    //     }
    // }
}

export default ModuleLogger;