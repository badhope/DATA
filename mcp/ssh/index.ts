import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 60000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.stderr || e.message }
}

export default createMCPServer({
  name: 'ssh',
  version: '1.0.0',
  description: 'SSH toolkit - Manage SSH connections, execute remote commands, transfer files, and tunnel ports',
  icon: '🔐',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['System', 'Networking', 'DevOps'],
    rating: 'intermediate',
    features: ['Remote Execution', 'File Transfer', 'SSH Tunnels', 'Key Management', 'Config Management']
  })
  .addTool({
    name: 'ssh_exec',
    description: 'Execute command on remote server via SSH',
    parameters: {
      host: { type: 'string', description: 'Remote host (user@host)' },
      command: { type: 'string', description: 'Command to execute' },
      port: { type: 'number', description: 'SSH port' },
      identityFile: { type: 'string', description: 'Path to private key' },
      timeout: { type: 'number', description: 'Connection timeout in seconds' }
    },
    execute: async (params: any) => {
      const port = params.port ? `-p ${params.port}` : ''
      const identity = params.identityFile ? `-i ${params.identityFile}` : ''
      const timeout = params.timeout ? `-o ConnectTimeout=${params.timeout}` : '-o ConnectTimeout=10'
      const result = await safeExec(`ssh ${timeout} ${port} ${identity} ${params.host} '${params.command.replace(/'/g, "'\\''")}' 2>&1`)
      return {
        host: params.host,
        command: params.command,
        output: result
      }
    }
  })
  .addTool({
    name: 'ssh_scp_upload',
    description: 'Upload file to remote server via SCP',
    parameters: {
      localPath: { type: 'string', description: 'Local file path' },
      remote: { type: 'string', description: 'Remote destination (user@host:/path)' },
      port: { type: 'number', description: 'SSH port' },
      identityFile: { type: 'string', description: 'Path to private key' },
      recursive: { type: 'boolean', description: 'Recursive copy for directories' }
    },
    execute: async (params: any) => {
      const port = params.port ? `-P ${params.port}` : ''
      const identity = params.identityFile ? `-i ${params.identityFile}` : ''
      const recursive = params.recursive ? '-r' : ''
      const result = await safeExec(`scp ${port} ${identity} ${recursive} "${params.localPath}" ${params.remote} 2>&1`)
      return {
        local: params.localPath,
        remote: params.remote,
        result
      }
    }
  })
  .addTool({
    name: 'ssh_scp_download',
    description: 'Download file from remote server via SCP',
    parameters: {
      remote: { type: 'string', description: 'Remote source (user@host:/path)' },
      localPath: { type: 'string', description: 'Local destination path' },
      port: { type: 'number', description: 'SSH port' },
      identityFile: { type: 'string', description: 'Path to private key' },
      recursive: { type: 'boolean', description: 'Recursive copy for directories' }
    },
    execute: async (params: any) => {
      const port = params.port ? `-P ${params.port}` : ''
      const identity = params.identityFile ? `-i ${params.identityFile}` : ''
      const recursive = params.recursive ? '-r' : ''
      const result = await safeExec(`scp ${port} ${identity} ${recursive} ${params.remote} "${params.localPath}" 2>&1`)
      return {
        remote: params.remote,
        local: params.localPath,
        result
      }
    }
  })
  .addTool({
    name: 'ssh_tunnel',
    description: 'Create SSH tunnel (local/remote port forwarding)',
    parameters: {
      host: { type: 'string', description: 'SSH server host (user@host)' },
      localPort: { type: 'number', description: 'Local port' },
      remoteHost: { type: 'string', description: 'Remote host to forward to' },
      remotePort: { type: 'number', description: 'Remote port' },
      port: { type: 'number', description: 'SSH server port' },
      background: { type: 'boolean', description: 'Run in background' },
      reverse: { type: 'boolean', description: 'Reverse tunnel (remote to local)' }
    },
    execute: async (params: any) => {
      const port = params.port ? `-p ${params.port}` : ''
      const bg = params.background ? '-fN' : '-N'
      const forwardType = params.reverse ? '-R' : '-L'
      const remoteHost = params.remoteHost || 'localhost'
      const result = await safeExec(`ssh ${bg} ${port} ${forwardType} ${params.localPort}:${remoteHost}:${params.remotePort} ${params.host} 2>&1 &`)
      return {
        tunnel: `${params.reverse ? 'Reverse' : 'Local'} tunnel`,
        mapping: params.reverse
          ? `remote:${params.localPort} -> local:${remoteHost}:${params.remotePort}`
          : `local:${params.localPort} -> remote:${remoteHost}:${params.remotePort}`,
        via: params.host,
        background: params.background,
        result
      }
    }
  })
  .addTool({
    name: 'ssh_keygen',
    description: 'Generate SSH key pair',
    parameters: {
      type: { type: 'string', description: 'Key type: rsa, ed25519, ecdsa' },
      bits: { type: 'number', description: 'Key bits (for RSA: 2048, 4096)' },
      outputFile: { type: 'string', description: 'Output key file path' },
      comment: { type: 'string', description: 'Key comment (usually email)' },
      passphrase: { type: 'string', description: 'Optional passphrase' }
    },
    execute: async (params: any) => {
      const type = params.type || 'ed25519'
      const bits = params.bits ? `-b ${params.bits}` : ''
      const comment = params.comment ? `-C "${params.comment}"` : ''
      const passphrase = params.passphrase || ''
      const outputFile = params.outputFile || '~/.ssh/id_' + type
      const result = await safeExec(`ssh-keygen -t ${type} ${bits} ${comment} -f "${outputFile}" -N "${passphrase}" 2>&1`)
      return {
        type,
        outputFile,
        result,
        pubKey: outputFile + '.pub'
      }
    }
  })
  .addTool({
    name: 'ssh_copy_id',
    description: 'Copy SSH public key to remote server (passwordless login)',
    parameters: {
      host: { type: 'string', description: 'Remote host (user@host)' },
      port: { type: 'number', description: 'SSH port' },
      identityFile: { type: 'string', description: 'Public key file path' }
    },
    execute: async (params: any) => {
      const port = params.port ? `-p ${params.port}` : ''
      const identity = params.identityFile ? `-i ${params.identityFile}` : ''
      const result = await safeExec(`ssh-copy-id ${port} ${identity} ${params.host} 2>&1`)
      return {
        host: params.host,
        result
      }
    }
  })
  .addTool({
    name: 'ssh_list_config',
    description: 'List and parse SSH config file entries',
    parameters: {
      configFile: { type: 'string', description: 'SSH config file path' }
    },
    execute: async (params: any) => {
      const configFile = params.configFile || '~/.ssh/config'
      const result = await safeExec(`cat "${configFile}" 2>&1`)
      return {
        configFile,
        hosts: result.match(/Host\s+(.+)/g)?.map((h: string) => h.replace(/Host\s+/, '')).filter((h: string) => h !== '*'),
        config: result
      }
    }
  })
  .addTool({
    name: 'ssh_test',
    description: 'Test SSH connection to remote host',
    parameters: {
      host: { type: 'string', description: 'Remote host (user@host)' },
      port: { type: 'number', description: 'SSH port' },
      identityFile: { type: 'string', description: 'Path to private key' }
    },
    execute: async (params: any) => {
      const port = params.port ? `-p ${params.port}` : ''
      const identity = params.identityFile ? `-i ${params.identityFile}` : ''
      const result = await safeExec(`ssh -o BatchMode=yes -o ConnectTimeout=5 ${port} ${identity} ${params.host} echo "SSH_OK" 2>&1`)
      return {
        host: params.host,
        success: result.includes('SSH_OK'),
        output: result
      }
    }
  })
  .addTool({
    name: 'ssh_sftp_mkdir',
    description: 'Create directory on remote server via SFTP',
    parameters: {
      host: { type: 'string', description: 'Remote host (user@host)' },
      path: { type: 'string', description: 'Remote directory path' },
      port: { type: 'number', description: 'SSH port' }
    },
    execute: async (params: any) => {
      const port = params.port ? `-P ${params.port}` : ''
      const result = await safeExec(`sftp ${port} ${params.host} << 'EOF'
mkdir ${params.path}
quit
EOF
2>&1`)
      return {
        host: params.host,
        directory: params.path,
        result
      }
    }
  })
  .build()
