# Auto-start dev server helper
# Usage: run this script after edits to ensure the dev server is running.
# It detects if something is listening on the given port (default 3000).
param(
  [int]$Port = 3000
)

function Test-Port {
  param($port)
  try {
    $tcp = New-Object System.Net.Sockets.TcpClient
    $async = $tcp.BeginConnect('127.0.0.1',$port,$null,$null)
    $wait = $async.AsyncWaitHandle.WaitOne(200)
    if ($wait -and $tcp.Connected) {
      $tcp.Close()
      return $true
    }
    return $false
  } catch { return $false }
}

if (-not (Test-Port -port $Port)) {
  Write-Output "Dev server not found on port $Port. Starting 'npm start' in a new PowerShell window..."
  # Start a new PowerShell window and run npm start so it remains interactive
  Start-Process -FilePath "powershell" -ArgumentList "-NoExit","-Command","npm start" -WindowStyle Normal
} else {
  Write-Output "Dev server is already running on port $Port."
}
