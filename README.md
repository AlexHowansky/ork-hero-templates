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

Various features of this template can be configured from metadata stored in the character sheet itself. This allows for
customization of the resulting page without the need to edit HTML or CSS. To enable this feature, insert a JSON block
into the `Campaign Use` field on the `Background` tab of your character and edit as desired. If you're not familiar with
JSON, see [json.org](https://www.json.org/json-en.html). The JSON data in this field will be extracted by the template
at runtime and applied to the page dynamically.

Example:

```json
{
    "theme": "dark",
    "font": {
        "default": {
            "name": "Montserrat",
            "uri": "https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
        },
        "header": {
            "name": "Bangers",
            "uri": "https://fonts.googleapis.com/css2?family=Bangers&display=swap"
        },
        "title": {
            "name": "Poller One",
            "uri": "https://fonts.googleapis.com/css2?family=Poller+One&display=swap"
        }
    },
    "color": {
        "default": "blue",
        "header": "green",
        "title": "red"
    }
}
```

The following items may be customized:

#### Color Themes

|JSON key|Theme|
|-|-|
|`theme`|light|
|`theme`|dark|

The following fonts may be changed:

|JSON Key|Where Used|Default|
|-|-|-|
|`font.title.name`|The large character name at the top of the page.|Acme|
|`font.header.name`|The header line at the top of each table block.|Acme|
|`font.default.name`|All other text.|system-ui|

The following colors may be changed:

|JSON Key|Where Used|
|-|-|
|`color.title`|The large character name at the top of the page.|
|`color.header`|The header line at the top of each table block.|
|`color.default`|All other text.|

For fonts, if only `name` is provided, the template will attempt to automatically acquire the required files from
[Google Fonts](https://fonts.google.com). If this does not work, or a more specific configuration is desired, an
explicit CSS URI may be specified.

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
