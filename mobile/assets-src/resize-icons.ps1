Add-Type -AssemblyName System.Drawing

$root = "C:\Users\zymaz\anchor-app\mobile"
$src = "$root\assets-src"
$res = "$root\android\app\src\main\res"

function Resize-Image($srcFile, $size, $destFile) {
    $img = [System.Drawing.Image]::FromFile($srcFile)
    $bmp = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.DrawImage($img, 0, 0, $size, $size)
    $g.Dispose()
    $img.Dispose()
    $bmp.Save($destFile, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

$legacy = @{ "mdpi" = 48; "hdpi" = 72; "xhdpi" = 96; "xxhdpi" = 144; "xxxhdpi" = 192 }
$fg     = @{ "mdpi" = 108; "hdpi" = 162; "xhdpi" = 216; "xxhdpi" = 324; "xxxhdpi" = 432 }

foreach ($density in $legacy.Keys) {
    $outDir = "$res\mipmap-$density"
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
    Resize-Image "$src\master-legacy-square.png" $legacy[$density] "$outDir\ic_launcher.png"
    Resize-Image "$src\master-legacy-round.png"  $legacy[$density] "$outDir\ic_launcher_round.png"
    Resize-Image "$src\master-fg.png"            $fg[$density]     "$outDir\ic_launcher_foreground.png"
    Write-Output "done: $density"
}

Resize-Image "$src\master-playstore.png" 512 "$src\playstore-icon-512.png"
Write-Output "done: playstore icon"
