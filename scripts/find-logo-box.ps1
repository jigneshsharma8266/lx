Add-Type -AssemblyName System.Drawing

$srcPath = "D:\villa\luxora-villa\public\images\Lgo.jpeg"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

$colorSamples = @()

for ($y = 0; $y -lt $bmp.Height; $y += 2) {
    for ($x = 0; $x -lt $bmp.Width; $x += 2) {
        $p = $bmp.GetPixel($x, $y)
        # Background is white (> 240 in all channels)
        if ($p.R -lt 240 -or $p.G -lt 240 -or $p.B -lt 240) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
            
            if ($colorSamples.Count -lt 30 -and ($x % 20 -eq 0) -and ($y % 20 -eq 0)) {
                $colorSamples += "x=$($x) y=$($y) R=$($p.R) G=$($p.G) B=$($p.B)"
            }
        }
    }
}

Write-Host "Logo Bounding Box: minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY"
Write-Host "Bounding Box Size: Width=$($maxX - $minX + 1), Height=$($maxY - $minY + 1)"
Write-Host "Sample logo pixel colors:"
foreach ($s in $colorSamples[0..10]) {
    Write-Host $s
}

$bmp.Dispose()
