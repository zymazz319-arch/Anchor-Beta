Add-Type -AssemblyName System.Drawing

$root = "C:\Users\zymaz\anchor-app\mobile"
$src = "$root\assets-src\master-legacy-square.png"
$res = "$root\android\app\src\main\res"

$targets = @{
    "drawable\splash.png"               = @(480, 320)
    "drawable-land-mdpi\splash.png"     = @(480, 320)
    "drawable-land-hdpi\splash.png"     = @(800, 480)
    "drawable-land-xhdpi\splash.png"    = @(1280, 720)
    "drawable-land-xxhdpi\splash.png"   = @(1600, 960)
    "drawable-land-xxxhdpi\splash.png"  = @(1920, 1280)
    "drawable-port-mdpi\splash.png"     = @(320, 480)
    "drawable-port-hdpi\splash.png"     = @(480, 800)
    "drawable-port-xhdpi\splash.png"    = @(720, 1280)
    "drawable-port-xxhdpi\splash.png"   = @(960, 1600)
    "drawable-port-xxxhdpi\splash.png"  = @(1280, 1920)
}

$icon = [System.Drawing.Image]::FromFile($src)

foreach ($rel in $targets.Keys) {
    $w, $h = $targets[$rel]
    $bmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::White)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    $iconSize = [Math]::Round([Math]::Min($w, $h) * 0.32)
    $x = [Math]::Round(($w - $iconSize) / 2)
    $y = [Math]::Round(($h - $iconSize) / 2)
    $g.DrawImage($icon, $x, $y, $iconSize, $iconSize)

    $g.Dispose()
    $outPath = Join-Path $res $rel
    New-Item -ItemType Directory -Force -Path (Split-Path $outPath) | Out-Null
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "done: $rel ($w x $h, icon=$iconSize)"
}

$icon.Dispose()
