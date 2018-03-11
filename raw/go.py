import json
import csv

csv.register_dialect('usda', delimiter='^', quoting=csv.QUOTE_NONNUMERIC, quotechar='~')

csvfile = open('./data.txt', 'r')
jsonfile = open('./../json/full.json', 'w')

abbrevFields = ('ndb', 'desc', 'wtr', 'kcal', 'pro', 'lip', 'ash', 'carb', 'fib', 'sug', 'calc', 'fe', 'mg', 'p', 'k', 'na', 'zn', 'cu', 'ma', 'se', 'asc', 'th', 'rib', 'nia', 'pan', 'b6', 'fTo', 'fAc', 'fFo', 'dfe', 'cho', 'b12', 'aiu', 'arae', 'ret', 'aca', 'bca', 'bcr', 'lyc', 'luz', 've', 'vd', 'diu', 'vk', 'fsat', 'fmon', 'fpol', 'chl', 'gm1', 'gm1d', 'gm2', 'gm2d', 'ref')
reader = csv.DictReader(csvfile, abbrevFields, None , None, 'usda')

fulljson = [row for row in reader]
for index, row in enumerate(fulljson):
    newrow = []
    for element in abbrevFields:
        newrow.append(row[element])
    newrow[1] = newrow[1].replace(', ', ',').replace(',', ', ').replace(' & ', '&').replace('&', ' AND ').replace('W/ ', 'W/').replace('W/', 'WITH ').replace('WO/ ', 'WO/').replace('WO/', 'WITHOUT ')
    fulljson[index] = newrow

out = json.dumps(fulljson, separators=(',', ':'))
jsonfile.write(out)

fullfile = open('./../json/full.json', 'r')
namefile = open('./../json/names.json', 'w')

jsondata = json.load(fullfile)

out = json.dumps([row[1] for row in jsondata], separators=(',', ':'))
namefile.write(out)