param(
  [string]$Source = 'C:\Users\X1882\Desktop\skill\.trae\skills',
  [string]$Target = 'C:\Users\X1882\.openclaw\skills',
  [switch]$Clean
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path $Source)) {
  throw "Source skills directory not found: $Source"
}

if (-not (Test-Path $Target)) {
  New-Item -ItemType Directory -Path $Target -Force | Out-Null
}

$sourceDirs = Get-ChildItem -Path $Source -Directory
foreach ($dir in $sourceDirs) {
  $src = $dir.FullName
  $dst = Join-Path $Target $dir.Name

  if (Test-Path $dst) {
    Remove-Item -Recurse -Force $dst
  }

  Copy-Item -Recurse -Force $src $dst
  Write-Host "Synced $($dir.Name)"
}

if ($Clean) {
  $sourceNames = $sourceDirs.Name
  Get-ChildItem -Path $Target -Directory | Where-Object {
    $_.Name -notin $sourceNames -and $_.Name -ne 'memory-lancedb-pro-skill'
  } | ForEach-Object {
    Remove-Item -Recurse -Force $_.FullName
    Write-Host "Removed extra target skill $($_.Name)"
  }
}

Write-Host 'DONE'
