# Ork HERO Templates

## Description

This project contains a set of [HERO Designer](https://www.herogames.com/store/product/1-hero-designer/) character export templates with customizable features and active elements, intended for use directly in a browser during a virtual gaming session. These templates should never be used for physical printing or PDF export. The project's top priorities are to maximize use of screen real estate, minimize scrolling, and eliminate the need to have the HERO Designer application open while playing.

### Layouts

A layout defines a particular arrangement of display items. There are multiple layouts available, each provided as a separate template file. The informational content of each layout is identical, only the positioning of elements differs.

|File|Description|
|-|-|
|`Ork 16x9.hde`|This layout is intended to fit a maximized window on a 16:9 monitor.|
|`Ork 8x9.hde`|This layout is intended to fit a half-wide window on a 16:9 monitor.|

## Active Features

The following hotkeys are supported:

|Key|Feature|
|:-:|-|
|t|Toggle light/dark mode.|
|c|Navigate to the Characteristics tab.|
|s|Navigate to the Skills tab.|
|p|Navigate to the Powers tab.|
|o|Navigate to the Combat tab.|
|d|Navigate to the Disads tab.|
|b|Navigate to the Background tab.|

## Customization

Various features of this template can be configured from metadata stored in the character sheet itself. This allows for automatic customization of the resulting output, every time it is exported, without the need to subsequently edit HTML or CSS.

This is accomplished by storing a [JSON](https://www.json.org/json-en.html) block of configuration data in the `Campaign Use` field on the `Background` tab of your character file. The JSON data in this block will be extracted by the template when the page loads in the browser and the customizations will be applied to the page dynamically.

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

### Color Themes

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

For fonts, if only `name` is provided, the template will attempt to automatically acquire the required files from [Google Fonts](https://fonts.google.com). If this does not work, or a more specific configuration is desired, an explicit CSS URI may be specified.

## Development

The templates make use of [Twitter Bootstrap](https://getbootstrap.com/) and [Font Awesome](fontawesome.com) (both pulled dynamically from [cdnjs](https://cdnjs.com/)), and [Google Web Fonts](https://fonts.google.com/).

Source files are separated into chunks according to type so that content-aware IDEs can offer proper tooling.

|File|Contents|
|-|-|
|`page.html`|Common HTML page wrapper for all layouts.|
|`page.css`|Common CSS for all layouts.|
|`page.js`|Common JS for all layouts.|
|`template.xml`|Common template tags for all layouts.|
|`layouts/*.html`|Layout-specific HTML.|
|`layouts/*.xml`|Layout-specific template tags.|
|`blocks/*.html`|Definitions for HTML blocks that can be arbitrarily positioned in a layout.|

 To assemble the layouts into `*.hde` templates, run:

```sh
./build.php
```

This will create one template per layout, in the `dist` subdirectory. An optional target directory override may be specified:

```sh
./build.php /path/to/template/directory
```

For active continuous development, run:

```sh
./watch.sh
```

This will start a process that monitors all the source files and autmatically runs the build process when any change is
detected.
