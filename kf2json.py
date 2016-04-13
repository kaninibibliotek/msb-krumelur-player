import json
import sys

def getKeyframes(inp, header, keys):
    keyframes = []
    start     = inp.find(header)

    if (start == -1):
        print "No match"
        return keyframes

    lines = inp[start:].splitlines()[2:]

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

def convert(inp, outp):
    infile = open(inp, "r")
    text   = infile.read()
    infile.close()

    jsonData = {
        "positions": getKeyframes(text, "Transform\tPosition", ["t", "x", "y"]),
        "scales":    getKeyframes(text, "Transform\tScale", ["t", "scale"]),
        "rotations": getKeyframes(text, "Transform\tRotation", ["t", "rotation"])
    }

    outfile = open(outp, "w")
    json.dump(jsonData, outfile, indent=2)
    outfile.close()

if __name__ == "__main__":
    if (len(sys.argv) < 3):
        print "please specify input and output"
        sys.exit()

    convert(sys.argv[1], sys.argv[2])
