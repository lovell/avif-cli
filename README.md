# avif-cli

Command line utility to convert images to AVIF, requires Node.js 12.13.0+

## Usage

```sh
$ npx avif
```

By default, will search current directory for image files and create AVIF variants.

Exit code is non-zero if one or more errors occured.

## Options

```
      --input              Input file name(s), supports globs/wildcards
                    [string] [default: "*.{jpg,jpeg,tif,tiff,webp,png,gif,svg}"]
      --output             Output directory
                                                [string] [default: "/home/user"]
      --quality            Quality vs file size, 1 (lowest/smallest) to 100
                           (highest/largest)              [number] [default: 50]
      --speed              CPU effort vs file size, 0 (slowest/smallest) to 8
                           (fastest/largest)               [number] [default: 5]
      --lossless           Use lossless compression   [boolean] [default: false]
      --chromaSubsampling  Set to '4:2:0' to use chroma subsampling
                                                     [string] [default: "4:4:4"]
      --overwrite          Allow existing output files to be overwritten
                                                      [boolean] [default: false]
      --verbose            Write progress to stdout   [boolean] [default: false]
  -h, --help               Show help                                   [boolean]
      --version            Show version number                         [boolean]
```

## Examples

```sh
npx avif --verbose
```

```sh
npx avif --input="**/*.{jpg,jpeg}" --output="/another/path" --overwrite
```

```sh
npx avif --input="images/*.*" --speed=0 --quality=30
```
