# Crawl through files and get the file line sizes
import os

def read(file):
  count = 0
  with open(file, "r") as f:
    for line in f:
      line = line.strip()
      count += 1
  return count

def getPath(root, file):
  if(root[0:2] == "./"):
    root = root[2:]
  return f"{root}/{file}"    

def find():
  filesFound = {}
  for (root, _, files) in os.walk(".", topdown=True):
    if("node_modules" in root or ".git" in root or ".vscode" in root or "." == root or "dist" in root):
      continue
    else:
      for file in files:
        if(".json" in file):
          continue
        elif(".ts" in file or ".js" in file or ".html" in file or ".md" in file):
          filesFound[getPath(root, file)] = read(getPath(root, file))
  return filesFound


def getLargest(files):
  largestFile = {}
  largestFileValue = max(files.values())
  for filename in files:
    if(files[filename] == largestFileValue):
      largestFile[filename] = largestFileValue
  return largestFile

def analyze(files):
  largest = getLargest(files)
  total = sum(files.values())
  average = f"{(total / len(files)):.2f}"
  numOfFiles = len(files)

  return {"Largest File": largest, "Average File Size": average, "Total Lines Written": total, "Number of Files": numOfFiles}

print(analyze(find()))
