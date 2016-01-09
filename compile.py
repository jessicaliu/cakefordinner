file = open('home.html', 'r').read()
outputfile = open('index.html', 'w')

output = ''

lastend = 0
start = file.find('[')
end = 0

print ('doin magic...')

while start != -1:
  end = file.find(']', end+1)
  #print file[start:end+1]
  toInsert = open(file[start+1:end], 'r').read()
  #print toInsert
  output += file[lastend:start]
  output += toInsert

  lastend = end + 1
  start = file.find('[', start+1)

output += file[lastend:]

print ('writing to index.html...')

outputfile.write(output)

print ('done!')


  
