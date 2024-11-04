import re

def removeUnwantedSpace(text):
    cleaned_text=re.sub(r' {2,}+','',text).replace('\n',' ').strip()
    return cleaned_text
    