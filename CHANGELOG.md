# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.0] - 2025-03-31

### Added

- Hit location roller.

### Changed

- Split CSS and JS to separate files so they can be processed separately and minimized.
- Leading whitespace is now stripped from the generated HTML file.

## [0.5.0] - 2025-03-26

### Added

- Die roller for skill checks.
- Standard combat maneuvers block.

## [0.4.0] - 2025-03-23

### Changed

- All blocks are now collapsible.
- Portrait images are now directly embedded in the HTML. The export process still writes a separate image file, but it is not needed.
- The Characteristics block now shows both primary and secondary values. The `Total` column has been shifted left and renamed `Value`. The previous `Value` column has been removed, it was useless.
- Cost columns, where present, are now on the right end of each block.

## [0.3.0] - 2025-03-16

### Changed

- Background fields are now separated into discrete blocks.

## [0.2.0] - 2025-03-14

### Added

- Hit Locations block.

### Changed

- Switched from expecting JSON metadata to expecting raw CSS because that just makes way more sense. This allows far more customization to the resulting output and is significantly clearer for designers.

## 0.1.0 - 2025-03-13

- Initial version.

[0.6.0]: https://github.com/AlexHowansky/ork-hero-templates/compare/0.5.0...0.6.0
[0.5.0]: https://github.com/AlexHowansky/ork-hero-templates/compare/0.4.0...0.5.0
[0.4.0]: https://github.com/AlexHowansky/ork-hero-templates/compare/0.3.0...0.4.0
[0.3.0]: https://github.com/AlexHowansky/ork-hero-templates/compare/0.2.0...0.3.0
[0.2.0]: https://github.com/AlexHowansky/ork-hero-templates/compare/0.1.0...0.2.0
