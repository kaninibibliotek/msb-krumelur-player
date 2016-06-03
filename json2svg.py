import json
import os
import sys

zColor = {
    100: "#ff00ff",
    90:  "#8000ff",
    80:  "#0000ff",
    70:  "#0080ff",
    60:  "#00ffff",
    50:  "#00ff80",
    40:  "#00ff00",
    30:  "#80ff00",
    20:  "#ffff00",
    10:  "#ff8000",
    0:   "#ff0000"
}

def convertDirectory(inDir, outDir):
    files = os.listdir(inDir)

    for file in files:
        outName = file[:-4] + 'svg'
        convert(os.path.join(inDir, file), os.path.join(outDir, outName))

def convert(inp, outp):
    infile = open(inp, "r")
    mask   = json.load(infile)

    infile.close()

    outfile = open(outp, "w")

    outfile.write("<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='4080' height='768'>\n")
    outfile.write("\t<polygon points=")

    outfile.write("'%s' " % reduce(lambda pts, v: pts + ("%s " % vertexToString(v)), mask["vertices"], ""))

    outfile.write("fill='%s' />\n" % zColor[mask["z"]])
    outfile.write("</svg>\n")

    outfile.close()

def vertexToString(vertex):
    return str(vertex["x"]) + "," + str(vertex["y"])

if __name__ == "__main__":
    if (len(sys.argv) < 3):
        print "usage: json2svg <input> <output>"
        sys.exit()

    convertDirectory(sys.argv[1], sys.argv[2])
