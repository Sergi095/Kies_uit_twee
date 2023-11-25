# Kies uit Twee: Psychology Study at Vrije Universiteit Amsterdam

This repository contains the code for a work-in-progress psychology study at Vrije Universiteit Amsterdam (Kies uit Twee). The study is designed to run with [JATOS](https://www.jatos.org/Whats-JATOS.html) (Just Another Tool for Online Studies), an open source tool for running online experiments.

## Getting Started

To clone this repository you need to run the following command `git lfs clone https://github.com/Sergi095/Kies_uit_twee.git`.

The repository includes a ZIP file that contains the experiment ready to run in JATOS. 

## Running the Experiment

To run the experiment with JATOS, use the appropriate loader script for your operating system:

- On Windows, use `loader.bat`.
- On macOS or Linux, use `loader.sh`.

After downloading the ZIP file:

1. Unzip it
2. In your terminal window, cd into the unzipped experiment folder.
3. Run the loader shell script with the command `./loader.sh start` (You might have to change the file's permissions with the command `chmod u+x loader.sh` to make it executable). Ignore pop-ups like 'To use the java command-line tool you need to install a JDK' - just press 'OK'.
4. (On MacOS, you might see a pop-up saying that you can't open the application from an unknown developer - in that case click Open Anyway within the Privacy and Security tab in your System Preferences.)
5. Now go to the browser of your choice and open `127.0.0.1:9000`. You should see the login screen (wait a moment and reload the page if you don't). Login with username 'admin' and password 'admin'.
6. Your local JATOS installation will run in the background. If you want to stop it, just type `./loader.sh stop` in your terminal window.
