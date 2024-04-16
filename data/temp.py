with open("./currencies.csv", "r") as infile:
    out = "{\n"
    for line in infile.readlines():
        tokens = line.split(",")
        code = tokens[2]
        symbol = tokens[3]
        out += f'\t"{code}": "{symbol}",\n'
    out += "}"
    print(out)