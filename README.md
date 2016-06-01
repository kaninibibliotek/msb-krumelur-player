# Krumelur Player

## Development
Start msb-chamberlain server
```sh
$ open http://localhost:3000/msb-krumelur-player
```

### Testing a krumelur motion path
```sh
$ open http://localhost:3000/msb-krumelur-player/?dev&name=[desired krumelur file name]&behavior=[desired behavior]
```
The desired krumelur with the desired behavior will appear. Press <kbd>A</kbd> to add it again. Press <kbd>C</kbd> to remove all krumelurer.

### Converting After Effects Motion Paths to JSON
```sh
$ python kf2json.py [input] [output] [framerate]
```
Example:
```sh
$ python kf2json.py motionpath.txt myanimation.json 60
```

### I want one really big screen
System Preferences -> Mission Control -> Uncheck "Displays have separate Spaces"
