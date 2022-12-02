def get_input(file_name):
  input_f =  open(file_name, "r")
  input_  = input_f.read()

  input_f.close()
  return input_

input_1 = get_input("input1.txt")
lines = input_1.split('\n')

# Hack
if lines[len(lines) - 1] != '':
  lines.append('')

# Part I
max_cals      = 0
current_total = 0

for i in range(len(lines)):
  if lines[i] != '':
    cals = int(lines[i])
    current_total += cals
  else:
    if current_total > max_cals:
      max_cals = current_total
    current_total = 0

print("Part I:", max_cals)

# Part II
all_cals      = []
current_total = 0

for i in range(len(lines)):
  if lines[i] != '':
    cals = int(lines[i])
    current_total += cals
  else:
    all_cals.append(current_total)
    current_total = 0

all_cals.sort()

top_3 = 0
for i in range(3):
  top_3 += all_cals[len(all_cals) - i - 1]

print("Part II:", top_3)