# Ork HERO Templates

[<img src="media/pic1.png" width="400" title="dark mode">](media/pic1.png)
[<img src="media/pic2.png" width="400" title="light mode">](media/pic2.png)

## Description

This project contains a set of [HERO Designer](https://www.herogames.com/store/product/1-hero-designer/) character export templates with customizable features and active elements, intended for use directly in a browser during a virtual gaming session. These templates should never be used for physical printing or PDF export. The project's top priorities are to maximize use of screen real estate, minimize scrolling, and eliminate the need to have the HERO Designer application open while playing.

### Layouts

A layout defines a particular arrangement of display items. There are multiple layouts available, each provided as a separate template file. The informational content of each layout is identical, only the positioning of elements differs.

|File|Description|
|-|-|
|`Ork 16x9.hde`|This layout is intended to fit a maximized window on a 16:9 monitor.|
|`Ork 8x9.hde`|This layout is intended to fit a half-wide window on a 16:9 monitor.|

### Use

* Download the latest `*.hde` template files from the [repository releases page](https://github.com/AlexHowansky/ork-hero-templates/releases) and copy them to the `Custom Export Formats` subdirectory of your HERO Designer installation.
* Launch HERO Designer amd load the desired character.
* Select `Current Character` > `Export` > `Set Export Format...`, select the desired template, and click the `Select` button.
* Save the character to make this choice persistent.
* Select `Current Character` > `Export` > `Export to File...` to generate the HTML output.

Note: the template uses the `Background` > `Campaign Use` field to store metadata. If you are experiencing any rendering issues, try emptying this field and re-exporting.

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

Various features of this template can be configured from metadata stored in the character sheet itself. This allows for automatic customization of the resulting output, every time it is exported, without the need to subsequently edit HTML or CSS in the generated file.

This is accomplished by storing [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) in the `Campaign Use` field on the `Background` tab of your character file. This CSS will be extracted by the template when the page is generated and will be applied to the resulting page. Some of the customizable elements are as follows:

|CSS Selector|Target|
|-|-|
|`.character-name`|The large character name at the top of the page.|
|`.nav-link`|The navigation tab buttons.|
|`.block-title`|The title bar at the top of each table block.|\
|`.ability-name`|Used for custom names for powers, skills, perks, and talents.|
|`.note`|Notes for powers, skills, perks, talents, and disads.|

The most useful of these customizations is arguably the ability to import web fonts. For example, look up your desired font face on [Google Web Fonts](https://fonts.google.com/) then click `Get Font` and `Get Embed Code` and select the `@import` radio. Use the supplied `@import` code to load the font and then `font-family` to apply the name of the font to the desired CSS selector. Then paste this resulting CSS into your `Campaign Use` field. For example, to change the font of your character's name:

```css
@import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap');
.character-name {
    font-family: 'Rubik Glitch';
}
```

Subsequently, every export of this character will render with the indicated font for the character name. Note if you import more than one font, all the `@import` statements must be at the top of the CSS block.

```css
@import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Acme&display=swap');
.character-name {
    font-family: 'Rubik Glitch';
}
.block-title {
    font-family: 'Acme';
}
.nav-link {
    font-family: 'Acme';
}
```

 You may of course provide any additional valid CSS properties to the provided selectors. You may have to add the `!important` CSS property to some values.

```css
@import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Acme&display=swap');
.character-name {
    color: blue;
    font-family: 'Rubik Glitch';
    font-size: 4rem;
}
.block-title {
    color: green !important;
    font-family: 'Acme';
}
.nav-link {
    font-family: 'Acme';
}
```

## Development

The templates make use of [Twitter Bootstrap](https://getbootstrap.com/) and [Font Awesome](fontawesome.com) (both pulled dynamically from [cdnjs](https://cdnjs.com/)).

Source files are separated into chunks according to type so that content-aware IDEs can offer proper tooling. Some string replacement anchors have been replaced with alternatives that are valid comments in the langauge block where they're used, so that they do not break IDE tooling or syntax highlighting.

|File|Contents|
|-|-|
|`page.html`|Common HTML page wrapper for all layouts.|
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
./watch.sh /path/to/template/directory
```

This will start a process that monitors all the source files and automatically runs the build process when any change is
detected.
