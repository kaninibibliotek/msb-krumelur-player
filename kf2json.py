import json
import re
import sys

def processOpacityKeyframes(keyframes):
    breakpoints = []

    for index, keyframe in enumerate(keyframes):
        if keyframe["opacity"] != 100:
            breakpoints.append({
                "index": index,
                "frame": keyframe["frame"]
            })

    for bp in breakpoints:
        keyframes.insert(bp["index"] + 1, {
            "frame":   bp["frame"] + 1,
            "opacity": 100
        })

def getKeyframes(inp, header, keys, default=0):
    match = re.search(header, inp)

    if (match is None):
        print "No match for %s" % (header)
        kf = {}

        for key in keys:
            if key == "frame":
                kf[key] = 0
            else:
                kf[key] = default

        return [kf]

    lines     = inp[match.start():].splitlines()[2:]
    keyframes = []

    for line in lines:
        line = line.strip()

        if line == "":
            break

        items    = line.split()
        keyframe = {}

        for idx, key in enumerate(keys):
            keyframe[key] = float(items[idx])

        keyframes.append(keyframe)

    return keyframes

def getValue(inp, header):
    match = re.search(header, inp)

    if (match is None):
        raise Exception("No match for %s" % (header))

    line = inp[match.start():].splitlines()[0]

    return float(line.split()[-1])

def convert(inp, outp, targetFps):
    infile = open(inp, "r")
    text   = infile.read()
    infile.close()

    try:
        inputFps = getValue(text, "Units Per Second")
        fpsScale = targetFps / inputFps

        jsonData = {
            "positions": getKeyframes(text, "Transform\s+Position", ["frame", "x", "y", "z"]),
            "scales":    getKeyframes(text, "Transform\s+Scale", ["frame", "x", "y"], 100),
            "rotations": getKeyframes(text, "Transform\s+Rotation", ["frame", "rotation"]),
            "opacities": getKeyframes(text, "Transform\s+Opacity", ["frame", "opacity"])
        }
    except Exception, e:
        print e
        return

    maxFrame = 0

    for keyframes in jsonData.values():
        for kf in keyframes:
            kf["frame"] *= fpsScale

        if keyframes[-1]["frame"] > maxFrame:
            maxFrame = keyframes[-1]["frame"]

    jsonData["duration"] = maxFrame

    processOpacityKeyframes(jsonData["opacities"])

    outfile = open(outp, "w")
    json.dump(jsonData, outfile, indent=2)
    outfile.close()

if __name__ == "__main__":
    if (len(sys.argv) < 4):
        print "usage: kf2json <input> <output> <framerate>"
        sys.exit()

    convert(sys.argv[1], sys.argv[2], float(sys.argv[3]))
