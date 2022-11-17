import ora, { type Ora } from 'ora'
import pc from 'picocolors'
import consola from 'consola'

const createSpinner = (text: string): Ora => ora(text)

export { ora, pc, consola, createSpinner, createSpinner as default }
