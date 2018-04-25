# Infinias Access Control Doorman

Trigger an Infinias IntelliM Access Control door to unlock with:

1. An Amazon Dash Button

## Get Started
You will need the following installed:

* [NodeJS/NPM](https://nodejs.org/en/)
* [Python 2.7](https://www.python.org/)
* [libpcap](https://github.com/the-tcpdump-group/libpcap) (Mac/Linux)
* [npcap with winpcap compatibility](https://nmap.org/npcap/) (Windows)
* [Microsoft Visual C++ 2015](https://www.microsoft.com/en-us/download/details.aspx?id=52685) (Windows)
* [Homebrew](https://brew.sh/) (Mac, optional for libpcap installation)

## Installation

### Dependencies

#### Mac
```
$> brew install libpap
```

#### Linux
##### Ubuntu/Debian
```
$> sudo apt-get install libpap
```
##### RedHat/Fedora
```
$> sudo yum install libpap
```

#### Windows
Make sure your version of Windows has Visual C++ 2015 or later,
[node requires this](https://github.com/nodejs/node/commit/2062a69879) to build native libraries.
Windows doesn't come with Python, but we'll need it to compile the OS dependencies.
After python has been installed, you'll need to install the `node-windows-build-tools`.
```
$> npm --add-python-to-path='true' --debug install --global windows-build-tools
```

### Infinias Doorman
Run this command from the command line:
```
$> npm install -g infinias-dash-doorman
```

## Configuration
You can modify `config.json` with your door's settings.  It is located next to the `doorman-run.js` file.

#### Example
```json
{
  "infiniasHost": "http://localhost:18779",
  "infiniasUsername": "admin",
  "infiniasPassword": "admin"
}
```

### Dash Button Configuration
The `dashConfig` property of the config is used to specify configuration options relating to Amazon Dash Buttons.

#### Required
The `buttons` property in the `dashConfig` is required when configuring Amazon Dash Buttons.  
Each key in the `buttons` object is the MAC address of the dash button you want to use.  Required subproperties are:

* `doorIds`: A comma separated list of the ids of each door you want to open
* `duration`: The length of time you want to open these doors for

#### Optional
You may set a `device` property in the `dashConfig`, which can specify which ethernet device to listen for dash button presses.  

#### Example
```json
{
  "infiniasHost": "http://localhost:18779",
  "infiniasUsername": "admin",
  "infiniasPassword": "admin",
  "dashConfig": {
    "device": "eth0",
    "buttons": {
      "00:00:00:00:00:00": {
        "doorIds": "1",
        "duration": 10
      }
    }
  }
}
```

## Running
Run this command from the command line:
```
$> infinias-dash-doorman
```


## Development

Run this command in the root of the project:
```
$> npm install
```
NPM will download and install the dependencies.

## Running the project

Run this command:
```
$> npm start
```
