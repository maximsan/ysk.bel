import path from 'node:path';
import { exec } from 'node:child_process';

const args = process.argv.slice(2);
// const pathToImages = 'src/assets/images';

const FLAG = {
    INPUT_FILE: '-i',
    OUTPUT_FILE: '-o',
    QUALITY: '-q',
    RESIZE: '-resize',
};

const DEFAULT_QUALITY = '80';
const DEFAULT_FILE_EXTENSION = '.webp';

function concatenateFlags (pathToInputFile, pathToOutputFile, quality, resize) {
    let commands = ``
    if(resize) {
        commands += `${FLAG.RESIZE} ${resize} 0 `;
    } else if (quality) {
        commands += `${FLAG.QUALITY} ${quality} `;
    }
    return commands += `${pathToInputFile} ${FLAG.OUTPUT_FILE} ${pathToOutputFile}`
}

async function convertImages() {
    console.log('args', args)
    if (args.length === 0) {
        console.log('No input file specified');
        return;
    }

    if (args.length < 2) {
        console.log('No input file specified');
        return;
    }

    const flags = {};
    for (let i = 0; i < args.length; i++) {
        if (i % 2 === 0) {
            flags[args[i]] = args[i + 1];
        }
    }

    const inputFile = flags[FLAG.INPUT_FILE];
    const outputFile = flags[FLAG.OUTPUT_FILE];
    const quality = flags[FLAG.QUALITY] ?? DEFAULT_QUALITY;
    const resize = flags[FLAG.RESIZE];
    // const fromFolder = path.join(process.cwd(), pathToImages);
    const fromFolder = process.cwd();
    const pathToInputFile = path.join(fromFolder, inputFile);

    const fileBaseName = path.basename(inputFile);
    const inputFileWithoutExt = path.basename(
        fileBaseName,
        path.extname(inputFile),
    );

    let pathToOutputFile = path.join(
        fromFolder,
        inputFile.substring(0, inputFile.lastIndexOf('/')),
        `${inputFileWithoutExt}${DEFAULT_FILE_EXTENSION}`,
    );
    if (outputFile) {
        pathToOutputFile = path.join(fromFolder, outputFile);
    }

    console.log('command', `cwebp ${concatenateFlags(pathToInputFile, pathToOutputFile, quality, resize)}`);

    try {
        const { stdout, stderr } = await exec(
            // we assume that height is 0 to simply resize based on width and aspect-ratio
            `cwebp ${concatenateFlags(pathToInputFile, pathToOutputFile, quality, resize)}`,
        );
        // console.log('stdout:', stdout);
        // console.error('stderr:', stderr);
    } catch (error) {
        console.error(error);
    }

    // console.log('pathToInputFile', pathToInputFile);
    // console.log('pathToOutputFile', pathToOutputFile);
}

convertImages();
