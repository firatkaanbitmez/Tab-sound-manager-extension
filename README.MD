# Tab Sound Manager

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Tab%20Sound%20Manager-brightgreen?style=for-the-badge&logo=google-chrome)](https://chromewebstore.google.com/detail/tab-sound-manager/eemjdeojofepghfmendnefhijldggpom?authuser=0&hl=tr)


**Tab Sound Manager** is a simple yet effective Chrome extension designed to help you manage the sound settings of your browser tabs with ease. Whether you want to quickly mute a tab or unmute it, this extension provides a seamless experience with a single click.

![Extension Icon](https://raw.githubusercontent.com/firatkaanbitmez/Tab-sound-manager-extension/main/Source/icons/icon_unmuted128.png)

## Features

- **One-Click Mute/Unmute**: Quickly toggle the sound of the current tab by clicking the extension icon.
- **Visual Status Icons**: The icon dynamically changes based on whether the tab is muted or unmuted.
- **Configurable Preferences**: Adjust default mute settings and other preferences via the options page for a customized experience.

## Installation

### Install from Chrome Web Store

You can easily install the extension directly from the [Chrome Web Store](https://chromewebstore.google.com/detail/tab-sound-manager/eemjdeojofepghfmendnefhijldggpom?authuser=0&hl=tr).

### Manual Installation Using CRX File

1. Download the latest release CRX file from the [Project page](https://github.com/firatkaanbitmez/Tab-sound-manager-extension).
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Drag and drop the downloaded `.crx` file into the `chrome://extensions/` page to install the extension.

### Install Using Source Code

1. Download the latest release from the [Project page](https://github.com/firatkaanbitmez/Tab-sound-manager-extension).
2. Extract the downloaded ZIP file.
3. Open Chrome and navigate to `chrome://extensions/`.
4. Enable "Developer mode" by toggling the switch in the top right corner.
5. Click on "Load unpacked" and select the `Source` folder from the extracted files.

## Usage

- **Mute/Unmute Tabs**: Click on the extension icon to toggle the sound of the current tab.
- **Settings**: Access the options page by clicking on the extension icon and selecting "Options" to configure default mute settings and other preferences.

## Options

On the options page, you can configure the following settings:

- **Mute all tabs by default**: Automatically mute all new tabs.
- **Auto-unmute when switching tabs**: Automatically unmute a tab when you switch to it.
- **Auto-mute new tabs**: Mute new tabs automatically.

## File Structure

- `background.js`: Handles the tab mute/unmute functionality and icon updates.
- `manifest.json`: Defines the extension's metadata and permissions.
- `options.html`: Provides the options page for configuring settings.
- `options.js`: Manages the options page interactions and saving settings.
- `icons/`: Contains the icons for muted and unmuted states.
- `styles/`: Contains the CSS styles for the options page.
- `fix.bat`: A batch script to register the extension with Chrome and Edge.

## Screenshots

![Unmuted Icon](https://raw.githubusercontent.com/firatkaanbitmez/Tab-sound-manager-extension/main/Source/icons/icon_unmuted128.png)
![Muted Icon](https://raw.githubusercontent.com/firatkaanbitmez/Tab-sound-manager-extension/main/Source/icons/icon_muted128.png)

## Error Solutions for Chrome and Edge

If you encounter the following error during installation:

**EN**: "This extension is not from any known source, and may have been added without your knowledge."

**TR**: "Bu uzantı, bilinen herhangi bir kaynaktan değil ve bilginiz dışında eklenmiş olabilir."

Follow these steps to resolve the issue:

1. Run the `fix.bat` file located in the project folder as an administrator. This will adjust the necessary Windows Registry settings to support the installation of the extension.
2. The browsers will be restarted automatically upon completion.

## Development

To build and test the extension locally:

1. Navigate to the `Source` folder in your terminal.
2. Use the `fix.bat` script to register the extension and restart browsers.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [Fırat Kaan Bitmez](mailto:firatbitmez.dev@gmail.com).
