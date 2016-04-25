import json
import sys

def getKeyframes(inp, header, keys):
    start = inp.find(header)

    if (start == -1):
        raise Exception("No match for %s" % (header))

    lines     = inp[start:].splitlines()[2:]
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
    start = inp.find(header)

    if (start == -1):
        raise Exception("No match for %s" % (header))

    line = inp[start:].splitlines()[0]

    return float(line.split()[-1])

def convert(inp, outp, targetFps):
    infile = open(inp, "r")
    text   = infile.read()
    infile.close()

    try:
        inputFps = getValue(text, "Units Per Second")
        fpsScale = targetFps / inputFps

        jsonData = {
            "positions": getKeyframes(text, "Transform\tPosition", ["frame", "x", "y"]),
            "scales":    getKeyframes(text, "Transform\tScale", ["frame", "scale"]),
            "rotations": getKeyframes(text, "Transform\tRotation", ["frame", "rotation"])
        }
    except Exception, e:
        print e
        return

    maxFrame = 0

    for keyframes in jsonData.values():
        for kf in keyframes:
            kf["frame"] *= fpsScale

            if kf["frame"] > maxFrame:
                maxFrame = kf["frame"]

    jsonData["duration"] = maxFrame

    outfile = open(outp, "w")
    json.dump(jsonData, outfile, indent=2)
    outfile.close()

if __name__ == "__main__":
    if (len(sys.argv) < 4):
        print "usage: kf2json <input> <output> <framerate>"
        sys.exit()

    convert(sys.argv[1], sys.argv[2], float(sys.argv[3]))
