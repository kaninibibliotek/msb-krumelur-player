import json
import sys

def getKeyframes(inp, header, keys):
    ret   = []
    start = inp.find(header)

    if (start == -1):
        print "No match"
        return ret

    lines = inp[start:].splitlines()[1:]

    for line in lines:
        line = line.strip()

        if line == "":
            break

        items = line.split(" ")
        data  = {}

        for idx, key in enumerate(keys):
            data[key] = float(items[idx])

        ret.append(data)

    return ret

def convert(inp, outp):
    infile = open(inp, "r")
    text   = infile.read()
    infile.close()

    jsonData = {
        "positions": getKeyframes(text, "Frame X", ["t", "x", "y"]),
        "sizes":     getKeyframes(text, "Frame Size", ["t", "size"])
    }

    outfile = open(outp, "w")
    json.dump(jsonData, outfile, indent=2)
    outfile.close()

if __name__ == "__main__":
    if (len(sys.argv) < 3):
        print "please specify input and output"
        sys.exit()

    convert(sys.argv[1], sys.argv[2])
