import { defaults } from 'jest-config'

const config = {
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
	preset: 'ts-jest'
}

export default config
