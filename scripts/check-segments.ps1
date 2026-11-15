Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile("D:\villa\luxora-villa\public\images\luxora-logo.png")
Write-Host "Width: $($bmp.Width), Height: $($bmp.Height), Aspect Ratio: $([math]::Round($bmp.Width / $bmp.Height, 3))"

# Let's check vertical segments of the logo:
# 1. Castle emblem
# 2. "Luxora" text
# 3. "― VILLA ―"
# 4. "Stay Grand. Stay Luxora."

for ($y = 0; $y -lt $bmp.Height; $y += 10) {
    $count = 0
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        if ($bmp.GetPixel($x, $y).A -gt 30) { $count++ }
    }
    if ($count -gt 0 -and ($y % 50 -eq 0)) {
        Write-Host "y=$y : non-zero pixels = $count"
    }
}
$bmp.Dispose()

