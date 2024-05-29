# Video Player with Customizable Subtitles(Will update this by 30-05-2024 11:59 PM)

This project is a web-based video player that allows users to customize subtitles in various styles and templates. It includes features for video playback, subtitle customization, and supports subtitle files in SRT format.

## Features

1. **Video Playback**:
   - Play, pause, and seek through a video.
   - Responsive and functional across different browsers and devices.

2. **Subtitle Customization**:
   - Enable/disable subtitles.
   - Change the font size, color, and background of subtitles.
   - Upload custom subtitle files in SRT format.

3. **User Interface**:
   - Clean and intuitive UI/UX.
   - Aligned with the overall design aesthetics of Clipo AI.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

Install the dependencies:

bash

    npm install

Running the Project

    Start the development server:

    bash

    npm start

    Open your browser and navigate to http://localhost:3000.

Project Structure

    src/: Contains the source code for the project.
        components/: Contains the React components.
            VideoPlayer.tsx: The main video player component.
            SubtitleCustomizer.tsx: The component for customizing subtitle settings.
        utils/: Contains utility functions.
            parseSRT.ts: Utility for parsing SRT files.

Usage

    Video Playback:
        Use the play/pause button to control the video.
    Subtitle Customization:
        Use the file input to upload a custom SRT subtitle file.
        Use the SubtitleCustomizer to adjust subtitle settings like font size, color, and background color.
