Add-Type -AssemblyName System.Drawing

$srcPath = "D:\villa\luxora-villa\public\images\1000118101.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

Write-Host "Width: $($bmp.Width), Height: $($bmp.Height), PixelFormat: $($bmp.PixelFormat)"

# Find non-transparent bounding box
$minX = $bmp.Width; $maxX = 0; $minY = $bmp.Height; $maxY = 0
$hasAlpha = $false
$colorSamples = @()

for ($y = 0; $y -lt $bmp.Height; $y += 5) {
    for ($x = 0; $x -lt $bmp.Width; $x += 5) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.A -gt 10) {
            if ($p.A -lt 250) { $hasAlpha = $true }
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }

            if ($colorSamples.Count -lt 20 -and ($x % 25 -eq 0)) {
                $colorSamples += "x=$x y=$y A=$($p.A) R=$($p.R) G=$($p.G) B=$($p.B)"
            }
        }
    }
}

Write-Host "Logo Bounds: minX=$minX maxX=$maxX minY=$minY maxY=$maxY"
Write-Host "Content Size: Width=$($maxX - $minX + 1) Height=$($maxY - $minY + 1)"
Write-Host "Has Semi-Transparent Alpha: $hasAlpha"
Write-Host "Sample non-transparent pixels:"
foreach ($s in $colorSamples[0..8]) {
    Write-Host $s
}

$bmp.Dispose()

