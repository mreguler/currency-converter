import random
import regex as re

lines: list[str] = []
MAX_AMOUNT = 10000
CURRENCY_RE = re.compile(r".*?(\p{Sc}).*?")
with open("./symbols.html", "r") as infile:
    for line in infile.readlines():
        lines.append(line)

with open("index.html", "w") as outfile:
    for line in lines:
        m = re.search(CURRENCY_RE, line)
        if m != None:
            newline = line.replace(m.group(1), f"{round(random.random()*MAX_AMOUNT, 2)} {m.group(1)}")
            outfile.write(newline)
        else:
            outfile.write(line)
