param()
$ErrorActionPreference = "Stop"
$k = [Environment]::GetEnvironmentVariable("CODESONLINE_IMAGE_API_KEY","User")
if (-not $k) { Write-Output "NO_KEY"; exit 2 }
$body = '{"model":"gpt-image-2","prompt":"ping","n":1,"size":"1:1","quality":"low"}'
$bodyFile = Join-Path $env:TEMP "codesonline_body.json"
$respFile = Join-Path $env:TEMP "codesonline_probe.txt"
Set-Content -Path $bodyFile -Value $body -Encoding ascii
$code = & curl.exe -sS -o $respFile -w "HTTP=%{http_code}" -X POST "https://image.codesonline.dev/v1/images/generations" -H ("Authorization: Bearer " + $k) -H "Content-Type: application/json" --data-binary ("@" + $bodyFile)
Write-Output $code
Get-Content $respFile -TotalCount 5
