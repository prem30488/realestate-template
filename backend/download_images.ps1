# PowerShell script to download property images

if (-not (Test-Path "../frontend/public/images/14")) { New-Item -ItemType Directory -Path "../frontend/public/images/14" -Force }

if (
    -not (Test-Path "../frontend/public/images/14/img_1.jpg") -or
    (Get-Item "../frontend/public/images/14/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/garden?lock=141"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/14/img_1.jpg"
            if ((Get-Item "../frontend/public/images/14/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/14/img_2.jpg") -or
    (Get-Item "../frontend/public/images/14/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=142"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/14/img_2.jpg"
            if ((Get-Item "../frontend/public/images/14/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/14/img_3.jpg") -or
    (Get-Item "../frontend/public/images/14/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=143"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/14/img_3.jpg"
            if ((Get-Item "../frontend/public/images/14/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/40")) { New-Item -ItemType Directory -Path "../frontend/public/images/40" -Force }

if (
    -not (Test-Path "../frontend/public/images/40/img_1.jpg") -or
    (Get-Item "../frontend/public/images/40/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=401"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/40/img_1.jpg"
            if ((Get-Item "../frontend/public/images/40/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/40/img_2.jpg") -or
    (Get-Item "../frontend/public/images/40/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=402"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/40/img_2.jpg"
            if ((Get-Item "../frontend/public/images/40/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/40/img_3.jpg") -or
    (Get-Item "../frontend/public/images/40/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=403"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/40/img_3.jpg"
            if ((Get-Item "../frontend/public/images/40/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/57")) { New-Item -ItemType Directory -Path "../frontend/public/images/57" -Force }

if (
    -not (Test-Path "../frontend/public/images/57/img_1.jpg") -or
    (Get-Item "../frontend/public/images/57/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=571"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/57/img_1.jpg"
            if ((Get-Item "../frontend/public/images/57/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/57/img_2.jpg") -or
    (Get-Item "../frontend/public/images/57/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=572"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/57/img_2.jpg"
            if ((Get-Item "../frontend/public/images/57/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/57/img_3.jpg") -or
    (Get-Item "../frontend/public/images/57/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/penthouse?lock=573"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/57/img_3.jpg"
            if ((Get-Item "../frontend/public/images/57/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/58")) { New-Item -ItemType Directory -Path "../frontend/public/images/58" -Force }

if (
    -not (Test-Path "../frontend/public/images/58/img_1.jpg") -or
    (Get-Item "../frontend/public/images/58/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=581"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/58/img_1.jpg"
            if ((Get-Item "../frontend/public/images/58/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/58/img_2.jpg") -or
    (Get-Item "../frontend/public/images/58/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=582"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/58/img_2.jpg"
            if ((Get-Item "../frontend/public/images/58/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/58/img_3.jpg") -or
    (Get-Item "../frontend/public/images/58/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/penthouse?lock=583"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/58/img_3.jpg"
            if ((Get-Item "../frontend/public/images/58/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/73")) { New-Item -ItemType Directory -Path "../frontend/public/images/73" -Force }

if (
    -not (Test-Path "../frontend/public/images/73/img_1.jpg") -or
    (Get-Item "../frontend/public/images/73/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=731"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/73/img_1.jpg"
            if ((Get-Item "../frontend/public/images/73/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/73/img_2.jpg") -or
    (Get-Item "../frontend/public/images/73/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=732"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/73/img_2.jpg"
            if ((Get-Item "../frontend/public/images/73/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/73/img_3.jpg") -or
    (Get-Item "../frontend/public/images/73/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=733"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/73/img_3.jpg"
            if ((Get-Item "../frontend/public/images/73/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/90")) { New-Item -ItemType Directory -Path "../frontend/public/images/90" -Force }

if (
    -not (Test-Path "../frontend/public/images/90/img_1.jpg") -or
    (Get-Item "../frontend/public/images/90/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=901"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/90/img_1.jpg"
            if ((Get-Item "../frontend/public/images/90/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/90/img_2.jpg") -or
    (Get-Item "../frontend/public/images/90/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=902"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/90/img_2.jpg"
            if ((Get-Item "../frontend/public/images/90/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/90/img_3.jpg") -or
    (Get-Item "../frontend/public/images/90/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/studio?lock=903"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/90/img_3.jpg"
            if ((Get-Item "../frontend/public/images/90/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/101")) { New-Item -ItemType Directory -Path "../frontend/public/images/101" -Force }

if (
    -not (Test-Path "../frontend/public/images/101/img_1.jpg") -or
    (Get-Item "../frontend/public/images/101/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1011"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/101/img_1.jpg"
            if ((Get-Item "../frontend/public/images/101/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/101/img_2.jpg") -or
    (Get-Item "../frontend/public/images/101/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1012"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/101/img_2.jpg"
            if ((Get-Item "../frontend/public/images/101/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/101/img_3.jpg") -or
    (Get-Item "../frontend/public/images/101/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/office?lock=1013"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/101/img_3.jpg"
            if ((Get-Item "../frontend/public/images/101/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/107")) { New-Item -ItemType Directory -Path "../frontend/public/images/107" -Force }

if (
    -not (Test-Path "../frontend/public/images/107/img_1.jpg") -or
    (Get-Item "../frontend/public/images/107/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1071"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/107/img_1.jpg"
            if ((Get-Item "../frontend/public/images/107/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/107/img_2.jpg") -or
    (Get-Item "../frontend/public/images/107/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1072"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/107/img_2.jpg"
            if ((Get-Item "../frontend/public/images/107/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/107/img_3.jpg") -or
    (Get-Item "../frontend/public/images/107/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/office?lock=1073"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/107/img_3.jpg"
            if ((Get-Item "../frontend/public/images/107/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/129")) { New-Item -ItemType Directory -Path "../frontend/public/images/129" -Force }

if (
    -not (Test-Path "../frontend/public/images/129/img_1.jpg") -or
    (Get-Item "../frontend/public/images/129/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1291"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/129/img_1.jpg"
            if ((Get-Item "../frontend/public/images/129/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/129/img_2.jpg") -or
    (Get-Item "../frontend/public/images/129/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1292"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/129/img_2.jpg"
            if ((Get-Item "../frontend/public/images/129/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/129/img_3.jpg") -or
    (Get-Item "../frontend/public/images/129/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1293"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/129/img_3.jpg"
            if ((Get-Item "../frontend/public/images/129/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/145")) { New-Item -ItemType Directory -Path "../frontend/public/images/145" -Force }

if (
    -not (Test-Path "../frontend/public/images/145/img_1.jpg") -or
    (Get-Item "../frontend/public/images/145/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1451"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/145/img_1.jpg"
            if ((Get-Item "../frontend/public/images/145/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/145/img_2.jpg") -or
    (Get-Item "../frontend/public/images/145/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1452"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/145/img_2.jpg"
            if ((Get-Item "../frontend/public/images/145/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/145/img_3.jpg") -or
    (Get-Item "../frontend/public/images/145/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1453"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/145/img_3.jpg"
            if ((Get-Item "../frontend/public/images/145/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/161")) { New-Item -ItemType Directory -Path "../frontend/public/images/161" -Force }

if (
    -not (Test-Path "../frontend/public/images/161/img_1.jpg") -or
    (Get-Item "../frontend/public/images/161/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1611"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/161/img_1.jpg"
            if ((Get-Item "../frontend/public/images/161/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/161/img_2.jpg") -or
    (Get-Item "../frontend/public/images/161/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1612"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/161/img_2.jpg"
            if ((Get-Item "../frontend/public/images/161/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/161/img_3.jpg") -or
    (Get-Item "../frontend/public/images/161/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1613"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/161/img_3.jpg"
            if ((Get-Item "../frontend/public/images/161/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/184")) { New-Item -ItemType Directory -Path "../frontend/public/images/184" -Force }

if (
    -not (Test-Path "../frontend/public/images/184/img_1.jpg") -or
    (Get-Item "../frontend/public/images/184/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1841"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/184/img_1.jpg"
            if ((Get-Item "../frontend/public/images/184/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/184/img_2.jpg") -or
    (Get-Item "../frontend/public/images/184/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1842"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/184/img_2.jpg"
            if ((Get-Item "../frontend/public/images/184/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/184/img_3.jpg") -or
    (Get-Item "../frontend/public/images/184/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1843"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/184/img_3.jpg"
            if ((Get-Item "../frontend/public/images/184/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/1")) { New-Item -ItemType Directory -Path "../frontend/public/images/1" -Force }

if (
    -not (Test-Path "../frontend/public/images/1/img_1.jpg") -or
    (Get-Item "../frontend/public/images/1/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=11"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/1/img_1.jpg"
            if ((Get-Item "../frontend/public/images/1/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/1/img_2.jpg") -or
    (Get-Item "../frontend/public/images/1/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=12"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/1/img_2.jpg"
            if ((Get-Item "../frontend/public/images/1/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/1/img_3.jpg") -or
    (Get-Item "../frontend/public/images/1/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/apartment?lock=13"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/1/img_3.jpg"
            if ((Get-Item "../frontend/public/images/1/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/2")) { New-Item -ItemType Directory -Path "../frontend/public/images/2" -Force }

if (
    -not (Test-Path "../frontend/public/images/2/img_1.jpg") -or
    (Get-Item "../frontend/public/images/2/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=21"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/2/img_1.jpg"
            if ((Get-Item "../frontend/public/images/2/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/2/img_2.jpg") -or
    (Get-Item "../frontend/public/images/2/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=22"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/2/img_2.jpg"
            if ((Get-Item "../frontend/public/images/2/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/2/img_3.jpg") -or
    (Get-Item "../frontend/public/images/2/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/apartment?lock=23"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/2/img_3.jpg"
            if ((Get-Item "../frontend/public/images/2/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/3")) { New-Item -ItemType Directory -Path "../frontend/public/images/3" -Force }

if (
    -not (Test-Path "../frontend/public/images/3/img_1.jpg") -or
    (Get-Item "../frontend/public/images/3/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=31"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/3/img_1.jpg"
            if ((Get-Item "../frontend/public/images/3/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/3/img_2.jpg") -or
    (Get-Item "../frontend/public/images/3/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=32"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/3/img_2.jpg"
            if ((Get-Item "../frontend/public/images/3/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/3/img_3.jpg") -or
    (Get-Item "../frontend/public/images/3/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/apartment?lock=33"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/3/img_3.jpg"
            if ((Get-Item "../frontend/public/images/3/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/4")) { New-Item -ItemType Directory -Path "../frontend/public/images/4" -Force }

if (
    -not (Test-Path "../frontend/public/images/4/img_1.jpg") -or
    (Get-Item "../frontend/public/images/4/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=41"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/4/img_1.jpg"
            if ((Get-Item "../frontend/public/images/4/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/4/img_2.jpg") -or
    (Get-Item "../frontend/public/images/4/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=42"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/4/img_2.jpg"
            if ((Get-Item "../frontend/public/images/4/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/4/img_3.jpg") -or
    (Get-Item "../frontend/public/images/4/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/apartment?lock=43"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/4/img_3.jpg"
            if ((Get-Item "../frontend/public/images/4/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/5")) { New-Item -ItemType Directory -Path "../frontend/public/images/5" -Force }

if (
    -not (Test-Path "../frontend/public/images/5/img_1.jpg") -or
    (Get-Item "../frontend/public/images/5/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=51"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/5/img_1.jpg"
            if ((Get-Item "../frontend/public/images/5/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/5/img_2.jpg") -or
    (Get-Item "../frontend/public/images/5/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=52"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/5/img_2.jpg"
            if ((Get-Item "../frontend/public/images/5/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/5/img_3.jpg") -or
    (Get-Item "../frontend/public/images/5/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/apartment?lock=53"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/5/img_3.jpg"
            if ((Get-Item "../frontend/public/images/5/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/6")) { New-Item -ItemType Directory -Path "../frontend/public/images/6" -Force }

if (
    -not (Test-Path "../frontend/public/images/6/img_1.jpg") -or
    (Get-Item "../frontend/public/images/6/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=61"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/6/img_1.jpg"
            if ((Get-Item "../frontend/public/images/6/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/6/img_2.jpg") -or
    (Get-Item "../frontend/public/images/6/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=62"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/6/img_2.jpg"
            if ((Get-Item "../frontend/public/images/6/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/6/img_3.jpg") -or
    (Get-Item "../frontend/public/images/6/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/apartment?lock=63"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/6/img_3.jpg"
            if ((Get-Item "../frontend/public/images/6/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/7")) { New-Item -ItemType Directory -Path "../frontend/public/images/7" -Force }

if (
    -not (Test-Path "../frontend/public/images/7/img_1.jpg") -or
    (Get-Item "../frontend/public/images/7/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=71"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/7/img_1.jpg"
            if ((Get-Item "../frontend/public/images/7/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/7/img_2.jpg") -or
    (Get-Item "../frontend/public/images/7/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=72"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/7/img_2.jpg"
            if ((Get-Item "../frontend/public/images/7/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/7/img_3.jpg") -or
    (Get-Item "../frontend/public/images/7/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/apartment?lock=73"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/7/img_3.jpg"
            if ((Get-Item "../frontend/public/images/7/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/8")) { New-Item -ItemType Directory -Path "../frontend/public/images/8" -Force }

if (
    -not (Test-Path "../frontend/public/images/8/img_1.jpg") -or
    (Get-Item "../frontend/public/images/8/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=81"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/8/img_1.jpg"
            if ((Get-Item "../frontend/public/images/8/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/8/img_2.jpg") -or
    (Get-Item "../frontend/public/images/8/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=82"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/8/img_2.jpg"
            if ((Get-Item "../frontend/public/images/8/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/8/img_3.jpg") -or
    (Get-Item "../frontend/public/images/8/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/apartment?lock=83"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/8/img_3.jpg"
            if ((Get-Item "../frontend/public/images/8/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/9")) { New-Item -ItemType Directory -Path "../frontend/public/images/9" -Force }

if (
    -not (Test-Path "../frontend/public/images/9/img_1.jpg") -or
    (Get-Item "../frontend/public/images/9/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=91"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/9/img_1.jpg"
            if ((Get-Item "../frontend/public/images/9/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/9/img_2.jpg") -or
    (Get-Item "../frontend/public/images/9/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=92"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/9/img_2.jpg"
            if ((Get-Item "../frontend/public/images/9/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/9/img_3.jpg") -or
    (Get-Item "../frontend/public/images/9/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/apartment?lock=93"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/9/img_3.jpg"
            if ((Get-Item "../frontend/public/images/9/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/10")) { New-Item -ItemType Directory -Path "../frontend/public/images/10" -Force }

if (
    -not (Test-Path "../frontend/public/images/10/img_1.jpg") -or
    (Get-Item "../frontend/public/images/10/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=101"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/10/img_1.jpg"
            if ((Get-Item "../frontend/public/images/10/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/10/img_2.jpg") -or
    (Get-Item "../frontend/public/images/10/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=102"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/10/img_2.jpg"
            if ((Get-Item "../frontend/public/images/10/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/10/img_3.jpg") -or
    (Get-Item "../frontend/public/images/10/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/apartment?lock=103"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/10/img_3.jpg"
            if ((Get-Item "../frontend/public/images/10/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/11")) { New-Item -ItemType Directory -Path "../frontend/public/images/11" -Force }

if (
    -not (Test-Path "../frontend/public/images/11/img_1.jpg") -or
    (Get-Item "../frontend/public/images/11/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/garden?lock=111"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/11/img_1.jpg"
            if ((Get-Item "../frontend/public/images/11/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/11/img_2.jpg") -or
    (Get-Item "../frontend/public/images/11/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=112"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/11/img_2.jpg"
            if ((Get-Item "../frontend/public/images/11/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/11/img_3.jpg") -or
    (Get-Item "../frontend/public/images/11/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=113"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/11/img_3.jpg"
            if ((Get-Item "../frontend/public/images/11/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/12")) { New-Item -ItemType Directory -Path "../frontend/public/images/12" -Force }

if (
    -not (Test-Path "../frontend/public/images/12/img_1.jpg") -or
    (Get-Item "../frontend/public/images/12/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/garden?lock=121"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/12/img_1.jpg"
            if ((Get-Item "../frontend/public/images/12/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/12/img_2.jpg") -or
    (Get-Item "../frontend/public/images/12/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=122"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/12/img_2.jpg"
            if ((Get-Item "../frontend/public/images/12/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/12/img_3.jpg") -or
    (Get-Item "../frontend/public/images/12/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=123"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/12/img_3.jpg"
            if ((Get-Item "../frontend/public/images/12/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/13")) { New-Item -ItemType Directory -Path "../frontend/public/images/13" -Force }

if (
    -not (Test-Path "../frontend/public/images/13/img_1.jpg") -or
    (Get-Item "../frontend/public/images/13/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/garden?lock=131"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/13/img_1.jpg"
            if ((Get-Item "../frontend/public/images/13/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/13/img_2.jpg") -or
    (Get-Item "../frontend/public/images/13/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=132"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/13/img_2.jpg"
            if ((Get-Item "../frontend/public/images/13/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/13/img_3.jpg") -or
    (Get-Item "../frontend/public/images/13/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=133"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/13/img_3.jpg"
            if ((Get-Item "../frontend/public/images/13/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/15")) { New-Item -ItemType Directory -Path "../frontend/public/images/15" -Force }

if (
    -not (Test-Path "../frontend/public/images/15/img_1.jpg") -or
    (Get-Item "../frontend/public/images/15/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/garden?lock=151"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/15/img_1.jpg"
            if ((Get-Item "../frontend/public/images/15/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/15/img_2.jpg") -or
    (Get-Item "../frontend/public/images/15/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=152"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/15/img_2.jpg"
            if ((Get-Item "../frontend/public/images/15/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/15/img_3.jpg") -or
    (Get-Item "../frontend/public/images/15/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=153"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/15/img_3.jpg"
            if ((Get-Item "../frontend/public/images/15/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/16")) { New-Item -ItemType Directory -Path "../frontend/public/images/16" -Force }

if (
    -not (Test-Path "../frontend/public/images/16/img_1.jpg") -or
    (Get-Item "../frontend/public/images/16/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/garden?lock=161"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/16/img_1.jpg"
            if ((Get-Item "../frontend/public/images/16/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/16/img_2.jpg") -or
    (Get-Item "../frontend/public/images/16/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=162"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/16/img_2.jpg"
            if ((Get-Item "../frontend/public/images/16/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/16/img_3.jpg") -or
    (Get-Item "../frontend/public/images/16/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=163"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/16/img_3.jpg"
            if ((Get-Item "../frontend/public/images/16/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/17")) { New-Item -ItemType Directory -Path "../frontend/public/images/17" -Force }

if (
    -not (Test-Path "../frontend/public/images/17/img_1.jpg") -or
    (Get-Item "../frontend/public/images/17/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/garden?lock=171"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/17/img_1.jpg"
            if ((Get-Item "../frontend/public/images/17/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/17/img_2.jpg") -or
    (Get-Item "../frontend/public/images/17/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=172"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/17/img_2.jpg"
            if ((Get-Item "../frontend/public/images/17/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/17/img_3.jpg") -or
    (Get-Item "../frontend/public/images/17/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=173"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/17/img_3.jpg"
            if ((Get-Item "../frontend/public/images/17/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/18")) { New-Item -ItemType Directory -Path "../frontend/public/images/18" -Force }

if (
    -not (Test-Path "../frontend/public/images/18/img_1.jpg") -or
    (Get-Item "../frontend/public/images/18/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/garden?lock=181"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/18/img_1.jpg"
            if ((Get-Item "../frontend/public/images/18/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/18/img_2.jpg") -or
    (Get-Item "../frontend/public/images/18/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=182"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/18/img_2.jpg"
            if ((Get-Item "../frontend/public/images/18/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/18/img_3.jpg") -or
    (Get-Item "../frontend/public/images/18/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=183"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/18/img_3.jpg"
            if ((Get-Item "../frontend/public/images/18/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/19")) { New-Item -ItemType Directory -Path "../frontend/public/images/19" -Force }

if (
    -not (Test-Path "../frontend/public/images/19/img_1.jpg") -or
    (Get-Item "../frontend/public/images/19/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/garden?lock=191"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/19/img_1.jpg"
            if ((Get-Item "../frontend/public/images/19/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/19/img_2.jpg") -or
    (Get-Item "../frontend/public/images/19/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=192"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/19/img_2.jpg"
            if ((Get-Item "../frontend/public/images/19/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/19/img_3.jpg") -or
    (Get-Item "../frontend/public/images/19/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=193"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/19/img_3.jpg"
            if ((Get-Item "../frontend/public/images/19/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/20")) { New-Item -ItemType Directory -Path "../frontend/public/images/20" -Force }

if (
    -not (Test-Path "../frontend/public/images/20/img_1.jpg") -or
    (Get-Item "../frontend/public/images/20/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/garden?lock=201"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/20/img_1.jpg"
            if ((Get-Item "../frontend/public/images/20/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/20/img_2.jpg") -or
    (Get-Item "../frontend/public/images/20/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=202"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/20/img_2.jpg"
            if ((Get-Item "../frontend/public/images/20/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/20/img_3.jpg") -or
    (Get-Item "../frontend/public/images/20/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=203"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/20/img_3.jpg"
            if ((Get-Item "../frontend/public/images/20/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/21")) { New-Item -ItemType Directory -Path "../frontend/public/images/21" -Force }

if (
    -not (Test-Path "../frontend/public/images/21/img_1.jpg") -or
    (Get-Item "../frontend/public/images/21/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=211"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/21/img_1.jpg"
            if ((Get-Item "../frontend/public/images/21/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/21/img_2.jpg") -or
    (Get-Item "../frontend/public/images/21/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=212"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/21/img_2.jpg"
            if ((Get-Item "../frontend/public/images/21/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/21/img_3.jpg") -or
    (Get-Item "../frontend/public/images/21/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=213"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/21/img_3.jpg"
            if ((Get-Item "../frontend/public/images/21/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/22")) { New-Item -ItemType Directory -Path "../frontend/public/images/22" -Force }

if (
    -not (Test-Path "../frontend/public/images/22/img_1.jpg") -or
    (Get-Item "../frontend/public/images/22/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=221"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/22/img_1.jpg"
            if ((Get-Item "../frontend/public/images/22/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/22/img_2.jpg") -or
    (Get-Item "../frontend/public/images/22/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=222"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/22/img_2.jpg"
            if ((Get-Item "../frontend/public/images/22/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/22/img_3.jpg") -or
    (Get-Item "../frontend/public/images/22/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=223"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/22/img_3.jpg"
            if ((Get-Item "../frontend/public/images/22/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/23")) { New-Item -ItemType Directory -Path "../frontend/public/images/23" -Force }

if (
    -not (Test-Path "../frontend/public/images/23/img_1.jpg") -or
    (Get-Item "../frontend/public/images/23/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=231"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/23/img_1.jpg"
            if ((Get-Item "../frontend/public/images/23/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/23/img_2.jpg") -or
    (Get-Item "../frontend/public/images/23/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=232"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/23/img_2.jpg"
            if ((Get-Item "../frontend/public/images/23/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/23/img_3.jpg") -or
    (Get-Item "../frontend/public/images/23/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=233"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/23/img_3.jpg"
            if ((Get-Item "../frontend/public/images/23/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/24")) { New-Item -ItemType Directory -Path "../frontend/public/images/24" -Force }

if (
    -not (Test-Path "../frontend/public/images/24/img_1.jpg") -or
    (Get-Item "../frontend/public/images/24/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=241"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/24/img_1.jpg"
            if ((Get-Item "../frontend/public/images/24/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/24/img_2.jpg") -or
    (Get-Item "../frontend/public/images/24/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=242"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/24/img_2.jpg"
            if ((Get-Item "../frontend/public/images/24/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/24/img_3.jpg") -or
    (Get-Item "../frontend/public/images/24/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=243"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/24/img_3.jpg"
            if ((Get-Item "../frontend/public/images/24/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/25")) { New-Item -ItemType Directory -Path "../frontend/public/images/25" -Force }

if (
    -not (Test-Path "../frontend/public/images/25/img_1.jpg") -or
    (Get-Item "../frontend/public/images/25/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=251"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/25/img_1.jpg"
            if ((Get-Item "../frontend/public/images/25/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/25/img_2.jpg") -or
    (Get-Item "../frontend/public/images/25/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=252"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/25/img_2.jpg"
            if ((Get-Item "../frontend/public/images/25/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/25/img_3.jpg") -or
    (Get-Item "../frontend/public/images/25/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=253"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/25/img_3.jpg"
            if ((Get-Item "../frontend/public/images/25/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/26")) { New-Item -ItemType Directory -Path "../frontend/public/images/26" -Force }

if (
    -not (Test-Path "../frontend/public/images/26/img_1.jpg") -or
    (Get-Item "../frontend/public/images/26/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=261"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/26/img_1.jpg"
            if ((Get-Item "../frontend/public/images/26/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/26/img_2.jpg") -or
    (Get-Item "../frontend/public/images/26/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=262"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/26/img_2.jpg"
            if ((Get-Item "../frontend/public/images/26/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/26/img_3.jpg") -or
    (Get-Item "../frontend/public/images/26/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=263"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/26/img_3.jpg"
            if ((Get-Item "../frontend/public/images/26/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/27")) { New-Item -ItemType Directory -Path "../frontend/public/images/27" -Force }

if (
    -not (Test-Path "../frontend/public/images/27/img_1.jpg") -or
    (Get-Item "../frontend/public/images/27/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=271"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/27/img_1.jpg"
            if ((Get-Item "../frontend/public/images/27/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/27/img_2.jpg") -or
    (Get-Item "../frontend/public/images/27/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=272"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/27/img_2.jpg"
            if ((Get-Item "../frontend/public/images/27/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/27/img_3.jpg") -or
    (Get-Item "../frontend/public/images/27/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=273"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/27/img_3.jpg"
            if ((Get-Item "../frontend/public/images/27/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/28")) { New-Item -ItemType Directory -Path "../frontend/public/images/28" -Force }

if (
    -not (Test-Path "../frontend/public/images/28/img_1.jpg") -or
    (Get-Item "../frontend/public/images/28/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=281"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/28/img_1.jpg"
            if ((Get-Item "../frontend/public/images/28/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/28/img_2.jpg") -or
    (Get-Item "../frontend/public/images/28/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=282"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/28/img_2.jpg"
            if ((Get-Item "../frontend/public/images/28/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/28/img_3.jpg") -or
    (Get-Item "../frontend/public/images/28/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=283"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/28/img_3.jpg"
            if ((Get-Item "../frontend/public/images/28/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/29")) { New-Item -ItemType Directory -Path "../frontend/public/images/29" -Force }

if (
    -not (Test-Path "../frontend/public/images/29/img_1.jpg") -or
    (Get-Item "../frontend/public/images/29/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=291"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/29/img_1.jpg"
            if ((Get-Item "../frontend/public/images/29/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/29/img_2.jpg") -or
    (Get-Item "../frontend/public/images/29/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=292"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/29/img_2.jpg"
            if ((Get-Item "../frontend/public/images/29/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/29/img_3.jpg") -or
    (Get-Item "../frontend/public/images/29/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=293"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/29/img_3.jpg"
            if ((Get-Item "../frontend/public/images/29/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/30")) { New-Item -ItemType Directory -Path "../frontend/public/images/30" -Force }

if (
    -not (Test-Path "../frontend/public/images/30/img_1.jpg") -or
    (Get-Item "../frontend/public/images/30/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=301"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/30/img_1.jpg"
            if ((Get-Item "../frontend/public/images/30/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/30/img_2.jpg") -or
    (Get-Item "../frontend/public/images/30/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=302"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/30/img_2.jpg"
            if ((Get-Item "../frontend/public/images/30/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/30/img_3.jpg") -or
    (Get-Item "../frontend/public/images/30/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=303"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/30/img_3.jpg"
            if ((Get-Item "../frontend/public/images/30/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/31")) { New-Item -ItemType Directory -Path "../frontend/public/images/31" -Force }

if (
    -not (Test-Path "../frontend/public/images/31/img_1.jpg") -or
    (Get-Item "../frontend/public/images/31/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=311"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/31/img_1.jpg"
            if ((Get-Item "../frontend/public/images/31/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/31/img_2.jpg") -or
    (Get-Item "../frontend/public/images/31/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=312"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/31/img_2.jpg"
            if ((Get-Item "../frontend/public/images/31/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/31/img_3.jpg") -or
    (Get-Item "../frontend/public/images/31/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=313"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/31/img_3.jpg"
            if ((Get-Item "../frontend/public/images/31/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/32")) { New-Item -ItemType Directory -Path "../frontend/public/images/32" -Force }

if (
    -not (Test-Path "../frontend/public/images/32/img_1.jpg") -or
    (Get-Item "../frontend/public/images/32/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=321"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/32/img_1.jpg"
            if ((Get-Item "../frontend/public/images/32/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/32/img_2.jpg") -or
    (Get-Item "../frontend/public/images/32/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=322"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/32/img_2.jpg"
            if ((Get-Item "../frontend/public/images/32/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/32/img_3.jpg") -or
    (Get-Item "../frontend/public/images/32/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=323"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/32/img_3.jpg"
            if ((Get-Item "../frontend/public/images/32/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/33")) { New-Item -ItemType Directory -Path "../frontend/public/images/33" -Force }

if (
    -not (Test-Path "../frontend/public/images/33/img_1.jpg") -or
    (Get-Item "../frontend/public/images/33/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=331"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/33/img_1.jpg"
            if ((Get-Item "../frontend/public/images/33/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/33/img_2.jpg") -or
    (Get-Item "../frontend/public/images/33/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=332"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/33/img_2.jpg"
            if ((Get-Item "../frontend/public/images/33/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/33/img_3.jpg") -or
    (Get-Item "../frontend/public/images/33/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=333"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/33/img_3.jpg"
            if ((Get-Item "../frontend/public/images/33/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/34")) { New-Item -ItemType Directory -Path "../frontend/public/images/34" -Force }

if (
    -not (Test-Path "../frontend/public/images/34/img_1.jpg") -or
    (Get-Item "../frontend/public/images/34/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=341"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/34/img_1.jpg"
            if ((Get-Item "../frontend/public/images/34/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/34/img_2.jpg") -or
    (Get-Item "../frontend/public/images/34/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=342"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/34/img_2.jpg"
            if ((Get-Item "../frontend/public/images/34/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/34/img_3.jpg") -or
    (Get-Item "../frontend/public/images/34/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=343"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/34/img_3.jpg"
            if ((Get-Item "../frontend/public/images/34/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/35")) { New-Item -ItemType Directory -Path "../frontend/public/images/35" -Force }

if (
    -not (Test-Path "../frontend/public/images/35/img_1.jpg") -or
    (Get-Item "../frontend/public/images/35/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=351"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/35/img_1.jpg"
            if ((Get-Item "../frontend/public/images/35/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/35/img_2.jpg") -or
    (Get-Item "../frontend/public/images/35/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=352"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/35/img_2.jpg"
            if ((Get-Item "../frontend/public/images/35/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/35/img_3.jpg") -or
    (Get-Item "../frontend/public/images/35/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=353"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/35/img_3.jpg"
            if ((Get-Item "../frontend/public/images/35/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/36")) { New-Item -ItemType Directory -Path "../frontend/public/images/36" -Force }

if (
    -not (Test-Path "../frontend/public/images/36/img_1.jpg") -or
    (Get-Item "../frontend/public/images/36/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=361"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/36/img_1.jpg"
            if ((Get-Item "../frontend/public/images/36/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/36/img_2.jpg") -or
    (Get-Item "../frontend/public/images/36/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=362"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/36/img_2.jpg"
            if ((Get-Item "../frontend/public/images/36/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/36/img_3.jpg") -or
    (Get-Item "../frontend/public/images/36/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=363"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/36/img_3.jpg"
            if ((Get-Item "../frontend/public/images/36/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/37")) { New-Item -ItemType Directory -Path "../frontend/public/images/37" -Force }

if (
    -not (Test-Path "../frontend/public/images/37/img_1.jpg") -or
    (Get-Item "../frontend/public/images/37/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=371"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/37/img_1.jpg"
            if ((Get-Item "../frontend/public/images/37/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/37/img_2.jpg") -or
    (Get-Item "../frontend/public/images/37/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=372"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/37/img_2.jpg"
            if ((Get-Item "../frontend/public/images/37/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/37/img_3.jpg") -or
    (Get-Item "../frontend/public/images/37/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=373"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/37/img_3.jpg"
            if ((Get-Item "../frontend/public/images/37/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/38")) { New-Item -ItemType Directory -Path "../frontend/public/images/38" -Force }

if (
    -not (Test-Path "../frontend/public/images/38/img_1.jpg") -or
    (Get-Item "../frontend/public/images/38/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=381"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/38/img_1.jpg"
            if ((Get-Item "../frontend/public/images/38/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/38/img_2.jpg") -or
    (Get-Item "../frontend/public/images/38/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=382"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/38/img_2.jpg"
            if ((Get-Item "../frontend/public/images/38/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/38/img_3.jpg") -or
    (Get-Item "../frontend/public/images/38/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=383"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/38/img_3.jpg"
            if ((Get-Item "../frontend/public/images/38/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/39")) { New-Item -ItemType Directory -Path "../frontend/public/images/39" -Force }

if (
    -not (Test-Path "../frontend/public/images/39/img_1.jpg") -or
    (Get-Item "../frontend/public/images/39/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=391"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/39/img_1.jpg"
            if ((Get-Item "../frontend/public/images/39/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/39/img_2.jpg") -or
    (Get-Item "../frontend/public/images/39/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=392"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/39/img_2.jpg"
            if ((Get-Item "../frontend/public/images/39/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/39/img_3.jpg") -or
    (Get-Item "../frontend/public/images/39/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=393"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/39/img_3.jpg"
            if ((Get-Item "../frontend/public/images/39/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/41")) { New-Item -ItemType Directory -Path "../frontend/public/images/41" -Force }

if (
    -not (Test-Path "../frontend/public/images/41/img_1.jpg") -or
    (Get-Item "../frontend/public/images/41/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/pool?lock=411"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/41/img_1.jpg"
            if ((Get-Item "../frontend/public/images/41/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/41/img_2.jpg") -or
    (Get-Item "../frontend/public/images/41/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=412"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/41/img_2.jpg"
            if ((Get-Item "../frontend/public/images/41/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/41/img_3.jpg") -or
    (Get-Item "../frontend/public/images/41/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=413"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/41/img_3.jpg"
            if ((Get-Item "../frontend/public/images/41/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/42")) { New-Item -ItemType Directory -Path "../frontend/public/images/42" -Force }

if (
    -not (Test-Path "../frontend/public/images/42/img_1.jpg") -or
    (Get-Item "../frontend/public/images/42/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/pool?lock=421"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/42/img_1.jpg"
            if ((Get-Item "../frontend/public/images/42/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/42/img_2.jpg") -or
    (Get-Item "../frontend/public/images/42/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=422"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/42/img_2.jpg"
            if ((Get-Item "../frontend/public/images/42/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/42/img_3.jpg") -or
    (Get-Item "../frontend/public/images/42/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=423"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/42/img_3.jpg"
            if ((Get-Item "../frontend/public/images/42/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/43")) { New-Item -ItemType Directory -Path "../frontend/public/images/43" -Force }

if (
    -not (Test-Path "../frontend/public/images/43/img_1.jpg") -or
    (Get-Item "../frontend/public/images/43/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/pool?lock=431"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/43/img_1.jpg"
            if ((Get-Item "../frontend/public/images/43/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/43/img_2.jpg") -or
    (Get-Item "../frontend/public/images/43/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=432"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/43/img_2.jpg"
            if ((Get-Item "../frontend/public/images/43/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/43/img_3.jpg") -or
    (Get-Item "../frontend/public/images/43/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=433"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/43/img_3.jpg"
            if ((Get-Item "../frontend/public/images/43/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/44")) { New-Item -ItemType Directory -Path "../frontend/public/images/44" -Force }

if (
    -not (Test-Path "../frontend/public/images/44/img_1.jpg") -or
    (Get-Item "../frontend/public/images/44/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/pool?lock=441"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/44/img_1.jpg"
            if ((Get-Item "../frontend/public/images/44/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/44/img_2.jpg") -or
    (Get-Item "../frontend/public/images/44/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=442"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/44/img_2.jpg"
            if ((Get-Item "../frontend/public/images/44/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/44/img_3.jpg") -or
    (Get-Item "../frontend/public/images/44/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=443"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/44/img_3.jpg"
            if ((Get-Item "../frontend/public/images/44/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/45")) { New-Item -ItemType Directory -Path "../frontend/public/images/45" -Force }

if (
    -not (Test-Path "../frontend/public/images/45/img_1.jpg") -or
    (Get-Item "../frontend/public/images/45/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/pool?lock=451"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/45/img_1.jpg"
            if ((Get-Item "../frontend/public/images/45/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/45/img_2.jpg") -or
    (Get-Item "../frontend/public/images/45/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=452"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/45/img_2.jpg"
            if ((Get-Item "../frontend/public/images/45/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/45/img_3.jpg") -or
    (Get-Item "../frontend/public/images/45/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=453"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/45/img_3.jpg"
            if ((Get-Item "../frontend/public/images/45/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/46")) { New-Item -ItemType Directory -Path "../frontend/public/images/46" -Force }

if (
    -not (Test-Path "../frontend/public/images/46/img_1.jpg") -or
    (Get-Item "../frontend/public/images/46/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/pool?lock=461"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/46/img_1.jpg"
            if ((Get-Item "../frontend/public/images/46/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/46/img_2.jpg") -or
    (Get-Item "../frontend/public/images/46/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=462"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/46/img_2.jpg"
            if ((Get-Item "../frontend/public/images/46/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/46/img_3.jpg") -or
    (Get-Item "../frontend/public/images/46/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=463"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/46/img_3.jpg"
            if ((Get-Item "../frontend/public/images/46/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/47")) { New-Item -ItemType Directory -Path "../frontend/public/images/47" -Force }

if (
    -not (Test-Path "../frontend/public/images/47/img_1.jpg") -or
    (Get-Item "../frontend/public/images/47/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/pool?lock=471"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/47/img_1.jpg"
            if ((Get-Item "../frontend/public/images/47/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/47/img_2.jpg") -or
    (Get-Item "../frontend/public/images/47/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=472"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/47/img_2.jpg"
            if ((Get-Item "../frontend/public/images/47/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/47/img_3.jpg") -or
    (Get-Item "../frontend/public/images/47/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=473"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/47/img_3.jpg"
            if ((Get-Item "../frontend/public/images/47/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/48")) { New-Item -ItemType Directory -Path "../frontend/public/images/48" -Force }

if (
    -not (Test-Path "../frontend/public/images/48/img_1.jpg") -or
    (Get-Item "../frontend/public/images/48/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/pool?lock=481"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/48/img_1.jpg"
            if ((Get-Item "../frontend/public/images/48/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/48/img_2.jpg") -or
    (Get-Item "../frontend/public/images/48/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=482"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/48/img_2.jpg"
            if ((Get-Item "../frontend/public/images/48/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/48/img_3.jpg") -or
    (Get-Item "../frontend/public/images/48/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=483"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/48/img_3.jpg"
            if ((Get-Item "../frontend/public/images/48/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/49")) { New-Item -ItemType Directory -Path "../frontend/public/images/49" -Force }

if (
    -not (Test-Path "../frontend/public/images/49/img_1.jpg") -or
    (Get-Item "../frontend/public/images/49/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/pool?lock=491"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/49/img_1.jpg"
            if ((Get-Item "../frontend/public/images/49/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/49/img_2.jpg") -or
    (Get-Item "../frontend/public/images/49/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=492"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/49/img_2.jpg"
            if ((Get-Item "../frontend/public/images/49/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/49/img_3.jpg") -or
    (Get-Item "../frontend/public/images/49/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=493"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/49/img_3.jpg"
            if ((Get-Item "../frontend/public/images/49/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/50")) { New-Item -ItemType Directory -Path "../frontend/public/images/50" -Force }

if (
    -not (Test-Path "../frontend/public/images/50/img_1.jpg") -or
    (Get-Item "../frontend/public/images/50/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/pool?lock=501"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/50/img_1.jpg"
            if ((Get-Item "../frontend/public/images/50/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/50/img_2.jpg") -or
    (Get-Item "../frontend/public/images/50/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=502"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/50/img_2.jpg"
            if ((Get-Item "../frontend/public/images/50/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/50/img_3.jpg") -or
    (Get-Item "../frontend/public/images/50/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=503"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/50/img_3.jpg"
            if ((Get-Item "../frontend/public/images/50/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/51")) { New-Item -ItemType Directory -Path "../frontend/public/images/51" -Force }

if (
    -not (Test-Path "../frontend/public/images/51/img_1.jpg") -or
    (Get-Item "../frontend/public/images/51/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=511"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/51/img_1.jpg"
            if ((Get-Item "../frontend/public/images/51/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/51/img_2.jpg") -or
    (Get-Item "../frontend/public/images/51/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=512"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/51/img_2.jpg"
            if ((Get-Item "../frontend/public/images/51/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/51/img_3.jpg") -or
    (Get-Item "../frontend/public/images/51/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/penthouse?lock=513"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/51/img_3.jpg"
            if ((Get-Item "../frontend/public/images/51/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/52")) { New-Item -ItemType Directory -Path "../frontend/public/images/52" -Force }

if (
    -not (Test-Path "../frontend/public/images/52/img_1.jpg") -or
    (Get-Item "../frontend/public/images/52/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=521"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/52/img_1.jpg"
            if ((Get-Item "../frontend/public/images/52/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/52/img_2.jpg") -or
    (Get-Item "../frontend/public/images/52/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=522"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/52/img_2.jpg"
            if ((Get-Item "../frontend/public/images/52/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/52/img_3.jpg") -or
    (Get-Item "../frontend/public/images/52/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/penthouse?lock=523"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/52/img_3.jpg"
            if ((Get-Item "../frontend/public/images/52/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/53")) { New-Item -ItemType Directory -Path "../frontend/public/images/53" -Force }

if (
    -not (Test-Path "../frontend/public/images/53/img_1.jpg") -or
    (Get-Item "../frontend/public/images/53/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=531"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/53/img_1.jpg"
            if ((Get-Item "../frontend/public/images/53/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/53/img_2.jpg") -or
    (Get-Item "../frontend/public/images/53/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=532"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/53/img_2.jpg"
            if ((Get-Item "../frontend/public/images/53/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/53/img_3.jpg") -or
    (Get-Item "../frontend/public/images/53/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/penthouse?lock=533"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/53/img_3.jpg"
            if ((Get-Item "../frontend/public/images/53/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/54")) { New-Item -ItemType Directory -Path "../frontend/public/images/54" -Force }

if (
    -not (Test-Path "../frontend/public/images/54/img_1.jpg") -or
    (Get-Item "../frontend/public/images/54/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=541"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/54/img_1.jpg"
            if ((Get-Item "../frontend/public/images/54/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/54/img_2.jpg") -or
    (Get-Item "../frontend/public/images/54/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=542"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/54/img_2.jpg"
            if ((Get-Item "../frontend/public/images/54/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/54/img_3.jpg") -or
    (Get-Item "../frontend/public/images/54/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/penthouse?lock=543"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/54/img_3.jpg"
            if ((Get-Item "../frontend/public/images/54/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/55")) { New-Item -ItemType Directory -Path "../frontend/public/images/55" -Force }

if (
    -not (Test-Path "../frontend/public/images/55/img_1.jpg") -or
    (Get-Item "../frontend/public/images/55/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=551"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/55/img_1.jpg"
            if ((Get-Item "../frontend/public/images/55/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/55/img_2.jpg") -or
    (Get-Item "../frontend/public/images/55/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=552"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/55/img_2.jpg"
            if ((Get-Item "../frontend/public/images/55/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/55/img_3.jpg") -or
    (Get-Item "../frontend/public/images/55/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/penthouse?lock=553"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/55/img_3.jpg"
            if ((Get-Item "../frontend/public/images/55/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/56")) { New-Item -ItemType Directory -Path "../frontend/public/images/56" -Force }

if (
    -not (Test-Path "../frontend/public/images/56/img_1.jpg") -or
    (Get-Item "../frontend/public/images/56/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=561"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/56/img_1.jpg"
            if ((Get-Item "../frontend/public/images/56/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/56/img_2.jpg") -or
    (Get-Item "../frontend/public/images/56/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=562"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/56/img_2.jpg"
            if ((Get-Item "../frontend/public/images/56/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/56/img_3.jpg") -or
    (Get-Item "../frontend/public/images/56/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/penthouse?lock=563"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/56/img_3.jpg"
            if ((Get-Item "../frontend/public/images/56/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/59")) { New-Item -ItemType Directory -Path "../frontend/public/images/59" -Force }

if (
    -not (Test-Path "../frontend/public/images/59/img_1.jpg") -or
    (Get-Item "../frontend/public/images/59/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=591"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/59/img_1.jpg"
            if ((Get-Item "../frontend/public/images/59/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/59/img_2.jpg") -or
    (Get-Item "../frontend/public/images/59/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=592"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/59/img_2.jpg"
            if ((Get-Item "../frontend/public/images/59/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/59/img_3.jpg") -or
    (Get-Item "../frontend/public/images/59/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/penthouse?lock=593"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/59/img_3.jpg"
            if ((Get-Item "../frontend/public/images/59/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/60")) { New-Item -ItemType Directory -Path "../frontend/public/images/60" -Force }

if (
    -not (Test-Path "../frontend/public/images/60/img_1.jpg") -or
    (Get-Item "../frontend/public/images/60/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=601"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/60/img_1.jpg"
            if ((Get-Item "../frontend/public/images/60/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/60/img_2.jpg") -or
    (Get-Item "../frontend/public/images/60/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=602"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/60/img_2.jpg"
            if ((Get-Item "../frontend/public/images/60/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/60/img_3.jpg") -or
    (Get-Item "../frontend/public/images/60/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/penthouse?lock=603"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/60/img_3.jpg"
            if ((Get-Item "../frontend/public/images/60/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/61")) { New-Item -ItemType Directory -Path "../frontend/public/images/61" -Force }

if (
    -not (Test-Path "../frontend/public/images/61/img_1.jpg") -or
    (Get-Item "../frontend/public/images/61/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=611"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/61/img_1.jpg"
            if ((Get-Item "../frontend/public/images/61/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/61/img_2.jpg") -or
    (Get-Item "../frontend/public/images/61/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=612"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/61/img_2.jpg"
            if ((Get-Item "../frontend/public/images/61/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/61/img_3.jpg") -or
    (Get-Item "../frontend/public/images/61/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/townhouse?lock=613"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/61/img_3.jpg"
            if ((Get-Item "../frontend/public/images/61/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/62")) { New-Item -ItemType Directory -Path "../frontend/public/images/62" -Force }

if (
    -not (Test-Path "../frontend/public/images/62/img_1.jpg") -or
    (Get-Item "../frontend/public/images/62/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=621"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/62/img_1.jpg"
            if ((Get-Item "../frontend/public/images/62/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/62/img_2.jpg") -or
    (Get-Item "../frontend/public/images/62/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=622"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/62/img_2.jpg"
            if ((Get-Item "../frontend/public/images/62/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/62/img_3.jpg") -or
    (Get-Item "../frontend/public/images/62/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/townhouse?lock=623"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/62/img_3.jpg"
            if ((Get-Item "../frontend/public/images/62/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/63")) { New-Item -ItemType Directory -Path "../frontend/public/images/63" -Force }

if (
    -not (Test-Path "../frontend/public/images/63/img_1.jpg") -or
    (Get-Item "../frontend/public/images/63/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=631"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/63/img_1.jpg"
            if ((Get-Item "../frontend/public/images/63/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/63/img_2.jpg") -or
    (Get-Item "../frontend/public/images/63/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=632"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/63/img_2.jpg"
            if ((Get-Item "../frontend/public/images/63/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/63/img_3.jpg") -or
    (Get-Item "../frontend/public/images/63/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/townhouse?lock=633"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/63/img_3.jpg"
            if ((Get-Item "../frontend/public/images/63/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/64")) { New-Item -ItemType Directory -Path "../frontend/public/images/64" -Force }

if (
    -not (Test-Path "../frontend/public/images/64/img_1.jpg") -or
    (Get-Item "../frontend/public/images/64/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=641"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/64/img_1.jpg"
            if ((Get-Item "../frontend/public/images/64/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/64/img_2.jpg") -or
    (Get-Item "../frontend/public/images/64/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=642"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/64/img_2.jpg"
            if ((Get-Item "../frontend/public/images/64/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/64/img_3.jpg") -or
    (Get-Item "../frontend/public/images/64/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/townhouse?lock=643"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/64/img_3.jpg"
            if ((Get-Item "../frontend/public/images/64/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/65")) { New-Item -ItemType Directory -Path "../frontend/public/images/65" -Force }

if (
    -not (Test-Path "../frontend/public/images/65/img_1.jpg") -or
    (Get-Item "../frontend/public/images/65/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=651"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/65/img_1.jpg"
            if ((Get-Item "../frontend/public/images/65/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/65/img_2.jpg") -or
    (Get-Item "../frontend/public/images/65/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=652"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/65/img_2.jpg"
            if ((Get-Item "../frontend/public/images/65/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/65/img_3.jpg") -or
    (Get-Item "../frontend/public/images/65/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/townhouse?lock=653"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/65/img_3.jpg"
            if ((Get-Item "../frontend/public/images/65/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/66")) { New-Item -ItemType Directory -Path "../frontend/public/images/66" -Force }

if (
    -not (Test-Path "../frontend/public/images/66/img_1.jpg") -or
    (Get-Item "../frontend/public/images/66/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=661"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/66/img_1.jpg"
            if ((Get-Item "../frontend/public/images/66/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/66/img_2.jpg") -or
    (Get-Item "../frontend/public/images/66/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=662"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/66/img_2.jpg"
            if ((Get-Item "../frontend/public/images/66/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/66/img_3.jpg") -or
    (Get-Item "../frontend/public/images/66/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/townhouse?lock=663"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/66/img_3.jpg"
            if ((Get-Item "../frontend/public/images/66/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/67")) { New-Item -ItemType Directory -Path "../frontend/public/images/67" -Force }

if (
    -not (Test-Path "../frontend/public/images/67/img_1.jpg") -or
    (Get-Item "../frontend/public/images/67/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=671"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/67/img_1.jpg"
            if ((Get-Item "../frontend/public/images/67/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/67/img_2.jpg") -or
    (Get-Item "../frontend/public/images/67/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=672"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/67/img_2.jpg"
            if ((Get-Item "../frontend/public/images/67/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/67/img_3.jpg") -or
    (Get-Item "../frontend/public/images/67/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/townhouse?lock=673"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/67/img_3.jpg"
            if ((Get-Item "../frontend/public/images/67/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/68")) { New-Item -ItemType Directory -Path "../frontend/public/images/68" -Force }

if (
    -not (Test-Path "../frontend/public/images/68/img_1.jpg") -or
    (Get-Item "../frontend/public/images/68/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=681"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/68/img_1.jpg"
            if ((Get-Item "../frontend/public/images/68/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/68/img_2.jpg") -or
    (Get-Item "../frontend/public/images/68/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=682"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/68/img_2.jpg"
            if ((Get-Item "../frontend/public/images/68/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/68/img_3.jpg") -or
    (Get-Item "../frontend/public/images/68/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/townhouse?lock=683"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/68/img_3.jpg"
            if ((Get-Item "../frontend/public/images/68/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/69")) { New-Item -ItemType Directory -Path "../frontend/public/images/69" -Force }

if (
    -not (Test-Path "../frontend/public/images/69/img_1.jpg") -or
    (Get-Item "../frontend/public/images/69/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=691"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/69/img_1.jpg"
            if ((Get-Item "../frontend/public/images/69/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/69/img_2.jpg") -or
    (Get-Item "../frontend/public/images/69/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=692"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/69/img_2.jpg"
            if ((Get-Item "../frontend/public/images/69/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/69/img_3.jpg") -or
    (Get-Item "../frontend/public/images/69/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/townhouse?lock=693"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/69/img_3.jpg"
            if ((Get-Item "../frontend/public/images/69/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/70")) { New-Item -ItemType Directory -Path "../frontend/public/images/70" -Force }

if (
    -not (Test-Path "../frontend/public/images/70/img_1.jpg") -or
    (Get-Item "../frontend/public/images/70/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=701"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/70/img_1.jpg"
            if ((Get-Item "../frontend/public/images/70/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/70/img_2.jpg") -or
    (Get-Item "../frontend/public/images/70/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=702"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/70/img_2.jpg"
            if ((Get-Item "../frontend/public/images/70/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/70/img_3.jpg") -or
    (Get-Item "../frontend/public/images/70/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/townhouse?lock=703"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/70/img_3.jpg"
            if ((Get-Item "../frontend/public/images/70/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/71")) { New-Item -ItemType Directory -Path "../frontend/public/images/71" -Force }

if (
    -not (Test-Path "../frontend/public/images/71/img_1.jpg") -or
    (Get-Item "../frontend/public/images/71/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=711"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/71/img_1.jpg"
            if ((Get-Item "../frontend/public/images/71/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/71/img_2.jpg") -or
    (Get-Item "../frontend/public/images/71/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=712"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/71/img_2.jpg"
            if ((Get-Item "../frontend/public/images/71/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/71/img_3.jpg") -or
    (Get-Item "../frontend/public/images/71/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=713"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/71/img_3.jpg"
            if ((Get-Item "../frontend/public/images/71/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/72")) { New-Item -ItemType Directory -Path "../frontend/public/images/72" -Force }

if (
    -not (Test-Path "../frontend/public/images/72/img_1.jpg") -or
    (Get-Item "../frontend/public/images/72/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=721"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/72/img_1.jpg"
            if ((Get-Item "../frontend/public/images/72/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/72/img_2.jpg") -or
    (Get-Item "../frontend/public/images/72/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=722"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/72/img_2.jpg"
            if ((Get-Item "../frontend/public/images/72/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/72/img_3.jpg") -or
    (Get-Item "../frontend/public/images/72/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=723"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/72/img_3.jpg"
            if ((Get-Item "../frontend/public/images/72/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/74")) { New-Item -ItemType Directory -Path "../frontend/public/images/74" -Force }

if (
    -not (Test-Path "../frontend/public/images/74/img_1.jpg") -or
    (Get-Item "../frontend/public/images/74/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=741"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/74/img_1.jpg"
            if ((Get-Item "../frontend/public/images/74/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/74/img_2.jpg") -or
    (Get-Item "../frontend/public/images/74/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=742"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/74/img_2.jpg"
            if ((Get-Item "../frontend/public/images/74/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/74/img_3.jpg") -or
    (Get-Item "../frontend/public/images/74/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=743"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/74/img_3.jpg"
            if ((Get-Item "../frontend/public/images/74/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/75")) { New-Item -ItemType Directory -Path "../frontend/public/images/75" -Force }

if (
    -not (Test-Path "../frontend/public/images/75/img_1.jpg") -or
    (Get-Item "../frontend/public/images/75/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=751"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/75/img_1.jpg"
            if ((Get-Item "../frontend/public/images/75/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/75/img_2.jpg") -or
    (Get-Item "../frontend/public/images/75/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=752"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/75/img_2.jpg"
            if ((Get-Item "../frontend/public/images/75/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/75/img_3.jpg") -or
    (Get-Item "../frontend/public/images/75/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=753"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/75/img_3.jpg"
            if ((Get-Item "../frontend/public/images/75/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/76")) { New-Item -ItemType Directory -Path "../frontend/public/images/76" -Force }

if (
    -not (Test-Path "../frontend/public/images/76/img_1.jpg") -or
    (Get-Item "../frontend/public/images/76/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=761"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/76/img_1.jpg"
            if ((Get-Item "../frontend/public/images/76/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/76/img_2.jpg") -or
    (Get-Item "../frontend/public/images/76/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=762"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/76/img_2.jpg"
            if ((Get-Item "../frontend/public/images/76/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/76/img_3.jpg") -or
    (Get-Item "../frontend/public/images/76/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=763"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/76/img_3.jpg"
            if ((Get-Item "../frontend/public/images/76/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/77")) { New-Item -ItemType Directory -Path "../frontend/public/images/77" -Force }

if (
    -not (Test-Path "../frontend/public/images/77/img_1.jpg") -or
    (Get-Item "../frontend/public/images/77/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=771"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/77/img_1.jpg"
            if ((Get-Item "../frontend/public/images/77/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/77/img_2.jpg") -or
    (Get-Item "../frontend/public/images/77/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=772"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/77/img_2.jpg"
            if ((Get-Item "../frontend/public/images/77/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/77/img_3.jpg") -or
    (Get-Item "../frontend/public/images/77/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=773"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/77/img_3.jpg"
            if ((Get-Item "../frontend/public/images/77/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/78")) { New-Item -ItemType Directory -Path "../frontend/public/images/78" -Force }

if (
    -not (Test-Path "../frontend/public/images/78/img_1.jpg") -or
    (Get-Item "../frontend/public/images/78/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=781"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/78/img_1.jpg"
            if ((Get-Item "../frontend/public/images/78/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/78/img_2.jpg") -or
    (Get-Item "../frontend/public/images/78/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=782"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/78/img_2.jpg"
            if ((Get-Item "../frontend/public/images/78/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/78/img_3.jpg") -or
    (Get-Item "../frontend/public/images/78/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=783"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/78/img_3.jpg"
            if ((Get-Item "../frontend/public/images/78/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/79")) { New-Item -ItemType Directory -Path "../frontend/public/images/79" -Force }

if (
    -not (Test-Path "../frontend/public/images/79/img_1.jpg") -or
    (Get-Item "../frontend/public/images/79/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=791"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/79/img_1.jpg"
            if ((Get-Item "../frontend/public/images/79/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/79/img_2.jpg") -or
    (Get-Item "../frontend/public/images/79/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=792"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/79/img_2.jpg"
            if ((Get-Item "../frontend/public/images/79/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/79/img_3.jpg") -or
    (Get-Item "../frontend/public/images/79/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=793"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/79/img_3.jpg"
            if ((Get-Item "../frontend/public/images/79/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/80")) { New-Item -ItemType Directory -Path "../frontend/public/images/80" -Force }

if (
    -not (Test-Path "../frontend/public/images/80/img_1.jpg") -or
    (Get-Item "../frontend/public/images/80/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=801"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/80/img_1.jpg"
            if ((Get-Item "../frontend/public/images/80/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/80/img_2.jpg") -or
    (Get-Item "../frontend/public/images/80/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=802"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/80/img_2.jpg"
            if ((Get-Item "../frontend/public/images/80/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/80/img_3.jpg") -or
    (Get-Item "../frontend/public/images/80/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=803"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/80/img_3.jpg"
            if ((Get-Item "../frontend/public/images/80/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/81")) { New-Item -ItemType Directory -Path "../frontend/public/images/81" -Force }

if (
    -not (Test-Path "../frontend/public/images/81/img_1.jpg") -or
    (Get-Item "../frontend/public/images/81/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=811"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/81/img_1.jpg"
            if ((Get-Item "../frontend/public/images/81/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/81/img_2.jpg") -or
    (Get-Item "../frontend/public/images/81/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=812"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/81/img_2.jpg"
            if ((Get-Item "../frontend/public/images/81/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/81/img_3.jpg") -or
    (Get-Item "../frontend/public/images/81/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/studio?lock=813"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/81/img_3.jpg"
            if ((Get-Item "../frontend/public/images/81/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/82")) { New-Item -ItemType Directory -Path "../frontend/public/images/82" -Force }

if (
    -not (Test-Path "../frontend/public/images/82/img_1.jpg") -or
    (Get-Item "../frontend/public/images/82/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=821"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/82/img_1.jpg"
            if ((Get-Item "../frontend/public/images/82/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/82/img_2.jpg") -or
    (Get-Item "../frontend/public/images/82/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=822"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/82/img_2.jpg"
            if ((Get-Item "../frontend/public/images/82/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/82/img_3.jpg") -or
    (Get-Item "../frontend/public/images/82/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/studio?lock=823"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/82/img_3.jpg"
            if ((Get-Item "../frontend/public/images/82/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/83")) { New-Item -ItemType Directory -Path "../frontend/public/images/83" -Force }

if (
    -not (Test-Path "../frontend/public/images/83/img_1.jpg") -or
    (Get-Item "../frontend/public/images/83/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=831"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/83/img_1.jpg"
            if ((Get-Item "../frontend/public/images/83/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/83/img_2.jpg") -or
    (Get-Item "../frontend/public/images/83/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=832"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/83/img_2.jpg"
            if ((Get-Item "../frontend/public/images/83/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/83/img_3.jpg") -or
    (Get-Item "../frontend/public/images/83/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/studio?lock=833"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/83/img_3.jpg"
            if ((Get-Item "../frontend/public/images/83/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/84")) { New-Item -ItemType Directory -Path "../frontend/public/images/84" -Force }

if (
    -not (Test-Path "../frontend/public/images/84/img_1.jpg") -or
    (Get-Item "../frontend/public/images/84/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=841"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/84/img_1.jpg"
            if ((Get-Item "../frontend/public/images/84/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/84/img_2.jpg") -or
    (Get-Item "../frontend/public/images/84/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=842"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/84/img_2.jpg"
            if ((Get-Item "../frontend/public/images/84/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/84/img_3.jpg") -or
    (Get-Item "../frontend/public/images/84/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/studio?lock=843"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/84/img_3.jpg"
            if ((Get-Item "../frontend/public/images/84/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/85")) { New-Item -ItemType Directory -Path "../frontend/public/images/85" -Force }

if (
    -not (Test-Path "../frontend/public/images/85/img_1.jpg") -or
    (Get-Item "../frontend/public/images/85/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=851"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/85/img_1.jpg"
            if ((Get-Item "../frontend/public/images/85/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/85/img_2.jpg") -or
    (Get-Item "../frontend/public/images/85/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=852"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/85/img_2.jpg"
            if ((Get-Item "../frontend/public/images/85/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/85/img_3.jpg") -or
    (Get-Item "../frontend/public/images/85/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/studio?lock=853"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/85/img_3.jpg"
            if ((Get-Item "../frontend/public/images/85/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/86")) { New-Item -ItemType Directory -Path "../frontend/public/images/86" -Force }

if (
    -not (Test-Path "../frontend/public/images/86/img_1.jpg") -or
    (Get-Item "../frontend/public/images/86/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=861"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/86/img_1.jpg"
            if ((Get-Item "../frontend/public/images/86/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/86/img_2.jpg") -or
    (Get-Item "../frontend/public/images/86/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=862"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/86/img_2.jpg"
            if ((Get-Item "../frontend/public/images/86/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/86/img_3.jpg") -or
    (Get-Item "../frontend/public/images/86/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/studio?lock=863"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/86/img_3.jpg"
            if ((Get-Item "../frontend/public/images/86/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/87")) { New-Item -ItemType Directory -Path "../frontend/public/images/87" -Force }

if (
    -not (Test-Path "../frontend/public/images/87/img_1.jpg") -or
    (Get-Item "../frontend/public/images/87/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=871"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/87/img_1.jpg"
            if ((Get-Item "../frontend/public/images/87/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/87/img_2.jpg") -or
    (Get-Item "../frontend/public/images/87/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=872"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/87/img_2.jpg"
            if ((Get-Item "../frontend/public/images/87/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/87/img_3.jpg") -or
    (Get-Item "../frontend/public/images/87/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/studio?lock=873"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/87/img_3.jpg"
            if ((Get-Item "../frontend/public/images/87/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/88")) { New-Item -ItemType Directory -Path "../frontend/public/images/88" -Force }

if (
    -not (Test-Path "../frontend/public/images/88/img_1.jpg") -or
    (Get-Item "../frontend/public/images/88/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=881"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/88/img_1.jpg"
            if ((Get-Item "../frontend/public/images/88/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/88/img_2.jpg") -or
    (Get-Item "../frontend/public/images/88/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=882"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/88/img_2.jpg"
            if ((Get-Item "../frontend/public/images/88/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/88/img_3.jpg") -or
    (Get-Item "../frontend/public/images/88/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/studio?lock=883"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/88/img_3.jpg"
            if ((Get-Item "../frontend/public/images/88/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/89")) { New-Item -ItemType Directory -Path "../frontend/public/images/89" -Force }

if (
    -not (Test-Path "../frontend/public/images/89/img_1.jpg") -or
    (Get-Item "../frontend/public/images/89/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=891"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/89/img_1.jpg"
            if ((Get-Item "../frontend/public/images/89/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/89/img_2.jpg") -or
    (Get-Item "../frontend/public/images/89/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=892"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/89/img_2.jpg"
            if ((Get-Item "../frontend/public/images/89/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/89/img_3.jpg") -or
    (Get-Item "../frontend/public/images/89/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/studio?lock=893"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/89/img_3.jpg"
            if ((Get-Item "../frontend/public/images/89/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/91")) { New-Item -ItemType Directory -Path "../frontend/public/images/91" -Force }

if (
    -not (Test-Path "../frontend/public/images/91/img_1.jpg") -or
    (Get-Item "../frontend/public/images/91/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=911"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/91/img_1.jpg"
            if ((Get-Item "../frontend/public/images/91/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/91/img_2.jpg") -or
    (Get-Item "../frontend/public/images/91/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=912"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/91/img_2.jpg"
            if ((Get-Item "../frontend/public/images/91/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/91/img_3.jpg") -or
    (Get-Item "../frontend/public/images/91/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=913"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/91/img_3.jpg"
            if ((Get-Item "../frontend/public/images/91/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/92")) { New-Item -ItemType Directory -Path "../frontend/public/images/92" -Force }

if (
    -not (Test-Path "../frontend/public/images/92/img_1.jpg") -or
    (Get-Item "../frontend/public/images/92/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=921"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/92/img_1.jpg"
            if ((Get-Item "../frontend/public/images/92/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/92/img_2.jpg") -or
    (Get-Item "../frontend/public/images/92/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=922"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/92/img_2.jpg"
            if ((Get-Item "../frontend/public/images/92/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/92/img_3.jpg") -or
    (Get-Item "../frontend/public/images/92/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=923"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/92/img_3.jpg"
            if ((Get-Item "../frontend/public/images/92/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/93")) { New-Item -ItemType Directory -Path "../frontend/public/images/93" -Force }

if (
    -not (Test-Path "../frontend/public/images/93/img_1.jpg") -or
    (Get-Item "../frontend/public/images/93/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=931"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/93/img_1.jpg"
            if ((Get-Item "../frontend/public/images/93/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/93/img_2.jpg") -or
    (Get-Item "../frontend/public/images/93/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=932"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/93/img_2.jpg"
            if ((Get-Item "../frontend/public/images/93/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/93/img_3.jpg") -or
    (Get-Item "../frontend/public/images/93/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=933"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/93/img_3.jpg"
            if ((Get-Item "../frontend/public/images/93/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/94")) { New-Item -ItemType Directory -Path "../frontend/public/images/94" -Force }

if (
    -not (Test-Path "../frontend/public/images/94/img_1.jpg") -or
    (Get-Item "../frontend/public/images/94/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=941"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/94/img_1.jpg"
            if ((Get-Item "../frontend/public/images/94/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/94/img_2.jpg") -or
    (Get-Item "../frontend/public/images/94/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=942"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/94/img_2.jpg"
            if ((Get-Item "../frontend/public/images/94/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/94/img_3.jpg") -or
    (Get-Item "../frontend/public/images/94/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=943"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/94/img_3.jpg"
            if ((Get-Item "../frontend/public/images/94/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/95")) { New-Item -ItemType Directory -Path "../frontend/public/images/95" -Force }

if (
    -not (Test-Path "../frontend/public/images/95/img_1.jpg") -or
    (Get-Item "../frontend/public/images/95/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=951"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/95/img_1.jpg"
            if ((Get-Item "../frontend/public/images/95/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/95/img_2.jpg") -or
    (Get-Item "../frontend/public/images/95/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=952"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/95/img_2.jpg"
            if ((Get-Item "../frontend/public/images/95/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/95/img_3.jpg") -or
    (Get-Item "../frontend/public/images/95/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=953"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/95/img_3.jpg"
            if ((Get-Item "../frontend/public/images/95/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/96")) { New-Item -ItemType Directory -Path "../frontend/public/images/96" -Force }

if (
    -not (Test-Path "../frontend/public/images/96/img_1.jpg") -or
    (Get-Item "../frontend/public/images/96/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=961"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/96/img_1.jpg"
            if ((Get-Item "../frontend/public/images/96/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/96/img_2.jpg") -or
    (Get-Item "../frontend/public/images/96/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=962"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/96/img_2.jpg"
            if ((Get-Item "../frontend/public/images/96/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/96/img_3.jpg") -or
    (Get-Item "../frontend/public/images/96/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=963"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/96/img_3.jpg"
            if ((Get-Item "../frontend/public/images/96/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/97")) { New-Item -ItemType Directory -Path "../frontend/public/images/97" -Force }

if (
    -not (Test-Path "../frontend/public/images/97/img_1.jpg") -or
    (Get-Item "../frontend/public/images/97/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=971"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/97/img_1.jpg"
            if ((Get-Item "../frontend/public/images/97/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/97/img_2.jpg") -or
    (Get-Item "../frontend/public/images/97/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=972"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/97/img_2.jpg"
            if ((Get-Item "../frontend/public/images/97/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/97/img_3.jpg") -or
    (Get-Item "../frontend/public/images/97/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=973"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/97/img_3.jpg"
            if ((Get-Item "../frontend/public/images/97/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/98")) { New-Item -ItemType Directory -Path "../frontend/public/images/98" -Force }

if (
    -not (Test-Path "../frontend/public/images/98/img_1.jpg") -or
    (Get-Item "../frontend/public/images/98/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=981"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/98/img_1.jpg"
            if ((Get-Item "../frontend/public/images/98/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/98/img_2.jpg") -or
    (Get-Item "../frontend/public/images/98/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=982"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/98/img_2.jpg"
            if ((Get-Item "../frontend/public/images/98/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/98/img_3.jpg") -or
    (Get-Item "../frontend/public/images/98/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=983"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/98/img_3.jpg"
            if ((Get-Item "../frontend/public/images/98/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/99")) { New-Item -ItemType Directory -Path "../frontend/public/images/99" -Force }

if (
    -not (Test-Path "../frontend/public/images/99/img_1.jpg") -or
    (Get-Item "../frontend/public/images/99/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=991"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/99/img_1.jpg"
            if ((Get-Item "../frontend/public/images/99/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/99/img_2.jpg") -or
    (Get-Item "../frontend/public/images/99/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=992"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/99/img_2.jpg"
            if ((Get-Item "../frontend/public/images/99/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/99/img_3.jpg") -or
    (Get-Item "../frontend/public/images/99/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=993"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/99/img_3.jpg"
            if ((Get-Item "../frontend/public/images/99/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/100")) { New-Item -ItemType Directory -Path "../frontend/public/images/100" -Force }

if (
    -not (Test-Path "../frontend/public/images/100/img_1.jpg") -or
    (Get-Item "../frontend/public/images/100/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1001"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/100/img_1.jpg"
            if ((Get-Item "../frontend/public/images/100/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/100/img_2.jpg") -or
    (Get-Item "../frontend/public/images/100/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1002"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/100/img_2.jpg"
            if ((Get-Item "../frontend/public/images/100/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/100/img_3.jpg") -or
    (Get-Item "../frontend/public/images/100/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1003"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/100/img_3.jpg"
            if ((Get-Item "../frontend/public/images/100/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/102")) { New-Item -ItemType Directory -Path "../frontend/public/images/102" -Force }

if (
    -not (Test-Path "../frontend/public/images/102/img_1.jpg") -or
    (Get-Item "../frontend/public/images/102/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1021"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/102/img_1.jpg"
            if ((Get-Item "../frontend/public/images/102/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/102/img_2.jpg") -or
    (Get-Item "../frontend/public/images/102/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1022"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/102/img_2.jpg"
            if ((Get-Item "../frontend/public/images/102/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/102/img_3.jpg") -or
    (Get-Item "../frontend/public/images/102/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/office?lock=1023"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/102/img_3.jpg"
            if ((Get-Item "../frontend/public/images/102/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/103")) { New-Item -ItemType Directory -Path "../frontend/public/images/103" -Force }

if (
    -not (Test-Path "../frontend/public/images/103/img_1.jpg") -or
    (Get-Item "../frontend/public/images/103/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1031"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/103/img_1.jpg"
            if ((Get-Item "../frontend/public/images/103/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/103/img_2.jpg") -or
    (Get-Item "../frontend/public/images/103/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1032"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/103/img_2.jpg"
            if ((Get-Item "../frontend/public/images/103/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/103/img_3.jpg") -or
    (Get-Item "../frontend/public/images/103/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/office?lock=1033"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/103/img_3.jpg"
            if ((Get-Item "../frontend/public/images/103/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/104")) { New-Item -ItemType Directory -Path "../frontend/public/images/104" -Force }

if (
    -not (Test-Path "../frontend/public/images/104/img_1.jpg") -or
    (Get-Item "../frontend/public/images/104/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1041"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/104/img_1.jpg"
            if ((Get-Item "../frontend/public/images/104/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/104/img_2.jpg") -or
    (Get-Item "../frontend/public/images/104/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1042"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/104/img_2.jpg"
            if ((Get-Item "../frontend/public/images/104/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/104/img_3.jpg") -or
    (Get-Item "../frontend/public/images/104/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/office?lock=1043"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/104/img_3.jpg"
            if ((Get-Item "../frontend/public/images/104/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/105")) { New-Item -ItemType Directory -Path "../frontend/public/images/105" -Force }

if (
    -not (Test-Path "../frontend/public/images/105/img_1.jpg") -or
    (Get-Item "../frontend/public/images/105/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1051"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/105/img_1.jpg"
            if ((Get-Item "../frontend/public/images/105/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/105/img_2.jpg") -or
    (Get-Item "../frontend/public/images/105/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1052"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/105/img_2.jpg"
            if ((Get-Item "../frontend/public/images/105/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/105/img_3.jpg") -or
    (Get-Item "../frontend/public/images/105/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/office?lock=1053"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/105/img_3.jpg"
            if ((Get-Item "../frontend/public/images/105/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/106")) { New-Item -ItemType Directory -Path "../frontend/public/images/106" -Force }

if (
    -not (Test-Path "../frontend/public/images/106/img_1.jpg") -or
    (Get-Item "../frontend/public/images/106/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1061"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/106/img_1.jpg"
            if ((Get-Item "../frontend/public/images/106/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/106/img_2.jpg") -or
    (Get-Item "../frontend/public/images/106/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1062"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/106/img_2.jpg"
            if ((Get-Item "../frontend/public/images/106/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/106/img_3.jpg") -or
    (Get-Item "../frontend/public/images/106/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/office?lock=1063"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/106/img_3.jpg"
            if ((Get-Item "../frontend/public/images/106/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/108")) { New-Item -ItemType Directory -Path "../frontend/public/images/108" -Force }

if (
    -not (Test-Path "../frontend/public/images/108/img_1.jpg") -or
    (Get-Item "../frontend/public/images/108/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1081"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/108/img_1.jpg"
            if ((Get-Item "../frontend/public/images/108/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/108/img_2.jpg") -or
    (Get-Item "../frontend/public/images/108/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1082"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/108/img_2.jpg"
            if ((Get-Item "../frontend/public/images/108/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/108/img_3.jpg") -or
    (Get-Item "../frontend/public/images/108/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/office?lock=1083"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/108/img_3.jpg"
            if ((Get-Item "../frontend/public/images/108/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/109")) { New-Item -ItemType Directory -Path "../frontend/public/images/109" -Force }

if (
    -not (Test-Path "../frontend/public/images/109/img_1.jpg") -or
    (Get-Item "../frontend/public/images/109/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1091"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/109/img_1.jpg"
            if ((Get-Item "../frontend/public/images/109/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/109/img_2.jpg") -or
    (Get-Item "../frontend/public/images/109/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1092"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/109/img_2.jpg"
            if ((Get-Item "../frontend/public/images/109/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/109/img_3.jpg") -or
    (Get-Item "../frontend/public/images/109/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/office?lock=1093"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/109/img_3.jpg"
            if ((Get-Item "../frontend/public/images/109/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/110")) { New-Item -ItemType Directory -Path "../frontend/public/images/110" -Force }

if (
    -not (Test-Path "../frontend/public/images/110/img_1.jpg") -or
    (Get-Item "../frontend/public/images/110/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1101"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/110/img_1.jpg"
            if ((Get-Item "../frontend/public/images/110/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/110/img_2.jpg") -or
    (Get-Item "../frontend/public/images/110/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1102"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/110/img_2.jpg"
            if ((Get-Item "../frontend/public/images/110/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/110/img_3.jpg") -or
    (Get-Item "../frontend/public/images/110/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/office?lock=1103"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/110/img_3.jpg"
            if ((Get-Item "../frontend/public/images/110/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/111")) { New-Item -ItemType Directory -Path "../frontend/public/images/111" -Force }

if (
    -not (Test-Path "../frontend/public/images/111/img_1.jpg") -or
    (Get-Item "../frontend/public/images/111/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1111"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/111/img_1.jpg"
            if ((Get-Item "../frontend/public/images/111/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/111/img_2.jpg") -or
    (Get-Item "../frontend/public/images/111/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1112"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/111/img_2.jpg"
            if ((Get-Item "../frontend/public/images/111/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/111/img_3.jpg") -or
    (Get-Item "../frontend/public/images/111/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1113"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/111/img_3.jpg"
            if ((Get-Item "../frontend/public/images/111/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/112")) { New-Item -ItemType Directory -Path "../frontend/public/images/112" -Force }

if (
    -not (Test-Path "../frontend/public/images/112/img_1.jpg") -or
    (Get-Item "../frontend/public/images/112/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1121"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/112/img_1.jpg"
            if ((Get-Item "../frontend/public/images/112/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/112/img_2.jpg") -or
    (Get-Item "../frontend/public/images/112/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1122"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/112/img_2.jpg"
            if ((Get-Item "../frontend/public/images/112/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/112/img_3.jpg") -or
    (Get-Item "../frontend/public/images/112/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1123"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/112/img_3.jpg"
            if ((Get-Item "../frontend/public/images/112/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/113")) { New-Item -ItemType Directory -Path "../frontend/public/images/113" -Force }

if (
    -not (Test-Path "../frontend/public/images/113/img_1.jpg") -or
    (Get-Item "../frontend/public/images/113/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1131"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/113/img_1.jpg"
            if ((Get-Item "../frontend/public/images/113/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/113/img_2.jpg") -or
    (Get-Item "../frontend/public/images/113/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1132"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/113/img_2.jpg"
            if ((Get-Item "../frontend/public/images/113/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/113/img_3.jpg") -or
    (Get-Item "../frontend/public/images/113/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1133"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/113/img_3.jpg"
            if ((Get-Item "../frontend/public/images/113/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/114")) { New-Item -ItemType Directory -Path "../frontend/public/images/114" -Force }

if (
    -not (Test-Path "../frontend/public/images/114/img_1.jpg") -or
    (Get-Item "../frontend/public/images/114/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1141"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/114/img_1.jpg"
            if ((Get-Item "../frontend/public/images/114/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/114/img_2.jpg") -or
    (Get-Item "../frontend/public/images/114/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1142"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/114/img_2.jpg"
            if ((Get-Item "../frontend/public/images/114/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/114/img_3.jpg") -or
    (Get-Item "../frontend/public/images/114/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1143"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/114/img_3.jpg"
            if ((Get-Item "../frontend/public/images/114/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/115")) { New-Item -ItemType Directory -Path "../frontend/public/images/115" -Force }

if (
    -not (Test-Path "../frontend/public/images/115/img_1.jpg") -or
    (Get-Item "../frontend/public/images/115/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1151"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/115/img_1.jpg"
            if ((Get-Item "../frontend/public/images/115/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/115/img_2.jpg") -or
    (Get-Item "../frontend/public/images/115/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1152"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/115/img_2.jpg"
            if ((Get-Item "../frontend/public/images/115/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/115/img_3.jpg") -or
    (Get-Item "../frontend/public/images/115/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1153"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/115/img_3.jpg"
            if ((Get-Item "../frontend/public/images/115/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/116")) { New-Item -ItemType Directory -Path "../frontend/public/images/116" -Force }

if (
    -not (Test-Path "../frontend/public/images/116/img_1.jpg") -or
    (Get-Item "../frontend/public/images/116/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1161"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/116/img_1.jpg"
            if ((Get-Item "../frontend/public/images/116/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/116/img_2.jpg") -or
    (Get-Item "../frontend/public/images/116/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1162"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/116/img_2.jpg"
            if ((Get-Item "../frontend/public/images/116/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/116/img_3.jpg") -or
    (Get-Item "../frontend/public/images/116/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1163"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/116/img_3.jpg"
            if ((Get-Item "../frontend/public/images/116/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/117")) { New-Item -ItemType Directory -Path "../frontend/public/images/117" -Force }

if (
    -not (Test-Path "../frontend/public/images/117/img_1.jpg") -or
    (Get-Item "../frontend/public/images/117/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1171"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/117/img_1.jpg"
            if ((Get-Item "../frontend/public/images/117/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/117/img_2.jpg") -or
    (Get-Item "../frontend/public/images/117/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1172"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/117/img_2.jpg"
            if ((Get-Item "../frontend/public/images/117/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/117/img_3.jpg") -or
    (Get-Item "../frontend/public/images/117/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1173"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/117/img_3.jpg"
            if ((Get-Item "../frontend/public/images/117/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/118")) { New-Item -ItemType Directory -Path "../frontend/public/images/118" -Force }

if (
    -not (Test-Path "../frontend/public/images/118/img_1.jpg") -or
    (Get-Item "../frontend/public/images/118/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1181"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/118/img_1.jpg"
            if ((Get-Item "../frontend/public/images/118/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/118/img_2.jpg") -or
    (Get-Item "../frontend/public/images/118/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1182"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/118/img_2.jpg"
            if ((Get-Item "../frontend/public/images/118/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/118/img_3.jpg") -or
    (Get-Item "../frontend/public/images/118/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1183"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/118/img_3.jpg"
            if ((Get-Item "../frontend/public/images/118/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/119")) { New-Item -ItemType Directory -Path "../frontend/public/images/119" -Force }

if (
    -not (Test-Path "../frontend/public/images/119/img_1.jpg") -or
    (Get-Item "../frontend/public/images/119/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1191"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/119/img_1.jpg"
            if ((Get-Item "../frontend/public/images/119/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/119/img_2.jpg") -or
    (Get-Item "../frontend/public/images/119/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1192"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/119/img_2.jpg"
            if ((Get-Item "../frontend/public/images/119/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/119/img_3.jpg") -or
    (Get-Item "../frontend/public/images/119/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1193"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/119/img_3.jpg"
            if ((Get-Item "../frontend/public/images/119/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/120")) { New-Item -ItemType Directory -Path "../frontend/public/images/120" -Force }

if (
    -not (Test-Path "../frontend/public/images/120/img_1.jpg") -or
    (Get-Item "../frontend/public/images/120/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1201"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/120/img_1.jpg"
            if ((Get-Item "../frontend/public/images/120/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/120/img_2.jpg") -or
    (Get-Item "../frontend/public/images/120/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1202"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/120/img_2.jpg"
            if ((Get-Item "../frontend/public/images/120/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/120/img_3.jpg") -or
    (Get-Item "../frontend/public/images/120/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1203"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/120/img_3.jpg"
            if ((Get-Item "../frontend/public/images/120/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/121")) { New-Item -ItemType Directory -Path "../frontend/public/images/121" -Force }

if (
    -not (Test-Path "../frontend/public/images/121/img_1.jpg") -or
    (Get-Item "../frontend/public/images/121/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1211"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/121/img_1.jpg"
            if ((Get-Item "../frontend/public/images/121/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/121/img_2.jpg") -or
    (Get-Item "../frontend/public/images/121/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1212"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/121/img_2.jpg"
            if ((Get-Item "../frontend/public/images/121/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/121/img_3.jpg") -or
    (Get-Item "../frontend/public/images/121/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1213"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/121/img_3.jpg"
            if ((Get-Item "../frontend/public/images/121/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/122")) { New-Item -ItemType Directory -Path "../frontend/public/images/122" -Force }

if (
    -not (Test-Path "../frontend/public/images/122/img_1.jpg") -or
    (Get-Item "../frontend/public/images/122/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1221"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/122/img_1.jpg"
            if ((Get-Item "../frontend/public/images/122/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/122/img_2.jpg") -or
    (Get-Item "../frontend/public/images/122/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1222"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/122/img_2.jpg"
            if ((Get-Item "../frontend/public/images/122/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/122/img_3.jpg") -or
    (Get-Item "../frontend/public/images/122/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1223"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/122/img_3.jpg"
            if ((Get-Item "../frontend/public/images/122/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/123")) { New-Item -ItemType Directory -Path "../frontend/public/images/123" -Force }

if (
    -not (Test-Path "../frontend/public/images/123/img_1.jpg") -or
    (Get-Item "../frontend/public/images/123/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1231"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/123/img_1.jpg"
            if ((Get-Item "../frontend/public/images/123/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/123/img_2.jpg") -or
    (Get-Item "../frontend/public/images/123/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1232"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/123/img_2.jpg"
            if ((Get-Item "../frontend/public/images/123/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/123/img_3.jpg") -or
    (Get-Item "../frontend/public/images/123/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1233"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/123/img_3.jpg"
            if ((Get-Item "../frontend/public/images/123/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/124")) { New-Item -ItemType Directory -Path "../frontend/public/images/124" -Force }

if (
    -not (Test-Path "../frontend/public/images/124/img_1.jpg") -or
    (Get-Item "../frontend/public/images/124/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1241"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/124/img_1.jpg"
            if ((Get-Item "../frontend/public/images/124/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/124/img_2.jpg") -or
    (Get-Item "../frontend/public/images/124/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1242"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/124/img_2.jpg"
            if ((Get-Item "../frontend/public/images/124/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/124/img_3.jpg") -or
    (Get-Item "../frontend/public/images/124/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1243"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/124/img_3.jpg"
            if ((Get-Item "../frontend/public/images/124/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/125")) { New-Item -ItemType Directory -Path "../frontend/public/images/125" -Force }

if (
    -not (Test-Path "../frontend/public/images/125/img_1.jpg") -or
    (Get-Item "../frontend/public/images/125/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1251"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/125/img_1.jpg"
            if ((Get-Item "../frontend/public/images/125/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/125/img_2.jpg") -or
    (Get-Item "../frontend/public/images/125/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1252"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/125/img_2.jpg"
            if ((Get-Item "../frontend/public/images/125/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/125/img_3.jpg") -or
    (Get-Item "../frontend/public/images/125/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1253"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/125/img_3.jpg"
            if ((Get-Item "../frontend/public/images/125/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/126")) { New-Item -ItemType Directory -Path "../frontend/public/images/126" -Force }

if (
    -not (Test-Path "../frontend/public/images/126/img_1.jpg") -or
    (Get-Item "../frontend/public/images/126/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1261"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/126/img_1.jpg"
            if ((Get-Item "../frontend/public/images/126/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/126/img_2.jpg") -or
    (Get-Item "../frontend/public/images/126/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1262"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/126/img_2.jpg"
            if ((Get-Item "../frontend/public/images/126/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/126/img_3.jpg") -or
    (Get-Item "../frontend/public/images/126/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1263"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/126/img_3.jpg"
            if ((Get-Item "../frontend/public/images/126/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/127")) { New-Item -ItemType Directory -Path "../frontend/public/images/127" -Force }

if (
    -not (Test-Path "../frontend/public/images/127/img_1.jpg") -or
    (Get-Item "../frontend/public/images/127/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1271"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/127/img_1.jpg"
            if ((Get-Item "../frontend/public/images/127/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/127/img_2.jpg") -or
    (Get-Item "../frontend/public/images/127/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1272"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/127/img_2.jpg"
            if ((Get-Item "../frontend/public/images/127/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/127/img_3.jpg") -or
    (Get-Item "../frontend/public/images/127/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1273"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/127/img_3.jpg"
            if ((Get-Item "../frontend/public/images/127/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/128")) { New-Item -ItemType Directory -Path "../frontend/public/images/128" -Force }

if (
    -not (Test-Path "../frontend/public/images/128/img_1.jpg") -or
    (Get-Item "../frontend/public/images/128/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1281"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/128/img_1.jpg"
            if ((Get-Item "../frontend/public/images/128/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/128/img_2.jpg") -or
    (Get-Item "../frontend/public/images/128/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1282"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/128/img_2.jpg"
            if ((Get-Item "../frontend/public/images/128/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/128/img_3.jpg") -or
    (Get-Item "../frontend/public/images/128/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1283"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/128/img_3.jpg"
            if ((Get-Item "../frontend/public/images/128/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/130")) { New-Item -ItemType Directory -Path "../frontend/public/images/130" -Force }

if (
    -not (Test-Path "../frontend/public/images/130/img_1.jpg") -or
    (Get-Item "../frontend/public/images/130/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1301"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/130/img_1.jpg"
            if ((Get-Item "../frontend/public/images/130/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/130/img_2.jpg") -or
    (Get-Item "../frontend/public/images/130/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1302"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/130/img_2.jpg"
            if ((Get-Item "../frontend/public/images/130/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/130/img_3.jpg") -or
    (Get-Item "../frontend/public/images/130/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1303"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/130/img_3.jpg"
            if ((Get-Item "../frontend/public/images/130/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/131")) { New-Item -ItemType Directory -Path "../frontend/public/images/131" -Force }

if (
    -not (Test-Path "../frontend/public/images/131/img_1.jpg") -or
    (Get-Item "../frontend/public/images/131/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1311"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/131/img_1.jpg"
            if ((Get-Item "../frontend/public/images/131/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/131/img_2.jpg") -or
    (Get-Item "../frontend/public/images/131/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1312"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/131/img_2.jpg"
            if ((Get-Item "../frontend/public/images/131/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/131/img_3.jpg") -or
    (Get-Item "../frontend/public/images/131/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/hotel?lock=1313"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/131/img_3.jpg"
            if ((Get-Item "../frontend/public/images/131/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/132")) { New-Item -ItemType Directory -Path "../frontend/public/images/132" -Force }

if (
    -not (Test-Path "../frontend/public/images/132/img_1.jpg") -or
    (Get-Item "../frontend/public/images/132/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1321"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/132/img_1.jpg"
            if ((Get-Item "../frontend/public/images/132/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/132/img_2.jpg") -or
    (Get-Item "../frontend/public/images/132/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1322"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/132/img_2.jpg"
            if ((Get-Item "../frontend/public/images/132/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/132/img_3.jpg") -or
    (Get-Item "../frontend/public/images/132/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/hotel?lock=1323"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/132/img_3.jpg"
            if ((Get-Item "../frontend/public/images/132/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/133")) { New-Item -ItemType Directory -Path "../frontend/public/images/133" -Force }

if (
    -not (Test-Path "../frontend/public/images/133/img_1.jpg") -or
    (Get-Item "../frontend/public/images/133/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1331"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/133/img_1.jpg"
            if ((Get-Item "../frontend/public/images/133/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/133/img_2.jpg") -or
    (Get-Item "../frontend/public/images/133/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1332"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/133/img_2.jpg"
            if ((Get-Item "../frontend/public/images/133/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/133/img_3.jpg") -or
    (Get-Item "../frontend/public/images/133/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/hotel?lock=1333"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/133/img_3.jpg"
            if ((Get-Item "../frontend/public/images/133/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/134")) { New-Item -ItemType Directory -Path "../frontend/public/images/134" -Force }

if (
    -not (Test-Path "../frontend/public/images/134/img_1.jpg") -or
    (Get-Item "../frontend/public/images/134/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1341"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/134/img_1.jpg"
            if ((Get-Item "../frontend/public/images/134/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/134/img_2.jpg") -or
    (Get-Item "../frontend/public/images/134/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1342"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/134/img_2.jpg"
            if ((Get-Item "../frontend/public/images/134/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/134/img_3.jpg") -or
    (Get-Item "../frontend/public/images/134/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/hotel?lock=1343"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/134/img_3.jpg"
            if ((Get-Item "../frontend/public/images/134/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/135")) { New-Item -ItemType Directory -Path "../frontend/public/images/135" -Force }

if (
    -not (Test-Path "../frontend/public/images/135/img_1.jpg") -or
    (Get-Item "../frontend/public/images/135/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1351"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/135/img_1.jpg"
            if ((Get-Item "../frontend/public/images/135/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/135/img_2.jpg") -or
    (Get-Item "../frontend/public/images/135/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1352"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/135/img_2.jpg"
            if ((Get-Item "../frontend/public/images/135/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/135/img_3.jpg") -or
    (Get-Item "../frontend/public/images/135/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/hotel?lock=1353"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/135/img_3.jpg"
            if ((Get-Item "../frontend/public/images/135/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/136")) { New-Item -ItemType Directory -Path "../frontend/public/images/136" -Force }

if (
    -not (Test-Path "../frontend/public/images/136/img_1.jpg") -or
    (Get-Item "../frontend/public/images/136/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1361"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/136/img_1.jpg"
            if ((Get-Item "../frontend/public/images/136/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/136/img_2.jpg") -or
    (Get-Item "../frontend/public/images/136/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1362"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/136/img_2.jpg"
            if ((Get-Item "../frontend/public/images/136/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/136/img_3.jpg") -or
    (Get-Item "../frontend/public/images/136/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/hotel?lock=1363"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/136/img_3.jpg"
            if ((Get-Item "../frontend/public/images/136/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/137")) { New-Item -ItemType Directory -Path "../frontend/public/images/137" -Force }

if (
    -not (Test-Path "../frontend/public/images/137/img_1.jpg") -or
    (Get-Item "../frontend/public/images/137/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1371"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/137/img_1.jpg"
            if ((Get-Item "../frontend/public/images/137/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/137/img_2.jpg") -or
    (Get-Item "../frontend/public/images/137/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1372"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/137/img_2.jpg"
            if ((Get-Item "../frontend/public/images/137/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/137/img_3.jpg") -or
    (Get-Item "../frontend/public/images/137/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/hotel?lock=1373"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/137/img_3.jpg"
            if ((Get-Item "../frontend/public/images/137/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/138")) { New-Item -ItemType Directory -Path "../frontend/public/images/138" -Force }

if (
    -not (Test-Path "../frontend/public/images/138/img_1.jpg") -or
    (Get-Item "../frontend/public/images/138/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1381"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/138/img_1.jpg"
            if ((Get-Item "../frontend/public/images/138/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/138/img_2.jpg") -or
    (Get-Item "../frontend/public/images/138/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1382"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/138/img_2.jpg"
            if ((Get-Item "../frontend/public/images/138/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/138/img_3.jpg") -or
    (Get-Item "../frontend/public/images/138/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/hotel?lock=1383"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/138/img_3.jpg"
            if ((Get-Item "../frontend/public/images/138/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/139")) { New-Item -ItemType Directory -Path "../frontend/public/images/139" -Force }

if (
    -not (Test-Path "../frontend/public/images/139/img_1.jpg") -or
    (Get-Item "../frontend/public/images/139/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1391"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/139/img_1.jpg"
            if ((Get-Item "../frontend/public/images/139/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/139/img_2.jpg") -or
    (Get-Item "../frontend/public/images/139/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1392"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/139/img_2.jpg"
            if ((Get-Item "../frontend/public/images/139/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/139/img_3.jpg") -or
    (Get-Item "../frontend/public/images/139/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/hotel?lock=1393"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/139/img_3.jpg"
            if ((Get-Item "../frontend/public/images/139/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/140")) { New-Item -ItemType Directory -Path "../frontend/public/images/140" -Force }

if (
    -not (Test-Path "../frontend/public/images/140/img_1.jpg") -or
    (Get-Item "../frontend/public/images/140/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1401"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/140/img_1.jpg"
            if ((Get-Item "../frontend/public/images/140/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/140/img_2.jpg") -or
    (Get-Item "../frontend/public/images/140/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1402"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/140/img_2.jpg"
            if ((Get-Item "../frontend/public/images/140/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/140/img_3.jpg") -or
    (Get-Item "../frontend/public/images/140/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/hotel?lock=1403"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/140/img_3.jpg"
            if ((Get-Item "../frontend/public/images/140/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/141")) { New-Item -ItemType Directory -Path "../frontend/public/images/141" -Force }

if (
    -not (Test-Path "../frontend/public/images/141/img_1.jpg") -or
    (Get-Item "../frontend/public/images/141/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1411"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/141/img_1.jpg"
            if ((Get-Item "../frontend/public/images/141/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/141/img_2.jpg") -or
    (Get-Item "../frontend/public/images/141/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1412"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/141/img_2.jpg"
            if ((Get-Item "../frontend/public/images/141/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/141/img_3.jpg") -or
    (Get-Item "../frontend/public/images/141/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1413"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/141/img_3.jpg"
            if ((Get-Item "../frontend/public/images/141/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/142")) { New-Item -ItemType Directory -Path "../frontend/public/images/142" -Force }

if (
    -not (Test-Path "../frontend/public/images/142/img_1.jpg") -or
    (Get-Item "../frontend/public/images/142/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1421"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/142/img_1.jpg"
            if ((Get-Item "../frontend/public/images/142/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/142/img_2.jpg") -or
    (Get-Item "../frontend/public/images/142/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1422"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/142/img_2.jpg"
            if ((Get-Item "../frontend/public/images/142/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/142/img_3.jpg") -or
    (Get-Item "../frontend/public/images/142/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1423"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/142/img_3.jpg"
            if ((Get-Item "../frontend/public/images/142/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/143")) { New-Item -ItemType Directory -Path "../frontend/public/images/143" -Force }

if (
    -not (Test-Path "../frontend/public/images/143/img_1.jpg") -or
    (Get-Item "../frontend/public/images/143/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1431"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/143/img_1.jpg"
            if ((Get-Item "../frontend/public/images/143/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/143/img_2.jpg") -or
    (Get-Item "../frontend/public/images/143/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1432"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/143/img_2.jpg"
            if ((Get-Item "../frontend/public/images/143/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/143/img_3.jpg") -or
    (Get-Item "../frontend/public/images/143/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1433"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/143/img_3.jpg"
            if ((Get-Item "../frontend/public/images/143/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/144")) { New-Item -ItemType Directory -Path "../frontend/public/images/144" -Force }

if (
    -not (Test-Path "../frontend/public/images/144/img_1.jpg") -or
    (Get-Item "../frontend/public/images/144/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1441"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/144/img_1.jpg"
            if ((Get-Item "../frontend/public/images/144/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/144/img_2.jpg") -or
    (Get-Item "../frontend/public/images/144/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1442"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/144/img_2.jpg"
            if ((Get-Item "../frontend/public/images/144/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/144/img_3.jpg") -or
    (Get-Item "../frontend/public/images/144/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1443"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/144/img_3.jpg"
            if ((Get-Item "../frontend/public/images/144/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/146")) { New-Item -ItemType Directory -Path "../frontend/public/images/146" -Force }

if (
    -not (Test-Path "../frontend/public/images/146/img_1.jpg") -or
    (Get-Item "../frontend/public/images/146/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1461"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/146/img_1.jpg"
            if ((Get-Item "../frontend/public/images/146/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/146/img_2.jpg") -or
    (Get-Item "../frontend/public/images/146/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1462"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/146/img_2.jpg"
            if ((Get-Item "../frontend/public/images/146/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/146/img_3.jpg") -or
    (Get-Item "../frontend/public/images/146/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1463"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/146/img_3.jpg"
            if ((Get-Item "../frontend/public/images/146/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/147")) { New-Item -ItemType Directory -Path "../frontend/public/images/147" -Force }

if (
    -not (Test-Path "../frontend/public/images/147/img_1.jpg") -or
    (Get-Item "../frontend/public/images/147/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1471"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/147/img_1.jpg"
            if ((Get-Item "../frontend/public/images/147/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/147/img_2.jpg") -or
    (Get-Item "../frontend/public/images/147/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1472"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/147/img_2.jpg"
            if ((Get-Item "../frontend/public/images/147/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/147/img_3.jpg") -or
    (Get-Item "../frontend/public/images/147/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1473"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/147/img_3.jpg"
            if ((Get-Item "../frontend/public/images/147/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/148")) { New-Item -ItemType Directory -Path "../frontend/public/images/148" -Force }

if (
    -not (Test-Path "../frontend/public/images/148/img_1.jpg") -or
    (Get-Item "../frontend/public/images/148/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1481"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/148/img_1.jpg"
            if ((Get-Item "../frontend/public/images/148/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/148/img_2.jpg") -or
    (Get-Item "../frontend/public/images/148/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1482"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/148/img_2.jpg"
            if ((Get-Item "../frontend/public/images/148/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/148/img_3.jpg") -or
    (Get-Item "../frontend/public/images/148/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1483"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/148/img_3.jpg"
            if ((Get-Item "../frontend/public/images/148/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/149")) { New-Item -ItemType Directory -Path "../frontend/public/images/149" -Force }

if (
    -not (Test-Path "../frontend/public/images/149/img_1.jpg") -or
    (Get-Item "../frontend/public/images/149/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1491"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/149/img_1.jpg"
            if ((Get-Item "../frontend/public/images/149/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/149/img_2.jpg") -or
    (Get-Item "../frontend/public/images/149/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1492"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/149/img_2.jpg"
            if ((Get-Item "../frontend/public/images/149/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/149/img_3.jpg") -or
    (Get-Item "../frontend/public/images/149/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1493"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/149/img_3.jpg"
            if ((Get-Item "../frontend/public/images/149/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/150")) { New-Item -ItemType Directory -Path "../frontend/public/images/150" -Force }

if (
    -not (Test-Path "../frontend/public/images/150/img_1.jpg") -or
    (Get-Item "../frontend/public/images/150/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1501"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/150/img_1.jpg"
            if ((Get-Item "../frontend/public/images/150/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/150/img_2.jpg") -or
    (Get-Item "../frontend/public/images/150/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1502"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/150/img_2.jpg"
            if ((Get-Item "../frontend/public/images/150/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/150/img_3.jpg") -or
    (Get-Item "../frontend/public/images/150/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1503"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/150/img_3.jpg"
            if ((Get-Item "../frontend/public/images/150/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/151")) { New-Item -ItemType Directory -Path "../frontend/public/images/151" -Force }

if (
    -not (Test-Path "../frontend/public/images/151/img_1.jpg") -or
    (Get-Item "../frontend/public/images/151/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1511"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/151/img_1.jpg"
            if ((Get-Item "../frontend/public/images/151/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/151/img_2.jpg") -or
    (Get-Item "../frontend/public/images/151/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1512"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/151/img_2.jpg"
            if ((Get-Item "../frontend/public/images/151/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/151/img_3.jpg") -or
    (Get-Item "../frontend/public/images/151/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1513"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/151/img_3.jpg"
            if ((Get-Item "../frontend/public/images/151/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/152")) { New-Item -ItemType Directory -Path "../frontend/public/images/152" -Force }

if (
    -not (Test-Path "../frontend/public/images/152/img_1.jpg") -or
    (Get-Item "../frontend/public/images/152/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1521"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/152/img_1.jpg"
            if ((Get-Item "../frontend/public/images/152/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/152/img_2.jpg") -or
    (Get-Item "../frontend/public/images/152/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1522"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/152/img_2.jpg"
            if ((Get-Item "../frontend/public/images/152/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/152/img_3.jpg") -or
    (Get-Item "../frontend/public/images/152/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1523"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/152/img_3.jpg"
            if ((Get-Item "../frontend/public/images/152/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/153")) { New-Item -ItemType Directory -Path "../frontend/public/images/153" -Force }

if (
    -not (Test-Path "../frontend/public/images/153/img_1.jpg") -or
    (Get-Item "../frontend/public/images/153/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1531"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/153/img_1.jpg"
            if ((Get-Item "../frontend/public/images/153/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/153/img_2.jpg") -or
    (Get-Item "../frontend/public/images/153/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1532"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/153/img_2.jpg"
            if ((Get-Item "../frontend/public/images/153/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/153/img_3.jpg") -or
    (Get-Item "../frontend/public/images/153/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1533"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/153/img_3.jpg"
            if ((Get-Item "../frontend/public/images/153/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/154")) { New-Item -ItemType Directory -Path "../frontend/public/images/154" -Force }

if (
    -not (Test-Path "../frontend/public/images/154/img_1.jpg") -or
    (Get-Item "../frontend/public/images/154/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1541"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/154/img_1.jpg"
            if ((Get-Item "../frontend/public/images/154/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/154/img_2.jpg") -or
    (Get-Item "../frontend/public/images/154/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1542"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/154/img_2.jpg"
            if ((Get-Item "../frontend/public/images/154/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/154/img_3.jpg") -or
    (Get-Item "../frontend/public/images/154/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1543"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/154/img_3.jpg"
            if ((Get-Item "../frontend/public/images/154/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/155")) { New-Item -ItemType Directory -Path "../frontend/public/images/155" -Force }

if (
    -not (Test-Path "../frontend/public/images/155/img_1.jpg") -or
    (Get-Item "../frontend/public/images/155/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1551"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/155/img_1.jpg"
            if ((Get-Item "../frontend/public/images/155/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/155/img_2.jpg") -or
    (Get-Item "../frontend/public/images/155/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1552"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/155/img_2.jpg"
            if ((Get-Item "../frontend/public/images/155/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/155/img_3.jpg") -or
    (Get-Item "../frontend/public/images/155/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1553"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/155/img_3.jpg"
            if ((Get-Item "../frontend/public/images/155/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/156")) { New-Item -ItemType Directory -Path "../frontend/public/images/156" -Force }

if (
    -not (Test-Path "../frontend/public/images/156/img_1.jpg") -or
    (Get-Item "../frontend/public/images/156/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1561"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/156/img_1.jpg"
            if ((Get-Item "../frontend/public/images/156/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/156/img_2.jpg") -or
    (Get-Item "../frontend/public/images/156/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1562"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/156/img_2.jpg"
            if ((Get-Item "../frontend/public/images/156/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/156/img_3.jpg") -or
    (Get-Item "../frontend/public/images/156/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1563"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/156/img_3.jpg"
            if ((Get-Item "../frontend/public/images/156/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/157")) { New-Item -ItemType Directory -Path "../frontend/public/images/157" -Force }

if (
    -not (Test-Path "../frontend/public/images/157/img_1.jpg") -or
    (Get-Item "../frontend/public/images/157/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1571"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/157/img_1.jpg"
            if ((Get-Item "../frontend/public/images/157/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/157/img_2.jpg") -or
    (Get-Item "../frontend/public/images/157/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1572"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/157/img_2.jpg"
            if ((Get-Item "../frontend/public/images/157/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/157/img_3.jpg") -or
    (Get-Item "../frontend/public/images/157/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1573"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/157/img_3.jpg"
            if ((Get-Item "../frontend/public/images/157/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/158")) { New-Item -ItemType Directory -Path "../frontend/public/images/158" -Force }

if (
    -not (Test-Path "../frontend/public/images/158/img_1.jpg") -or
    (Get-Item "../frontend/public/images/158/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1581"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/158/img_1.jpg"
            if ((Get-Item "../frontend/public/images/158/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/158/img_2.jpg") -or
    (Get-Item "../frontend/public/images/158/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1582"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/158/img_2.jpg"
            if ((Get-Item "../frontend/public/images/158/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/158/img_3.jpg") -or
    (Get-Item "../frontend/public/images/158/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1583"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/158/img_3.jpg"
            if ((Get-Item "../frontend/public/images/158/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/159")) { New-Item -ItemType Directory -Path "../frontend/public/images/159" -Force }

if (
    -not (Test-Path "../frontend/public/images/159/img_1.jpg") -or
    (Get-Item "../frontend/public/images/159/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1591"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/159/img_1.jpg"
            if ((Get-Item "../frontend/public/images/159/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/159/img_2.jpg") -or
    (Get-Item "../frontend/public/images/159/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1592"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/159/img_2.jpg"
            if ((Get-Item "../frontend/public/images/159/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/159/img_3.jpg") -or
    (Get-Item "../frontend/public/images/159/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1593"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/159/img_3.jpg"
            if ((Get-Item "../frontend/public/images/159/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/160")) { New-Item -ItemType Directory -Path "../frontend/public/images/160" -Force }

if (
    -not (Test-Path "../frontend/public/images/160/img_1.jpg") -or
    (Get-Item "../frontend/public/images/160/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1601"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/160/img_1.jpg"
            if ((Get-Item "../frontend/public/images/160/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/160/img_2.jpg") -or
    (Get-Item "../frontend/public/images/160/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1602"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/160/img_2.jpg"
            if ((Get-Item "../frontend/public/images/160/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/160/img_3.jpg") -or
    (Get-Item "../frontend/public/images/160/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1603"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/160/img_3.jpg"
            if ((Get-Item "../frontend/public/images/160/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/162")) { New-Item -ItemType Directory -Path "../frontend/public/images/162" -Force }

if (
    -not (Test-Path "../frontend/public/images/162/img_1.jpg") -or
    (Get-Item "../frontend/public/images/162/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1621"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/162/img_1.jpg"
            if ((Get-Item "../frontend/public/images/162/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/162/img_2.jpg") -or
    (Get-Item "../frontend/public/images/162/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1622"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/162/img_2.jpg"
            if ((Get-Item "../frontend/public/images/162/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/162/img_3.jpg") -or
    (Get-Item "../frontend/public/images/162/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1623"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/162/img_3.jpg"
            if ((Get-Item "../frontend/public/images/162/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/163")) { New-Item -ItemType Directory -Path "../frontend/public/images/163" -Force }

if (
    -not (Test-Path "../frontend/public/images/163/img_1.jpg") -or
    (Get-Item "../frontend/public/images/163/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1631"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/163/img_1.jpg"
            if ((Get-Item "../frontend/public/images/163/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/163/img_2.jpg") -or
    (Get-Item "../frontend/public/images/163/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1632"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/163/img_2.jpg"
            if ((Get-Item "../frontend/public/images/163/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/163/img_3.jpg") -or
    (Get-Item "../frontend/public/images/163/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1633"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/163/img_3.jpg"
            if ((Get-Item "../frontend/public/images/163/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/164")) { New-Item -ItemType Directory -Path "../frontend/public/images/164" -Force }

if (
    -not (Test-Path "../frontend/public/images/164/img_1.jpg") -or
    (Get-Item "../frontend/public/images/164/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1641"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/164/img_1.jpg"
            if ((Get-Item "../frontend/public/images/164/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/164/img_2.jpg") -or
    (Get-Item "../frontend/public/images/164/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1642"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/164/img_2.jpg"
            if ((Get-Item "../frontend/public/images/164/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/164/img_3.jpg") -or
    (Get-Item "../frontend/public/images/164/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1643"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/164/img_3.jpg"
            if ((Get-Item "../frontend/public/images/164/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/165")) { New-Item -ItemType Directory -Path "../frontend/public/images/165" -Force }

if (
    -not (Test-Path "../frontend/public/images/165/img_1.jpg") -or
    (Get-Item "../frontend/public/images/165/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1651"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/165/img_1.jpg"
            if ((Get-Item "../frontend/public/images/165/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/165/img_2.jpg") -or
    (Get-Item "../frontend/public/images/165/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1652"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/165/img_2.jpg"
            if ((Get-Item "../frontend/public/images/165/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/165/img_3.jpg") -or
    (Get-Item "../frontend/public/images/165/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1653"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/165/img_3.jpg"
            if ((Get-Item "../frontend/public/images/165/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/166")) { New-Item -ItemType Directory -Path "../frontend/public/images/166" -Force }

if (
    -not (Test-Path "../frontend/public/images/166/img_1.jpg") -or
    (Get-Item "../frontend/public/images/166/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1661"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/166/img_1.jpg"
            if ((Get-Item "../frontend/public/images/166/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/166/img_2.jpg") -or
    (Get-Item "../frontend/public/images/166/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1662"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/166/img_2.jpg"
            if ((Get-Item "../frontend/public/images/166/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/166/img_3.jpg") -or
    (Get-Item "../frontend/public/images/166/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1663"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/166/img_3.jpg"
            if ((Get-Item "../frontend/public/images/166/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/167")) { New-Item -ItemType Directory -Path "../frontend/public/images/167" -Force }

if (
    -not (Test-Path "../frontend/public/images/167/img_1.jpg") -or
    (Get-Item "../frontend/public/images/167/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1671"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/167/img_1.jpg"
            if ((Get-Item "../frontend/public/images/167/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/167/img_2.jpg") -or
    (Get-Item "../frontend/public/images/167/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1672"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/167/img_2.jpg"
            if ((Get-Item "../frontend/public/images/167/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/167/img_3.jpg") -or
    (Get-Item "../frontend/public/images/167/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1673"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/167/img_3.jpg"
            if ((Get-Item "../frontend/public/images/167/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/168")) { New-Item -ItemType Directory -Path "../frontend/public/images/168" -Force }

if (
    -not (Test-Path "../frontend/public/images/168/img_1.jpg") -or
    (Get-Item "../frontend/public/images/168/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1681"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/168/img_1.jpg"
            if ((Get-Item "../frontend/public/images/168/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/168/img_2.jpg") -or
    (Get-Item "../frontend/public/images/168/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1682"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/168/img_2.jpg"
            if ((Get-Item "../frontend/public/images/168/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/168/img_3.jpg") -or
    (Get-Item "../frontend/public/images/168/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1683"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/168/img_3.jpg"
            if ((Get-Item "../frontend/public/images/168/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/169")) { New-Item -ItemType Directory -Path "../frontend/public/images/169" -Force }

if (
    -not (Test-Path "../frontend/public/images/169/img_1.jpg") -or
    (Get-Item "../frontend/public/images/169/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1691"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/169/img_1.jpg"
            if ((Get-Item "../frontend/public/images/169/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/169/img_2.jpg") -or
    (Get-Item "../frontend/public/images/169/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1692"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/169/img_2.jpg"
            if ((Get-Item "../frontend/public/images/169/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/169/img_3.jpg") -or
    (Get-Item "../frontend/public/images/169/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1693"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/169/img_3.jpg"
            if ((Get-Item "../frontend/public/images/169/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/170")) { New-Item -ItemType Directory -Path "../frontend/public/images/170" -Force }

if (
    -not (Test-Path "../frontend/public/images/170/img_1.jpg") -or
    (Get-Item "../frontend/public/images/170/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1701"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/170/img_1.jpg"
            if ((Get-Item "../frontend/public/images/170/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/170/img_2.jpg") -or
    (Get-Item "../frontend/public/images/170/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1702"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/170/img_2.jpg"
            if ((Get-Item "../frontend/public/images/170/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/170/img_3.jpg") -or
    (Get-Item "../frontend/public/images/170/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1703"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/170/img_3.jpg"
            if ((Get-Item "../frontend/public/images/170/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/171")) { New-Item -ItemType Directory -Path "../frontend/public/images/171" -Force }

if (
    -not (Test-Path "../frontend/public/images/171/img_1.jpg") -or
    (Get-Item "../frontend/public/images/171/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1711"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/171/img_1.jpg"
            if ((Get-Item "../frontend/public/images/171/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/171/img_2.jpg") -or
    (Get-Item "../frontend/public/images/171/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1712"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/171/img_2.jpg"
            if ((Get-Item "../frontend/public/images/171/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/171/img_3.jpg") -or
    (Get-Item "../frontend/public/images/171/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1713"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/171/img_3.jpg"
            if ((Get-Item "../frontend/public/images/171/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/172")) { New-Item -ItemType Directory -Path "../frontend/public/images/172" -Force }

if (
    -not (Test-Path "../frontend/public/images/172/img_1.jpg") -or
    (Get-Item "../frontend/public/images/172/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1721"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/172/img_1.jpg"
            if ((Get-Item "../frontend/public/images/172/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/172/img_2.jpg") -or
    (Get-Item "../frontend/public/images/172/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1722"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/172/img_2.jpg"
            if ((Get-Item "../frontend/public/images/172/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/172/img_3.jpg") -or
    (Get-Item "../frontend/public/images/172/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1723"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/172/img_3.jpg"
            if ((Get-Item "../frontend/public/images/172/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/173")) { New-Item -ItemType Directory -Path "../frontend/public/images/173" -Force }

if (
    -not (Test-Path "../frontend/public/images/173/img_1.jpg") -or
    (Get-Item "../frontend/public/images/173/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1731"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/173/img_1.jpg"
            if ((Get-Item "../frontend/public/images/173/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/173/img_2.jpg") -or
    (Get-Item "../frontend/public/images/173/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1732"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/173/img_2.jpg"
            if ((Get-Item "../frontend/public/images/173/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/173/img_3.jpg") -or
    (Get-Item "../frontend/public/images/173/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1733"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/173/img_3.jpg"
            if ((Get-Item "../frontend/public/images/173/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/174")) { New-Item -ItemType Directory -Path "../frontend/public/images/174" -Force }

if (
    -not (Test-Path "../frontend/public/images/174/img_1.jpg") -or
    (Get-Item "../frontend/public/images/174/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1741"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/174/img_1.jpg"
            if ((Get-Item "../frontend/public/images/174/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/174/img_2.jpg") -or
    (Get-Item "../frontend/public/images/174/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1742"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/174/img_2.jpg"
            if ((Get-Item "../frontend/public/images/174/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/174/img_3.jpg") -or
    (Get-Item "../frontend/public/images/174/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1743"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/174/img_3.jpg"
            if ((Get-Item "../frontend/public/images/174/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/175")) { New-Item -ItemType Directory -Path "../frontend/public/images/175" -Force }

if (
    -not (Test-Path "../frontend/public/images/175/img_1.jpg") -or
    (Get-Item "../frontend/public/images/175/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1751"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/175/img_1.jpg"
            if ((Get-Item "../frontend/public/images/175/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/175/img_2.jpg") -or
    (Get-Item "../frontend/public/images/175/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1752"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/175/img_2.jpg"
            if ((Get-Item "../frontend/public/images/175/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/175/img_3.jpg") -or
    (Get-Item "../frontend/public/images/175/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1753"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/175/img_3.jpg"
            if ((Get-Item "../frontend/public/images/175/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/176")) { New-Item -ItemType Directory -Path "../frontend/public/images/176" -Force }

if (
    -not (Test-Path "../frontend/public/images/176/img_1.jpg") -or
    (Get-Item "../frontend/public/images/176/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1761"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/176/img_1.jpg"
            if ((Get-Item "../frontend/public/images/176/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/176/img_2.jpg") -or
    (Get-Item "../frontend/public/images/176/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1762"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/176/img_2.jpg"
            if ((Get-Item "../frontend/public/images/176/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/176/img_3.jpg") -or
    (Get-Item "../frontend/public/images/176/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1763"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/176/img_3.jpg"
            if ((Get-Item "../frontend/public/images/176/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/177")) { New-Item -ItemType Directory -Path "../frontend/public/images/177" -Force }

if (
    -not (Test-Path "../frontend/public/images/177/img_1.jpg") -or
    (Get-Item "../frontend/public/images/177/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1771"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/177/img_1.jpg"
            if ((Get-Item "../frontend/public/images/177/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/177/img_2.jpg") -or
    (Get-Item "../frontend/public/images/177/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1772"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/177/img_2.jpg"
            if ((Get-Item "../frontend/public/images/177/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/177/img_3.jpg") -or
    (Get-Item "../frontend/public/images/177/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1773"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/177/img_3.jpg"
            if ((Get-Item "../frontend/public/images/177/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/178")) { New-Item -ItemType Directory -Path "../frontend/public/images/178" -Force }

if (
    -not (Test-Path "../frontend/public/images/178/img_1.jpg") -or
    (Get-Item "../frontend/public/images/178/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1781"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/178/img_1.jpg"
            if ((Get-Item "../frontend/public/images/178/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/178/img_2.jpg") -or
    (Get-Item "../frontend/public/images/178/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1782"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/178/img_2.jpg"
            if ((Get-Item "../frontend/public/images/178/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/178/img_3.jpg") -or
    (Get-Item "../frontend/public/images/178/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1783"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/178/img_3.jpg"
            if ((Get-Item "../frontend/public/images/178/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/179")) { New-Item -ItemType Directory -Path "../frontend/public/images/179" -Force }

if (
    -not (Test-Path "../frontend/public/images/179/img_1.jpg") -or
    (Get-Item "../frontend/public/images/179/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1791"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/179/img_1.jpg"
            if ((Get-Item "../frontend/public/images/179/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/179/img_2.jpg") -or
    (Get-Item "../frontend/public/images/179/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1792"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/179/img_2.jpg"
            if ((Get-Item "../frontend/public/images/179/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/179/img_3.jpg") -or
    (Get-Item "../frontend/public/images/179/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1793"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/179/img_3.jpg"
            if ((Get-Item "../frontend/public/images/179/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/180")) { New-Item -ItemType Directory -Path "../frontend/public/images/180" -Force }

if (
    -not (Test-Path "../frontend/public/images/180/img_1.jpg") -or
    (Get-Item "../frontend/public/images/180/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1801"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/180/img_1.jpg"
            if ((Get-Item "../frontend/public/images/180/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/180/img_2.jpg") -or
    (Get-Item "../frontend/public/images/180/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1802"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/180/img_2.jpg"
            if ((Get-Item "../frontend/public/images/180/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/180/img_3.jpg") -or
    (Get-Item "../frontend/public/images/180/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1803"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/180/img_3.jpg"
            if ((Get-Item "../frontend/public/images/180/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/181")) { New-Item -ItemType Directory -Path "../frontend/public/images/181" -Force }

if (
    -not (Test-Path "../frontend/public/images/181/img_1.jpg") -or
    (Get-Item "../frontend/public/images/181/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1811"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/181/img_1.jpg"
            if ((Get-Item "../frontend/public/images/181/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/181/img_2.jpg") -or
    (Get-Item "../frontend/public/images/181/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1812"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/181/img_2.jpg"
            if ((Get-Item "../frontend/public/images/181/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/181/img_3.jpg") -or
    (Get-Item "../frontend/public/images/181/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1813"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/181/img_3.jpg"
            if ((Get-Item "../frontend/public/images/181/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/182")) { New-Item -ItemType Directory -Path "../frontend/public/images/182" -Force }

if (
    -not (Test-Path "../frontend/public/images/182/img_1.jpg") -or
    (Get-Item "../frontend/public/images/182/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1821"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/182/img_1.jpg"
            if ((Get-Item "../frontend/public/images/182/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/182/img_2.jpg") -or
    (Get-Item "../frontend/public/images/182/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1822"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/182/img_2.jpg"
            if ((Get-Item "../frontend/public/images/182/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/182/img_3.jpg") -or
    (Get-Item "../frontend/public/images/182/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1823"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/182/img_3.jpg"
            if ((Get-Item "../frontend/public/images/182/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/183")) { New-Item -ItemType Directory -Path "../frontend/public/images/183" -Force }

if (
    -not (Test-Path "../frontend/public/images/183/img_1.jpg") -or
    (Get-Item "../frontend/public/images/183/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1831"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/183/img_1.jpg"
            if ((Get-Item "../frontend/public/images/183/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/183/img_2.jpg") -or
    (Get-Item "../frontend/public/images/183/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1832"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/183/img_2.jpg"
            if ((Get-Item "../frontend/public/images/183/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/183/img_3.jpg") -or
    (Get-Item "../frontend/public/images/183/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1833"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/183/img_3.jpg"
            if ((Get-Item "../frontend/public/images/183/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/185")) { New-Item -ItemType Directory -Path "../frontend/public/images/185" -Force }

if (
    -not (Test-Path "../frontend/public/images/185/img_1.jpg") -or
    (Get-Item "../frontend/public/images/185/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1851"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/185/img_1.jpg"
            if ((Get-Item "../frontend/public/images/185/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/185/img_2.jpg") -or
    (Get-Item "../frontend/public/images/185/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1852"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/185/img_2.jpg"
            if ((Get-Item "../frontend/public/images/185/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/185/img_3.jpg") -or
    (Get-Item "../frontend/public/images/185/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1853"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/185/img_3.jpg"
            if ((Get-Item "../frontend/public/images/185/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/186")) { New-Item -ItemType Directory -Path "../frontend/public/images/186" -Force }

if (
    -not (Test-Path "../frontend/public/images/186/img_1.jpg") -or
    (Get-Item "../frontend/public/images/186/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1861"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/186/img_1.jpg"
            if ((Get-Item "../frontend/public/images/186/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/186/img_2.jpg") -or
    (Get-Item "../frontend/public/images/186/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1862"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/186/img_2.jpg"
            if ((Get-Item "../frontend/public/images/186/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/186/img_3.jpg") -or
    (Get-Item "../frontend/public/images/186/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1863"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/186/img_3.jpg"
            if ((Get-Item "../frontend/public/images/186/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/187")) { New-Item -ItemType Directory -Path "../frontend/public/images/187" -Force }

if (
    -not (Test-Path "../frontend/public/images/187/img_1.jpg") -or
    (Get-Item "../frontend/public/images/187/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1871"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/187/img_1.jpg"
            if ((Get-Item "../frontend/public/images/187/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/187/img_2.jpg") -or
    (Get-Item "../frontend/public/images/187/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1872"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/187/img_2.jpg"
            if ((Get-Item "../frontend/public/images/187/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/187/img_3.jpg") -or
    (Get-Item "../frontend/public/images/187/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1873"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/187/img_3.jpg"
            if ((Get-Item "../frontend/public/images/187/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/188")) { New-Item -ItemType Directory -Path "../frontend/public/images/188" -Force }

if (
    -not (Test-Path "../frontend/public/images/188/img_1.jpg") -or
    (Get-Item "../frontend/public/images/188/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1881"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/188/img_1.jpg"
            if ((Get-Item "../frontend/public/images/188/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/188/img_2.jpg") -or
    (Get-Item "../frontend/public/images/188/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1882"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/188/img_2.jpg"
            if ((Get-Item "../frontend/public/images/188/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/188/img_3.jpg") -or
    (Get-Item "../frontend/public/images/188/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1883"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/188/img_3.jpg"
            if ((Get-Item "../frontend/public/images/188/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/189")) { New-Item -ItemType Directory -Path "../frontend/public/images/189" -Force }

if (
    -not (Test-Path "../frontend/public/images/189/img_1.jpg") -or
    (Get-Item "../frontend/public/images/189/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1891"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/189/img_1.jpg"
            if ((Get-Item "../frontend/public/images/189/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/189/img_2.jpg") -or
    (Get-Item "../frontend/public/images/189/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1892"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/189/img_2.jpg"
            if ((Get-Item "../frontend/public/images/189/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/189/img_3.jpg") -or
    (Get-Item "../frontend/public/images/189/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1893"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/189/img_3.jpg"
            if ((Get-Item "../frontend/public/images/189/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/190")) { New-Item -ItemType Directory -Path "../frontend/public/images/190" -Force }

if (
    -not (Test-Path "../frontend/public/images/190/img_1.jpg") -or
    (Get-Item "../frontend/public/images/190/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1901"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/190/img_1.jpg"
            if ((Get-Item "../frontend/public/images/190/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/190/img_2.jpg") -or
    (Get-Item "../frontend/public/images/190/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1902"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/190/img_2.jpg"
            if ((Get-Item "../frontend/public/images/190/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/190/img_3.jpg") -or
    (Get-Item "../frontend/public/images/190/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1903"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/190/img_3.jpg"
            if ((Get-Item "../frontend/public/images/190/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/191")) { New-Item -ItemType Directory -Path "../frontend/public/images/191" -Force }

if (
    -not (Test-Path "../frontend/public/images/191/img_1.jpg") -or
    (Get-Item "../frontend/public/images/191/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1911"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/191/img_1.jpg"
            if ((Get-Item "../frontend/public/images/191/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/191/img_2.jpg") -or
    (Get-Item "../frontend/public/images/191/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1912"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/191/img_2.jpg"
            if ((Get-Item "../frontend/public/images/191/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/191/img_3.jpg") -or
    (Get-Item "../frontend/public/images/191/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1913"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/191/img_3.jpg"
            if ((Get-Item "../frontend/public/images/191/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/192")) { New-Item -ItemType Directory -Path "../frontend/public/images/192" -Force }

if (
    -not (Test-Path "../frontend/public/images/192/img_1.jpg") -or
    (Get-Item "../frontend/public/images/192/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1921"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/192/img_1.jpg"
            if ((Get-Item "../frontend/public/images/192/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/192/img_2.jpg") -or
    (Get-Item "../frontend/public/images/192/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1922"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/192/img_2.jpg"
            if ((Get-Item "../frontend/public/images/192/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/192/img_3.jpg") -or
    (Get-Item "../frontend/public/images/192/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1923"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/192/img_3.jpg"
            if ((Get-Item "../frontend/public/images/192/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/193")) { New-Item -ItemType Directory -Path "../frontend/public/images/193" -Force }

if (
    -not (Test-Path "../frontend/public/images/193/img_1.jpg") -or
    (Get-Item "../frontend/public/images/193/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1931"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/193/img_1.jpg"
            if ((Get-Item "../frontend/public/images/193/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/193/img_2.jpg") -or
    (Get-Item "../frontend/public/images/193/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1932"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/193/img_2.jpg"
            if ((Get-Item "../frontend/public/images/193/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/193/img_3.jpg") -or
    (Get-Item "../frontend/public/images/193/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1933"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/193/img_3.jpg"
            if ((Get-Item "../frontend/public/images/193/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/194")) { New-Item -ItemType Directory -Path "../frontend/public/images/194" -Force }

if (
    -not (Test-Path "../frontend/public/images/194/img_1.jpg") -or
    (Get-Item "../frontend/public/images/194/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1941"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/194/img_1.jpg"
            if ((Get-Item "../frontend/public/images/194/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/194/img_2.jpg") -or
    (Get-Item "../frontend/public/images/194/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1942"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/194/img_2.jpg"
            if ((Get-Item "../frontend/public/images/194/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/194/img_3.jpg") -or
    (Get-Item "../frontend/public/images/194/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1943"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/194/img_3.jpg"
            if ((Get-Item "../frontend/public/images/194/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/195")) { New-Item -ItemType Directory -Path "../frontend/public/images/195" -Force }

if (
    -not (Test-Path "../frontend/public/images/195/img_1.jpg") -or
    (Get-Item "../frontend/public/images/195/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1951"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/195/img_1.jpg"
            if ((Get-Item "../frontend/public/images/195/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/195/img_2.jpg") -or
    (Get-Item "../frontend/public/images/195/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1952"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/195/img_2.jpg"
            if ((Get-Item "../frontend/public/images/195/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/195/img_3.jpg") -or
    (Get-Item "../frontend/public/images/195/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1953"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/195/img_3.jpg"
            if ((Get-Item "../frontend/public/images/195/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/196")) { New-Item -ItemType Directory -Path "../frontend/public/images/196" -Force }

if (
    -not (Test-Path "../frontend/public/images/196/img_1.jpg") -or
    (Get-Item "../frontend/public/images/196/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1961"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/196/img_1.jpg"
            if ((Get-Item "../frontend/public/images/196/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/196/img_2.jpg") -or
    (Get-Item "../frontend/public/images/196/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1962"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/196/img_2.jpg"
            if ((Get-Item "../frontend/public/images/196/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/196/img_3.jpg") -or
    (Get-Item "../frontend/public/images/196/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1963"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/196/img_3.jpg"
            if ((Get-Item "../frontend/public/images/196/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/197")) { New-Item -ItemType Directory -Path "../frontend/public/images/197" -Force }

if (
    -not (Test-Path "../frontend/public/images/197/img_1.jpg") -or
    (Get-Item "../frontend/public/images/197/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1971"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/197/img_1.jpg"
            if ((Get-Item "../frontend/public/images/197/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/197/img_2.jpg") -or
    (Get-Item "../frontend/public/images/197/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1972"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/197/img_2.jpg"
            if ((Get-Item "../frontend/public/images/197/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/197/img_3.jpg") -or
    (Get-Item "../frontend/public/images/197/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1973"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/197/img_3.jpg"
            if ((Get-Item "../frontend/public/images/197/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/198")) { New-Item -ItemType Directory -Path "../frontend/public/images/198" -Force }

if (
    -not (Test-Path "../frontend/public/images/198/img_1.jpg") -or
    (Get-Item "../frontend/public/images/198/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1981"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/198/img_1.jpg"
            if ((Get-Item "../frontend/public/images/198/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/198/img_2.jpg") -or
    (Get-Item "../frontend/public/images/198/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1982"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/198/img_2.jpg"
            if ((Get-Item "../frontend/public/images/198/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/198/img_3.jpg") -or
    (Get-Item "../frontend/public/images/198/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1983"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/198/img_3.jpg"
            if ((Get-Item "../frontend/public/images/198/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/199")) { New-Item -ItemType Directory -Path "../frontend/public/images/199" -Force }

if (
    -not (Test-Path "../frontend/public/images/199/img_1.jpg") -or
    (Get-Item "../frontend/public/images/199/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=1991"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/199/img_1.jpg"
            if ((Get-Item "../frontend/public/images/199/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/199/img_2.jpg") -or
    (Get-Item "../frontend/public/images/199/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=1992"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/199/img_2.jpg"
            if ((Get-Item "../frontend/public/images/199/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/199/img_3.jpg") -or
    (Get-Item "../frontend/public/images/199/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=1993"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/199/img_3.jpg"
            if ((Get-Item "../frontend/public/images/199/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/200")) { New-Item -ItemType Directory -Path "../frontend/public/images/200" -Force }

if (
    -not (Test-Path "../frontend/public/images/200/img_1.jpg") -or
    (Get-Item "../frontend/public/images/200/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2001"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/200/img_1.jpg"
            if ((Get-Item "../frontend/public/images/200/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/200/img_2.jpg") -or
    (Get-Item "../frontend/public/images/200/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=2002"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/200/img_2.jpg"
            if ((Get-Item "../frontend/public/images/200/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/200/img_3.jpg") -or
    (Get-Item "../frontend/public/images/200/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2003"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/200/img_3.jpg"
            if ((Get-Item "../frontend/public/images/200/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/201")) { New-Item -ItemType Directory -Path "../frontend/public/images/201" -Force }

if (
    -not (Test-Path "../frontend/public/images/201/img_1.jpg") -or
    (Get-Item "../frontend/public/images/201/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2011"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/201/img_1.jpg"
            if ((Get-Item "../frontend/public/images/201/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/201/img_2.jpg") -or
    (Get-Item "../frontend/public/images/201/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2012"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/201/img_2.jpg"
            if ((Get-Item "../frontend/public/images/201/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/201/img_3.jpg") -or
    (Get-Item "../frontend/public/images/201/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/warehouse?lock=2013"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/201/img_3.jpg"
            if ((Get-Item "../frontend/public/images/201/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/202")) { New-Item -ItemType Directory -Path "../frontend/public/images/202" -Force }

if (
    -not (Test-Path "../frontend/public/images/202/img_1.jpg") -or
    (Get-Item "../frontend/public/images/202/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2021"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/202/img_1.jpg"
            if ((Get-Item "../frontend/public/images/202/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/202/img_2.jpg") -or
    (Get-Item "../frontend/public/images/202/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2022"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/202/img_2.jpg"
            if ((Get-Item "../frontend/public/images/202/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/202/img_3.jpg") -or
    (Get-Item "../frontend/public/images/202/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/warehouse?lock=2023"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/202/img_3.jpg"
            if ((Get-Item "../frontend/public/images/202/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/203")) { New-Item -ItemType Directory -Path "../frontend/public/images/203" -Force }

if (
    -not (Test-Path "../frontend/public/images/203/img_1.jpg") -or
    (Get-Item "../frontend/public/images/203/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2031"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/203/img_1.jpg"
            if ((Get-Item "../frontend/public/images/203/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/203/img_2.jpg") -or
    (Get-Item "../frontend/public/images/203/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2032"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/203/img_2.jpg"
            if ((Get-Item "../frontend/public/images/203/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/203/img_3.jpg") -or
    (Get-Item "../frontend/public/images/203/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/warehouse?lock=2033"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/203/img_3.jpg"
            if ((Get-Item "../frontend/public/images/203/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/204")) { New-Item -ItemType Directory -Path "../frontend/public/images/204" -Force }

if (
    -not (Test-Path "../frontend/public/images/204/img_1.jpg") -or
    (Get-Item "../frontend/public/images/204/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2041"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/204/img_1.jpg"
            if ((Get-Item "../frontend/public/images/204/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/204/img_2.jpg") -or
    (Get-Item "../frontend/public/images/204/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2042"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/204/img_2.jpg"
            if ((Get-Item "../frontend/public/images/204/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/204/img_3.jpg") -or
    (Get-Item "../frontend/public/images/204/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/warehouse?lock=2043"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/204/img_3.jpg"
            if ((Get-Item "../frontend/public/images/204/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/205")) { New-Item -ItemType Directory -Path "../frontend/public/images/205" -Force }

if (
    -not (Test-Path "../frontend/public/images/205/img_1.jpg") -or
    (Get-Item "../frontend/public/images/205/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2051"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/205/img_1.jpg"
            if ((Get-Item "../frontend/public/images/205/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/205/img_2.jpg") -or
    (Get-Item "../frontend/public/images/205/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2052"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/205/img_2.jpg"
            if ((Get-Item "../frontend/public/images/205/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/205/img_3.jpg") -or
    (Get-Item "../frontend/public/images/205/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/warehouse?lock=2053"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/205/img_3.jpg"
            if ((Get-Item "../frontend/public/images/205/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/206")) { New-Item -ItemType Directory -Path "../frontend/public/images/206" -Force }

if (
    -not (Test-Path "../frontend/public/images/206/img_1.jpg") -or
    (Get-Item "../frontend/public/images/206/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2061"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/206/img_1.jpg"
            if ((Get-Item "../frontend/public/images/206/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/206/img_2.jpg") -or
    (Get-Item "../frontend/public/images/206/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2062"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/206/img_2.jpg"
            if ((Get-Item "../frontend/public/images/206/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/206/img_3.jpg") -or
    (Get-Item "../frontend/public/images/206/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/warehouse?lock=2063"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/206/img_3.jpg"
            if ((Get-Item "../frontend/public/images/206/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/207")) { New-Item -ItemType Directory -Path "../frontend/public/images/207" -Force }

if (
    -not (Test-Path "../frontend/public/images/207/img_1.jpg") -or
    (Get-Item "../frontend/public/images/207/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2071"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/207/img_1.jpg"
            if ((Get-Item "../frontend/public/images/207/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/207/img_2.jpg") -or
    (Get-Item "../frontend/public/images/207/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2072"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/207/img_2.jpg"
            if ((Get-Item "../frontend/public/images/207/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/207/img_3.jpg") -or
    (Get-Item "../frontend/public/images/207/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/warehouse?lock=2073"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/207/img_3.jpg"
            if ((Get-Item "../frontend/public/images/207/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/208")) { New-Item -ItemType Directory -Path "../frontend/public/images/208" -Force }

if (
    -not (Test-Path "../frontend/public/images/208/img_1.jpg") -or
    (Get-Item "../frontend/public/images/208/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2081"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/208/img_1.jpg"
            if ((Get-Item "../frontend/public/images/208/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/208/img_2.jpg") -or
    (Get-Item "../frontend/public/images/208/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2082"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/208/img_2.jpg"
            if ((Get-Item "../frontend/public/images/208/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/208/img_3.jpg") -or
    (Get-Item "../frontend/public/images/208/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/warehouse?lock=2083"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/208/img_3.jpg"
            if ((Get-Item "../frontend/public/images/208/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/209")) { New-Item -ItemType Directory -Path "../frontend/public/images/209" -Force }

if (
    -not (Test-Path "../frontend/public/images/209/img_1.jpg") -or
    (Get-Item "../frontend/public/images/209/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2091"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/209/img_1.jpg"
            if ((Get-Item "../frontend/public/images/209/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/209/img_2.jpg") -or
    (Get-Item "../frontend/public/images/209/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2092"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/209/img_2.jpg"
            if ((Get-Item "../frontend/public/images/209/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/209/img_3.jpg") -or
    (Get-Item "../frontend/public/images/209/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/warehouse?lock=2093"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/209/img_3.jpg"
            if ((Get-Item "../frontend/public/images/209/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/210")) { New-Item -ItemType Directory -Path "../frontend/public/images/210" -Force }

if (
    -not (Test-Path "../frontend/public/images/210/img_1.jpg") -or
    (Get-Item "../frontend/public/images/210/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2101"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/210/img_1.jpg"
            if ((Get-Item "../frontend/public/images/210/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/210/img_2.jpg") -or
    (Get-Item "../frontend/public/images/210/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2102"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/210/img_2.jpg"
            if ((Get-Item "../frontend/public/images/210/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/210/img_3.jpg") -or
    (Get-Item "../frontend/public/images/210/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/warehouse?lock=2103"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/210/img_3.jpg"
            if ((Get-Item "../frontend/public/images/210/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/211")) { New-Item -ItemType Directory -Path "../frontend/public/images/211" -Force }

if (
    -not (Test-Path "../frontend/public/images/211/img_1.jpg") -or
    (Get-Item "../frontend/public/images/211/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2111"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/211/img_1.jpg"
            if ((Get-Item "../frontend/public/images/211/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/211/img_2.jpg") -or
    (Get-Item "../frontend/public/images/211/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=2112"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/211/img_2.jpg"
            if ((Get-Item "../frontend/public/images/211/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/211/img_3.jpg") -or
    (Get-Item "../frontend/public/images/211/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2113"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/211/img_3.jpg"
            if ((Get-Item "../frontend/public/images/211/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/212")) { New-Item -ItemType Directory -Path "../frontend/public/images/212" -Force }

if (
    -not (Test-Path "../frontend/public/images/212/img_1.jpg") -or
    (Get-Item "../frontend/public/images/212/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2121"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/212/img_1.jpg"
            if ((Get-Item "../frontend/public/images/212/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/212/img_2.jpg") -or
    (Get-Item "../frontend/public/images/212/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=2122"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/212/img_2.jpg"
            if ((Get-Item "../frontend/public/images/212/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/212/img_3.jpg") -or
    (Get-Item "../frontend/public/images/212/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2123"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/212/img_3.jpg"
            if ((Get-Item "../frontend/public/images/212/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/213")) { New-Item -ItemType Directory -Path "../frontend/public/images/213" -Force }

if (
    -not (Test-Path "../frontend/public/images/213/img_1.jpg") -or
    (Get-Item "../frontend/public/images/213/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2131"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/213/img_1.jpg"
            if ((Get-Item "../frontend/public/images/213/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/213/img_2.jpg") -or
    (Get-Item "../frontend/public/images/213/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=2132"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/213/img_2.jpg"
            if ((Get-Item "../frontend/public/images/213/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/213/img_3.jpg") -or
    (Get-Item "../frontend/public/images/213/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2133"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/213/img_3.jpg"
            if ((Get-Item "../frontend/public/images/213/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/214")) { New-Item -ItemType Directory -Path "../frontend/public/images/214" -Force }

if (
    -not (Test-Path "../frontend/public/images/214/img_1.jpg") -or
    (Get-Item "../frontend/public/images/214/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2141"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/214/img_1.jpg"
            if ((Get-Item "../frontend/public/images/214/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/214/img_2.jpg") -or
    (Get-Item "../frontend/public/images/214/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=2142"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/214/img_2.jpg"
            if ((Get-Item "../frontend/public/images/214/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/214/img_3.jpg") -or
    (Get-Item "../frontend/public/images/214/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2143"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/214/img_3.jpg"
            if ((Get-Item "../frontend/public/images/214/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/215")) { New-Item -ItemType Directory -Path "../frontend/public/images/215" -Force }

if (
    -not (Test-Path "../frontend/public/images/215/img_1.jpg") -or
    (Get-Item "../frontend/public/images/215/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2151"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/215/img_1.jpg"
            if ((Get-Item "../frontend/public/images/215/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/215/img_2.jpg") -or
    (Get-Item "../frontend/public/images/215/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=2152"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/215/img_2.jpg"
            if ((Get-Item "../frontend/public/images/215/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/215/img_3.jpg") -or
    (Get-Item "../frontend/public/images/215/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2153"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/215/img_3.jpg"
            if ((Get-Item "../frontend/public/images/215/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/216")) { New-Item -ItemType Directory -Path "../frontend/public/images/216" -Force }

if (
    -not (Test-Path "../frontend/public/images/216/img_1.jpg") -or
    (Get-Item "../frontend/public/images/216/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2161"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/216/img_1.jpg"
            if ((Get-Item "../frontend/public/images/216/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/216/img_2.jpg") -or
    (Get-Item "../frontend/public/images/216/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=2162"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/216/img_2.jpg"
            if ((Get-Item "../frontend/public/images/216/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/216/img_3.jpg") -or
    (Get-Item "../frontend/public/images/216/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2163"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/216/img_3.jpg"
            if ((Get-Item "../frontend/public/images/216/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/217")) { New-Item -ItemType Directory -Path "../frontend/public/images/217" -Force }

if (
    -not (Test-Path "../frontend/public/images/217/img_1.jpg") -or
    (Get-Item "../frontend/public/images/217/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2171"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/217/img_1.jpg"
            if ((Get-Item "../frontend/public/images/217/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/217/img_2.jpg") -or
    (Get-Item "../frontend/public/images/217/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=2172"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/217/img_2.jpg"
            if ((Get-Item "../frontend/public/images/217/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/217/img_3.jpg") -or
    (Get-Item "../frontend/public/images/217/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2173"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/217/img_3.jpg"
            if ((Get-Item "../frontend/public/images/217/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/218")) { New-Item -ItemType Directory -Path "../frontend/public/images/218" -Force }

if (
    -not (Test-Path "../frontend/public/images/218/img_1.jpg") -or
    (Get-Item "../frontend/public/images/218/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2181"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/218/img_1.jpg"
            if ((Get-Item "../frontend/public/images/218/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/218/img_2.jpg") -or
    (Get-Item "../frontend/public/images/218/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=2182"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/218/img_2.jpg"
            if ((Get-Item "../frontend/public/images/218/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/218/img_3.jpg") -or
    (Get-Item "../frontend/public/images/218/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2183"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/218/img_3.jpg"
            if ((Get-Item "../frontend/public/images/218/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/219")) { New-Item -ItemType Directory -Path "../frontend/public/images/219" -Force }

if (
    -not (Test-Path "../frontend/public/images/219/img_1.jpg") -or
    (Get-Item "../frontend/public/images/219/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2191"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/219/img_1.jpg"
            if ((Get-Item "../frontend/public/images/219/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/219/img_2.jpg") -or
    (Get-Item "../frontend/public/images/219/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=2192"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/219/img_2.jpg"
            if ((Get-Item "../frontend/public/images/219/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/219/img_3.jpg") -or
    (Get-Item "../frontend/public/images/219/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2193"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/219/img_3.jpg"
            if ((Get-Item "../frontend/public/images/219/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
if (-not (Test-Path "../frontend/public/images/220")) { New-Item -ItemType Directory -Path "../frontend/public/images/220" -Force }

if (
    -not (Test-Path "../frontend/public/images/220/img_1.jpg") -or
    (Get-Item "../frontend/public/images/220/img_1.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/realestate?lock=2201"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/220/img_1.jpg"
            if ((Get-Item "../frontend/public/images/220/img_1.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/220/img_2.jpg") -or
    (Get-Item "../frontend/public/images/220/img_2.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/building?lock=2202"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/220/img_2.jpg"
            if ((Get-Item "../frontend/public/images/220/img_2.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}

if (
    -not (Test-Path "../frontend/public/images/220/img_3.jpg") -or
    (Get-Item "../frontend/public/images/220/img_3.jpg").Length -lt 5000
) {
    $urls = @(
        "https://loremflickr.com/1200/800/property?lock=2203"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "../frontend/public/images/220/img_3.jpg"
            if ((Get-Item "../frontend/public/images/220/img_3.jpg").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
