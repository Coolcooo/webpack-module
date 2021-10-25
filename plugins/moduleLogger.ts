import { Compiler } from 'webpack';
import * as fs from 'fs';
import fg from 'fast-glob';

type InputOptions = {
    path: string,
    pathToSave: string
}

class ModuleLogger {

    private fsNames: Set<string>;
    private path: string;
    private pathToSave: string;
    constructor({ path, pathToSave }: InputOptions) {
        this.pathToSave = pathToSave;
        this.fsNames = new Set(fg.sync('src/**', {dot: true, absolute: true}));


    }
    apply(compiler: Compiler) {
        compiler.hooks.normalModuleFactory.tap(
            'ModuleLogger',
            (normalModuleFactory) => {
                normalModuleFactory.hooks.module.tap('ModuleLogger', (_module, _createData) => {
                    // @ts-ignore
                    // @ts-ignore
                    this.fsNames.delete(`${_createData.resource}`.replace(/\\/g, '/'));
                    return _module;
                });
                // fixme:
            }
        );
        compiler.hooks.afterDone.tap('ModuleLogger', () => {
            fs.writeFileSync(this.pathToSave, JSON.stringify(Array.from(this.fsNames)));
        });
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