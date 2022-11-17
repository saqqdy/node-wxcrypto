import { consola, createSpinner } from './utils/logger'
import {
    bundledOutputs,
    cjsOutputs,
    copySourceCode,
    esmOutputs,
    packageScriptEntry,
    packageStyleEntry,
    styleEntry,
    typeDeclarations
} from './tasks'

const tasks = [
    {
        text: 'Copy Source Code',
        task: copySourceCode
    },
    {
        text: 'Build Package Script Entry',
        task: packageScriptEntry
    },
    {
        text: 'Build Component Style Entry',
        task: styleEntry
    },
    {
        text: 'Build Package Style Entry',
        task: packageStyleEntry
    },
    {
        text: 'Build Type Declarations',
        task: typeDeclarations
    },
    {
        text: 'Build ESModule Outputs',
        task: esmOutputs
    },
    {
        text: 'Build CommonJS Outputs',
        task: cjsOutputs
    },
    {
        text: 'Build Bundled Outputs',
        task: bundledOutputs
    }
]

async function runBuildTasks() {
    for (const item of tasks) {
        const { task, text } = item
        const spinner = createSpinner(text).start()
        try {
            await task()
            spinner.succeed(text)
        } catch (err) {
            spinner.fail(text)
            console.log(err)
            throw err
        }
    }
    consola.success('Compile successfully')
}

export { tasks, runBuildTasks, runBuildTasks as default }
