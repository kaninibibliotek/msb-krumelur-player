import json
import os
import sys

PREFIX = "/krumelur/effects/"

def convert(inp, outp, name, trigger, z):
    files = os.listdir(inp)

    jsonData = {
        "name": name,
        "trigger": int(trigger),
        "z": int(z),
        "urls": map(lambda file: "%s%s/%s" % (PREFIX, name, file), files)
    }

    outfile = open(outp, "w")

    json.dump(jsonData, outfile, indent=2)

    outfile.close()

if __name__ == "__main__":
    if (len(sys.argv) < 6):
        print "usage: effect2json <input> <output> <name> <trigger> <z>"
        sys.exit()

    convert(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])
