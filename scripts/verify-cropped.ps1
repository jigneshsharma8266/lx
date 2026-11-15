Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile("D:\villa\luxora-villa\public\images\luxora-logo.png")
Write-Host "Width: $($bmp.Width), Height: $($bmp.Height)"

$nonZeroAlpha = 0
$blackPixels = 0

for ($y = 0; $y -lt $bmp.Height; $y += 2) {
    for ($x = 0; $x -lt $bmp.Width; $x += 2) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.A -gt 0) {
            $nonZeroAlpha++
            if ($p.R -eq 0 -and $p.G -eq 0 -and $p.B -eq 0) {
                $blackPixels++
            }
        }
    }
}

Write-Host "Non-zero alpha samples: $nonZeroAlpha"
Write-Host "Black pixel samples: $blackPixels"
$bmp.Dispose()

