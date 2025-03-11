### Description

This is an export template for the [HERO Designer](https://www.herogames.com/store/product/1-hero-designer/) software
from [herogames.com](https://herogames.com). This template is _not_ designed for physical printing or PDF export, rather
it is intended to be used as an HTML page directly in a browser. It makes maximal use of a 16:9 display area and has
active JavaScript elements intended to ensure that scrolling is never required.

### Active Features

The following hotkeys are supported:

|Key|Feature|
|:-:|-|
|t|Toggle light/dark mode.|

### Customization

Various features of this template can be configured from metadata stored in the source character sheet. This allows for
customization of the resulting page without the need to edit HTML or CSS. The following themes may be set:

|Theme|
|-|
|light|
|dark|

The following fonts may be changed:

|JSON Key|Where Used|Default|
|-|-|-|
|title|The large character name at the top of the page.|Acme|
|header|The header line at the top of each table block.|Acme|
|default|All other text.|system-ui|

Create a JSON block as follows and paste into the Campaign Use field on the Background tab. These values will be
extracted at runtime and applied to the page dynamically.

```json
{
    "font": {
        "default": {
            "name": "Noto Sans"
        },
        "header": {
            "name": "DynaPuff"
        },
        "title": {
            "name": "Poller One"
        }
    },
    "theme": "dark"
}
```

If only `name` is provided, the template will attempt to automatically acquire the required files from [Google Fonts](https://fonts.google.com).
If this does not work, or a more specific configuration is desired, the CSS URI may be specified:

```json
{
    "font": {
        "default": {
            "name": "Noto Sans",
            "uri": "https://fonts.googleapis.com/css2?family=Noto+Sans:wdth,wght@87.5,300&display=swap"
        },
        "header": {
            "name": "DynaPuff"
        },
        "title": {
            "name": "Poller One"
        }
    },
    "theme": "dark"
}
```

### Development

Source files are separated into blocks and named according to type so that content-aware IDEs can offer proper tooling.
To assemble the blocks and build the `*.hde` template, run:

```sh
./build.php /path/to/output.hde
```

For active continuous development, run:

```sh
./watch.sh
```

This will start a process that monitors all the source files and autmatically runs the build process when any change is
detected.
