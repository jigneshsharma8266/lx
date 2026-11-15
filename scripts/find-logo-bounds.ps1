Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Lenovo\.gemini\antigravity\brain\63785401-3126-4b90-81eb-6cea8f253bf8\.user_uploaded\media_1794552890148_cf290b98.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

$minX = 1024; $maxX = 0
$minY = 352;  $maxY = 0

# Scan between x: 250..450, y: 140..290 for dark pixels (< 100 brightness)
for ($y = 140; $y -lt 300; $y++) {
    for ($x = 250; $x -lt 450; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.R -lt 120 -and $pixel.G -lt 120 -and $pixel.B -lt 120) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output "Logo dark pixels bounds: X: $minX .. $maxX, Y: $minY .. $maxY"
$bmp.Dispose()

