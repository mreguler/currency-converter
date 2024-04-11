with open("temp.txt", "r") as infile, open("temp.csv", "w") as outfile:
    idx = 0
    per = 8
    newline = []
    for line in infile.readlines():
        newline.append(line.strip())
        idx += 1
        if idx == per-1:
            outfile.write(",".join(newline) + "\n")
            idx = 0
            newline = []