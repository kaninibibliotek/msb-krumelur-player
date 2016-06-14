# Krumelur Player

## Development
Start msb-chamberlain server, then:
```sh
$ open http://localhost:3000/krumelur/app
```

### Testing a krumelur motion path
```sh
$ open http://localhost:3000/krumelur/app/?dev&name=[desired krumelur file name]&behavior=[desired behavior]
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

### Converting JSON masks to SVG
```sh
$ python json2svg.py [inputdirectory] [outputdirectory]
```
Will make SVG versions of all JSON masks in `inputdirectory` and place them in `outputdirectory`.

Example:
```sh
$ python json2svg.py masks/ svgs/
```

### Creating an effects JSON
```sh
$ python effect2json.py [inputdirectory] [outfile] [name] [trigger] [z]
```
Will create a JSON file with the format:
```
{
    "name": [name],
    "trigger": [trigger],
    "z": [z],
    "urls" [
        "effects/[name]/file0.png",
        "effects/[name]/file1.png",
        ...
    ]
}
```
where the urls are created from the contents of [inputdirectory].

### I want one really big screen
System Preferences -> Mission Control -> Uncheck "Displays have separate Spaces"
