Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile("D:\villa\luxora-villa\public\original-logo-crop.png")

# Let's inspect rows from top to bottom to see what text/emblem is there
Write-Host "Width: $($bmp.Width), Height: $($bmp.Height)"

# Sample dark pixels row by row
for ($y = 0; $y -lt $bmp.Height; $y += 20) {
    $darkCount = 0
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.R -lt 100) { $darkCount++ }
    }
    Write-Host "y=$y : dark pixels=$darkCount"
}

$bmp.Dispose()

