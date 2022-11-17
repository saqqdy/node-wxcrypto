import { ESM_PATH } from '../utils/paths';

const esmOutputs = () => {
    // setModuleEnv('esmodule');
    // setBuildTarget('package');
    await compileDir(ESM_PATH, 'esm');
}

export { esmOutputs, esmOutputs as default }
