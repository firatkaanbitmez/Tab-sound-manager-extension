# Tab Sound Manager

**Tab Sound Manager** is a Chrome extension that helps you manage the sound settings of your browser tabs with ease. You can mute or unmute individual tabs by clicking on the extension icon.

## Features

- Toggle mute/unmute for the current tab with a single click on the extension icon.
- Display different icons based on the tab's mute status.
- Configure default mute settings and other preferences via the options page.

## Installation

### Using CRX File

1. Download the latest release CRX file from the [Project page](https://github.com/firatkaanbitmez/Tab-sound-manager-extension).
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Drag and drop the downloaded `.crx` file into the `chrome://extensions/` page to install the extension.

### Using Source Code

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
- **Auto-unmute when switching tabs**: Unmute the tab when you switch to it.
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

If you encounter the error message:

**EN**: "This extension is not from any known source, and may have been added without your knowledge."

**TR**: "Bu uzantı, bilinen herhangi bir kaynaktan değil ve bilginiz dışında eklenmiş olabilir."

During installation, follow these steps to resolve the issue:

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

For any questions or feedback, please contact [Fırat Kaan Bitmez](mailto:firatbitmez@gmail.com).
