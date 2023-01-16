import { execSync } from 'child_process'

// const cmd = process.platform === 'win32' ? 'start' : 'open'

// execSync(`${cmd} https://npmmirror.com/sync/${pkg.pkgName}`)
execSync(
	'curl -X PUT -d "sync_upstream=true" "https://registry-direct.npmmirror.com/node-wxcrypto/sync"'
)
