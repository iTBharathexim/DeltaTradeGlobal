import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding, FilesystemDirectory } from '@capacitor/filesystem';

@Injectable({
    providedIn: 'root'
})
export class AndoridFileSystemService {
    async writeSecretFile(fileName: any, text: any) {
        this.createSystemDirectories(fileName, text).then(async (res: any) => {
        });
    };

    async readSecretFile(fileName: any) {
        const contents = await Filesystem.readFile({
            path: 'secrets/' + fileName,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });
        console.log('secrets:', contents);
    };

    async deleteSecretFile() {
        await Filesystem.deleteFile({
            path: 'secrets/text.txt',
            directory: Directory.Documents,
        });
    };

    async readFilePath(fileName: any) {
        const contents = await Filesystem.readFile({
            path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/External/' + fileName,
        });
        console.log('data:', contents);
    };

    createFolder(folderName: any) {
        return new Promise(async (resolve, reject) => {
            try {
                Filesystem.requestPermissions();
                await Filesystem.stat({ path: folderName, directory: Directory.Documents }).then(async (res: any) => {
                    alert(JSON.stringify(res) + "sdssds")
                    if (res?.size == undefined || res?.size == null) {
                        await Filesystem.mkdir({
                            path: folderName,
                            directory: Directory.Documents,
                            recursive: false,
                        })
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                });
            } catch (e) {
                alert("Unable to make directory" + e)
                resolve(false);
            }
        })
    }

    ensurePrivateDirectory(): Promise<any> {
        // dumming this method down for the sake of testing
        console.log('***** Main directory does not exist yet');
        return Filesystem.mkdir({ path: 'private', directory: FilesystemDirectory.Documents, recursive: false, });
    }

    makePrivateSubdirectory(path: string): Promise<void> {
        return this.ensurePrivateDirectory()
            .then(() => Filesystem.mkdir({ path: 'private/' + path, directory: FilesystemDirectory.Documents, recursive: false, }))
            .then(() => { });
    }

    makePrivateSubdirectories(paths: string[]): Promise<void> {
        return Promise.all(paths.map(path => this.makePrivateSubdirectory(path)))
            .then(() => { });
    }

    createSystemDirectories(fileName: any, text: any): Promise<void> {
        return this.makePrivateSubdirectories(["secrets"])
            .then(() => {
                Filesystem.readdir({
                    path: 'private',
                    directory: FilesystemDirectory.Documents
                })
                    .then((ls) => console.log("***** System Files Created.  Read: ", ls)).then(async () => {
                        await Filesystem.writeFile({
                            path: 'private/secrets/' + fileName,
                            data: text,
                            directory: FilesystemDirectory.Documents,
                            encoding: Encoding.UTF8,
                        })
                    });
            }).then(() => { });
    }
}