# Run OUTSIDE Cursor: right-click -> Run with PowerShell, or:
#   powershell -ExecutionPolicy Bypass -File .\push-to-github.ps1
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "Remote:" -ForegroundColor Cyan
git remote -v
Write-Host "`nCommits to push (local vs origin):" -ForegroundColor Cyan
git fetch origin 2>$null
git log --oneline origin/main..main

git config http.postBuffer 524288000
git config http.version HTTP/1.1

Write-Host "`nPushing..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSuccess: https://github.com/ronymostafa2005/frontend--Devices-web" -ForegroundColor Green
} else {
    Write-Host @"

Push failed. Try:
1) GitHub Personal Access Token (classic) with 'repo' scope when Git asks for password.
2) GitHub Desktop: add this folder, Publish repository / Push origin.
3) SSH: git remote set-url origin git@github.com:ronymostafa2005/frontend--Devices-web.git
4) From bundle: git clone -b main D:\training\frontend-full.bundle temp-repo
   cd temp-repo
   git remote add origin https://github.com/ronymostafa2005/frontend--Devices-web.git
   git push -u origin main
"@ -ForegroundColor Red
}
Read-Host "`nPress Enter to exit"
