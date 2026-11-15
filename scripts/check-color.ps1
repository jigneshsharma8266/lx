Add-Type -AssemblyName System.Drawing

$srcPath = "D:\villa\luxora-villa\public\images\Lgo.jpeg"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

$hasColor = $false
for ($y = 186; $y -le 548; $y++) {
    for ($x = 356; $x -le 756; $x++) {
        $p = $bmp.GetPixel($x, $y)
        $diffRG = [Math]::Abs([int]$p.R - [int]$p.G)
        $diffRB = [Math]::Abs([int]$p.R - [int]$p.B)
        if ($diffRG -gt 15 -or $diffRB -gt 15) {
            $hasColor = $true
            Write-Host ("Color pixel found at x=" + $x + " y=" + $y + " R=" + $p.R + " G=" + $p.G + " B=" + $p.B)
            break
        }
    }
    if ($hasColor) { break }
}

if (-not $hasColor) {
    Write-Host "The entire logo in Lgo.jpeg is pure monochrome (black/greyscale on white)!"
}

$bmp.Dispose()
