#!/Applications/anaconda/bin/python
# -*- coding: utf-8 -*-

from astropy.table import Table,Column
import numpy as np
import pandas as pd
import json
import os

overwrite=True # set to overwrite Json entries with Excel file
duplicate=False # set to make duplicates in Json files

if os.getcwd().split('/')[-1]=='python':
    relDir='../'
else:
    relDir='./'
fileIn=os.path.join(relDir,"data/data.xlsx")

jsonFileIn=os.path.join(relDir,'data/data.json')

jsonIn=json.load(open(jsonFileIn,'r'))
jsonOut=[]

names=[]
for j in range(len(jsonIn)):
    if 'Resource Name' in jsonIn[j]:
        names.append(jsonIn[j]['Resource Name'])
    jsonOut.append(jsonIn[j])

pdIn=pd.read_excel(fileIn)
tabIn=Table.from_pandas(pdIn)
# tabIn=Table.read(fileIn)


for row in tabIn:
    entry={}
    for col in tabIn.colnames:
        if type(tabIn[col])==type(Table.MaskedColumn()):
            if not tabIn[col].mask[row.index]:
                entry[col]=str(row[col])
        else:
            entry[col]=str(row[col])
    exists=False
    for n in range(len(names)):
        if names[n]==row['Resource Name']:
            idx=n
            exists=True
    if exists:
        # idx=np.argwhere(names==row['Resource Name'])
        print(idx)
        jsondate=jsonOut[idx].get('Updated','No Date')
        # print(jsonOut[idx])
        exceldate=entry.get('Updated','No Date')
        print(jsondate,exceldate)
        # update old entry
        if overwrite:
            print('WARNING: Overwriting [{}]: {}'.format(idx,row['Resource Name']))
            jsonOut[idx]=entry
        elif duplicate:
            # get next blank item
            v=1
            newFound=False
            while not newFound:
                newname='{}-copy-{}'.format(row['Resource Name'],v)
                if newname in names:
                    v=v+1
                else:
                    newFound=True
                entry['Resource Name']=newname
            print('WARNING: Adding duplicate {}'.format(newname))
            jsonOut.append(entry)
    else:
        # add new entry
        print('Adding new entry {}'.format(row['Resource Name']))
        jsonOut.append(entry)

json.dump(jsonOut,open(os.path.join(relDir,'data/data.json'),'w'),indent=2)
fIn=open(os.path.join(relDir,'data/data.json'),'r')
fOut=open(os.path.join(relDir,'data/data.jsonp'),'w')
lines=fIn.readlines()
lines[0]='data('+lines[0]
lines[-1]=lines[-1]+');'
for l in lines:
    fOut.write(l)
fOut.close()
fIn.close()
