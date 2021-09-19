#!/Applications/anaconda/bin/python
# -*- coding: utf-8 -*-

from astropy.table import Table,Column
import pandas as pd
import json
import os

if os.getcwd().split('/')[-1]=='python':
    relDir='../'
else:
    relDir='./'
fileIn=os.path.join(relDir,"data/data.xlsx")

pdIn=pd.read_excel(fileIn)
tabIn=Table.from_pandas(pdIn)
# tabIn=Table.read(fileIn)

jsonOut=[]
for row in tabIn:
    entry={}
    for col in tabIn.colnames:
        if type(tabIn[col])==type(Table.MaskedColumn()):
            if not tabIn[col].mask[row.index]:
                entry[col]=row[col]
        else:
            entry[col]=row[col]
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

writeHtml=False

if writeHtml:
    # main websites
    fOutRes=open(os.path.join(relDir,'html/testHtml_resources.html'),'w')
    fOutWorkshops=open(os.path.join(relDir,'html/testHtml_workshops.html'),'w')

    # snippets of html (won't work properly as a standalone html file)
    fOutGrav=open(os.path.join(relDir,'html/testHtml_gw.html'),'w')
    fOutPhys=open(os.path.join(relDir,'html/testHtml_phys.html'),'w')
    fOutAstro=open(os.path.join(relDir,'html/testHtml_astro.html'),'w')

    imgdir='../img/'

    # set up lists
    astroHtml=[]
    physHtml=[]
    gravHtml=[]
    resHtml=[]
    workHtml=[]

    # HTML header
    hdr="""<!DOCTYPE html>
    <html>
    <head>
    <link rel="stylesheet" media="all" href="../css/physx-res.css" type="text/css"/>
    <script type="text/javascript" src="../js/jquery-3.4.1.min.js"></script>
    <script src="../js/physx-res.js" type="text/javascript"/></script>
    </head>
    <body>
    <div id="main" class="main">
    <div id="title-bar" class="main">
    <div id="title-cont">
    <div class="title-item left closed" id="filter-button"><img src="../img/menu.svg"/ title="Filter"><div id="filter-label" class="title-item left">Filter</div></div>
    <div class="title-item right" id="logo"><img src="../img/cardiffuni_white.png"></div>
    <div class="title-item right" id="title">Physics &amp; Astronomy Resources</div>
    </div></div>
    <div id="filter-holder" class="closed"></div>
    <div id="content">
    """
    # Write header to HTML files
    fOutRes.write(hdr)
    fOutWorkshops.write(hdr)

    # cycle through rows of table
    for row in tabIn:
        # initialise classlist
        classlist=''
        # get data from row
        age=row['Age Range']
        try:
            # add age ranges to classlist
            for a in age.split(';'):
                cltxt=a.lower().strip().replace(' ','-').replace('>','gt')
                if cltxt!='': classlist='%s age-%s'%(classlist,cltxt)
        except:
            print('age error: ',row['Resource Name'],row['Age Range'])
            pass
        desc=row['Description']
        clink=row['Curriculum Links']
        try:
            # add curriculum links to classlist
            for cl in clink.split(';'):
                cltxt=cl.lower().strip().replace(' ','-')
                if cltxt!='': classlist='%s clink-%s'%(classlist,cltxt)
        except:
            print('curriculum error: ',row['Resource Name'],row['Curriculum Links'])
            pass
        author=row['Author/Originator']
        url=row['URL']
        # print(url,tabIn['URL'][row.index],tabIn['URL'].mask[row.index])
        name=row['Resource Name']
        domain=row['Domain']
        iconclass=''
        try:
            # add domain to classlist
            for dom in domain.split(';'):
                cltxt=dom.lower().strip().replace(' ','-')
                if cltxt!='':
                    classlist='%s dom-%s'%(classlist,cltxt)
                    iconclass='{} icon-dom-{}'.format(iconclass,cltxt)
            print('domain: ',row['Resource Name'],row['Domain'],iconclass)
        except:
            print('domain error: ',row['Resource Name'],row['Domain'])
            pass
        rtype=row['Type of Resource']
        try:
            # add resource type to classlist
            for rt in rtype.split(';'):
                cltxt=rt.lower().strip().replace(' ','-')
                if cltxt!='': classlist='%s type-%s'%(classlist,cltxt)
        except:
            print('type error: ',row['Resource Name'],row['Type of Resource'])
            pass
        req=row['Requirements']
        try:
            # add resource type to classlist
            for rq in req.split(';'):
                cltxt=rq.lower().strip().replace(' ','-')
                if cltxt!='': classlist='%s req-%s'%(classlist,cltxt)
        except:
            print('requirement error: ',row['Resource Name'],row['Requirements'])
            pass
        dur=row['Duration']
        img=row['Image']
        if (img!=''):
            if img[0:5]!='http':
                img='{}{}'.format(imgdir,img)
        # generate text for divs
        txt='<div class="block-item %s">\n'%(classlist)
        if tabIn['URL'].mask[row.index]:
            txt=txt+'<div class="block-title"><h3 class="block-white">{}</h3>'.format(name)
            print(name,iconclass)
            for ic in iconclass.split(' '):
                if len(ic)>0:
                    print('icon',ic)
                    txt=txt+'<div class="icon {}"></div>'.format(ic)
            txt=txt+'</div>\n'
            txt=txt+'<div class="block-img">\n<img src="%s" alt="image" />\n</div>'%(img)
        else:
            txt=txt+'<div class="block-title"><h3 class="block-white"><a title="{}" href="{}">{}</a></h3>'.format(name,url,name)
            print(name,iconclass)
            for ic in iconclass.split(' '):
                if len(ic)>0:
                    print('icon',ic)
                    txt=txt+'<div class="icon {}"></div>'.format(ic)
            txt=txt+'</div>\n'
            txt=txt+'<div class="block-img">\n<a title="%s" href="%s"><img src="%s" alt="image" /><div class="block-link">Click here</div></a>\n</div>'%(name,url,img)
        txt=txt+'    <p class="res res-desc">%s</p>\n'%(desc)
        txt=txt+'    <p class="res res-type">%s</p>\n'%(rtype)
        txt=txt+'    <p class="res res-age">'
        try:
            for a in age.split(';'):
                acl=a.lower().strip().replace(' ','-').replace('>','gt')
                txt=txt+'<span class="res-age-item age-%s">%s</span>'%(acl,a)
        except:
            pass
        txt=txt+'</p>\n'
        txt=txt+'    <p class="res res-req">'
        try:
            for r in req.split(';'):
                rcl=r.lower().strip().replace(' ','-').replace('>','gt')
                txt=txt+'<span class="res-req-item req-%s">%s</span>'%(rcl,r)
        except:
            pass
        txt=txt+'</p>\n'
        txt=txt+'    <p class="res res-clink">%s</p>\n'%(clink)
        if rw=='Resource':
            txt=txt+'    <p class="res res-author">%s</p>\n'%(author)
            if dur!='':
                txt=txt+'    <p class="res res-duration">%s</p>\n'%(dur)
        if rw=='Workshop':
            txt=txt+'    <p class="res res-duration">%s</p>\n'%(dur)
        if tabIn['URL'].mask[row.index]==False:
            txt=txt+'    <p class="res res-url"><span class="res-url"><a title="%s" href="%s">More info ></a></span></p>\n'%(name,url)
        txt=txt+'<hr/>\n'
        txt=txt+'</div>\n\n'

        # print txt
        # print name,domain,rw,age,clink,':',classlist
        # print(row.index,classlist)
        # append html code for this entry to appropriate lists
        if domain=='Astronomy' and rw=='Resource':
            astroHtml.append(txt)
        elif domain=='Physics'and rw=='Resource':
            physHtml.append(txt)
        elif domain=='Gravitational Waves' and rw=='Resource':
            gravHtml.append(txt)
        elif rw=='Workshop':
            workHtml.append(txt)
        if rw=='Resource':
            resHtml.append(txt)

    # write out to HTML files
    fOutRes.write('<div class="intro"><p>The School of Physics and Astronomy has produced a number of resources in collaboration with <a href="http://www.sciencemadesimple.co.uk/">science made simple</a>, <a href="http://www.lco.global/">Las Cumbres Observatory</a> (LCO), <a href="http://www.stfc.ac.uk/">STFC</a> and others. Here are a few which are particularly designed for use in the classroom.</p><p>You can jump to <a href="#astro">Astronomy</a>, <a href="#gravwaves">Gravitational waves</a> or <a href="#physics">Physics</a> resources.</p></div>\n')

    for t in resHtml:
        fOutRes.write(t)

    # fOutRes.write('\n<a id="astro"></a><h2>Astronomy</h2>\n')
    fOutAstro.write('\n<h2>Astronomy</h2>\n')
    for t in astroHtml:
        fOutAstro.write(t)

    # fOutRes.write('\n<a id="gravwaves"></a><h2>Gravitational Waves</h2>\n')
    fOutGrav.write('\n<h2>Gravitational Waves</h2>\n')
    for t in gravHtml:
        fOutGrav.write(t)

    # fOutRes.write('\n<a id="physics"></a><h2>Physics</h2>\n')
    fOutPhys.write('\n<h2>Physics</h2>\n')
    for t in physHtml:
        fOutPhys.write(t)

    fOutWorkshops.write('<ul>\n<li><strong>Looking for a special event for your science class or astronomy club?</strong></li>\n<li><strong>Want to get your group fired up about physics...?</strong></li>\n<li><strong>...or hear about cutting edge research from those working in the field?</strong></li>\n</ul><p>We offer a range of free physics and astronomy presentations to school groups within an hour\'s drive-time of Cardiff. Staff are sometimes available for schools further afield, but there may be small travel costs involved.</p><p>For more information, please email <a href="mailto:schools@astro.cf.ac.uk">schools@astro.cf.ac.uk</a></p>\n')
    fOutWorkshops.write('\n<h2>Workshops</h2>\n')
    for t in workHtml:
        fOutWorkshops.write(t)

    # HTML footer
    ftr="""
    </div></div>
    <script type="text/javascript"/>initPage();</script>
    </body>
    </html>
    """
    # write HTML footer to main HTML files
    fOutRes.write(ftr)
    fOutWorkshops.write(ftr)

    # close files
    fOutRes.close()
    fOutPhys.close()
    fOutGrav.close()
    fOutAstro.close()
    fOutWorkshops.close()